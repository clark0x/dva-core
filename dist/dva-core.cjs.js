'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isPlainObject = _interopDefault(require('is-plain-object'));
var invariant = _interopDefault(require('invariant'));
var warning = _interopDefault(require('warning'));
var redux = require('redux');
var flatten = _interopDefault(require('flatten'));
var window = _interopDefault(require('global/window'));
var sagaEffects = require('redux-saga/effects');
var createSagaMiddleware = _interopDefault(require('redux-saga/lib/internal/middleware'));

const isArray = Array.isArray.bind(Array);
const isFunction = o => typeof o === 'function';
const returnSelf = m => m;
const noop = () => {};

function checkModel(model, existModels) {
  const {
    namespace,
    reducers,
    effects,
    subscriptions,
  } = model;

  // namespace 必须被定义
  invariant(
    namespace,
    `[app.model] namespace should be defined`,
  );
  // 并且是字符串
  invariant(
    typeof namespace === 'string',
    `[app.model] namespace should be string, but got ${typeof namespace}`,
  );
  // 并且唯一
  invariant(
    !existModels.some(model => model.namespace === namespace),
    `[app.model] namespace should be unique`,
  );

  // state 可以为任意值

  // reducers 可以为空，PlainObject 或者数组
  if (reducers) {
    invariant(
      isPlainObject(reducers) || isArray(reducers),
      `[app.model] reducers should be plain object or array, but got ${typeof reducers}`,
    );
    // 数组的 reducers 必须是 [Object, Function] 的格式
    invariant(
      !isArray(reducers) || (isPlainObject(reducers[0]) && isFunction(reducers[1])),
      `[app.model] reducers with array should be [Object, Function]`,
    );
  }

  // effects 可以为空，PlainObject
  if (effects) {
    invariant(
      isPlainObject(effects),
      `[app.model] effects should be plain object, but got ${typeof effects}`,
    );
  }

  if (subscriptions) {
    // subscriptions 可以为空，PlainObject
    invariant(
      isPlainObject(subscriptions),
      `[app.model] subscriptions should be plain object, but got ${typeof subscriptions}`,
    );

    // subscription 必须为函数
    invariant(
      isAllFunction(subscriptions),
      `[app.model] subscription should be function`,
    );
  }
}

function isAllFunction(obj) {
  return Object.keys(obj).every(key => isFunction(obj[key]));
}

const NAMESPACE_SEP = '/';

function prefix(obj, namespace, type) {
  return Object.keys(obj).reduce((memo, key) => {
    warning(
      key.indexOf(`${namespace}${NAMESPACE_SEP}`) !== 0,
      `[prefixNamespace]: ${type} ${key} should not be prefixed with namespace ${namespace}`,
    );
    const newKey = `${namespace}${NAMESPACE_SEP}${key}`;
    memo[newKey] = obj[key];
    return memo;
  }, {});
}

function prefixNamespace(model) {
  const {
    namespace,
    reducers,
    effects,
  } = model;

  if (reducers) {
    if (isArray(reducers)) {
      model.reducers[0] = prefix(reducers[0], namespace, 'reducer');
    } else {
      model.reducers = prefix(reducers, namespace, 'reducer');
    }
  }
  if (effects) {
    model.effects = prefix(effects, namespace, 'effect');
  }
  return model;
}

const hooks = [
  'onError',
  'onStateChange',
  'onAction',
  'onHmr',
  'onReducer',
  'onEffect',
  'extraReducers',
  'extraEnhancers',
  '_handleActions',
];

function filterHooks(obj) {
  return Object.keys(obj).reduce((memo, key) => {
    if (hooks.indexOf(key) > -1) {
      memo[key] = obj[key];
    }
    return memo;
  }, {});
}

class Plugin {
  constructor() {
    this._handleActions = null;
    this.hooks = hooks.reduce((memo, key) => {
      memo[key] = [];
      return memo;
    }, {});
  }

  use(plugin) {
    invariant(
      isPlainObject(plugin),
      'plugin.use: plugin should be plain object'
    );
    const hooks = this.hooks;
    for (const key in plugin) {
      if (Object.prototype.hasOwnProperty.call(plugin, key)) {
        invariant(hooks[key], `plugin.use: unknown plugin property: ${key}`);
        if (key === '_handleActions') {
          this._handleActions = plugin[key];
        } else if (key === 'extraEnhancers') {
          hooks[key] = plugin[key];
        } else {
          hooks[key].push(plugin[key]);
        }
      }
    }
  }

  apply(key, defaultHandler) {
    const hooks = this.hooks;
    const validApplyHooks = ['onError', 'onHmr'];
    invariant(
      validApplyHooks.indexOf(key) > -1,
      `plugin.apply: hook ${key} cannot be applied`
    );
    const fns = hooks[key];

    return (...args) => {
      if (fns.length) {
        for (const fn of fns) {
          fn(...args);
        }
      } else if (defaultHandler) {
        defaultHandler(...args);
      }
    };
  }

  get(key) {
    const hooks = this.hooks;
    invariant(key in hooks, `plugin.get: hook ${key} cannot be got`);
    if (key === 'extraReducers') {
      return getExtraReducers(hooks[key]);
    } else if (key === 'onReducer') {
      return getOnReducer(hooks[key]);
    } else {
      return hooks[key];
    }
  }
}

function getExtraReducers(hook) {
  let ret = {};
  for (const reducerObj of hook) {
    ret = { ...ret, ...reducerObj };
  }
  return ret;
}

function getOnReducer(hook) {
  return function(reducer) {
    for (const reducerEnhancer of hook) {
      reducer = reducerEnhancer(reducer);
    }
    return reducer;
  };
}

function createStore({
  reducers,
  initialState,
  plugin,
  sagaMiddleware,
  promiseMiddleware,
  createOpts: { setupMiddlewares = returnSelf },
}) {
  // extra enhancers
  const extraEnhancers = plugin.get('extraEnhancers');
  invariant(
    isArray(extraEnhancers),
    `[app.start] extraEnhancers should be array, but got ${typeof extraEnhancers}`
  );

  const extraMiddlewares = plugin.get('onAction');
  const middlewares = setupMiddlewares([
    promiseMiddleware,
    sagaMiddleware,
    ...flatten(extraMiddlewares),
  ]);

  let devtools = () => noop$$1 => noop$$1;
  if (
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    devtools = window.__REDUX_DEVTOOLS_EXTENSION__;
  }

  const enhancers = [
    redux.applyMiddleware(...middlewares),
    ...extraEnhancers,
    devtools(window.__REDUX_DEVTOOLS_EXTENSION__OPTIONS),
  ];

  return redux.createStore(reducers, initialState, redux.compose(...enhancers));
}

function prefixType(type, model) {
  const prefixedType = `${model.namespace}${NAMESPACE_SEP}${type}`;
  const typeWithoutAffix = prefixedType.replace(/\/@@[^/]+?$/, '');
  if ((model.reducers && model.reducers[typeWithoutAffix])
    || (model.effects && model.effects[typeWithoutAffix])) {
    return prefixedType;
  }
  return type;
}

function getSaga(effects, model, onError, onEffect) {
  return function*() {
    for (const key in effects) {
      if (Object.prototype.hasOwnProperty.call(effects, key)) {
        const watcher = getWatcher(key, effects[key], model, onError, onEffect);
        const task = yield sagaEffects.fork(watcher);
        yield sagaEffects.fork(function*() {
          yield sagaEffects.take(`${model.namespace}/@@CANCEL_EFFECTS`);
          yield sagaEffects.cancel(task);
        });
      }
    }
  };
}

function getWatcher(key, _effect, model, onError, onEffect) {
  let effect = _effect;
  let type = 'takeEvery';
  let ms;

  if (Array.isArray(_effect)) {
    effect = _effect[0];
    const opts = _effect[1];
    if (opts && opts.type) {
      type = opts.type;
      if (type === 'throttle') {
        invariant(
          opts.ms,
          'app.start: opts.ms should be defined if type is throttle'
        );
        ms = opts.ms;
      }
    }
    invariant(
      ['watcher', 'takeEvery', 'takeLatest', 'throttle'].indexOf(type) > -1,
      'app.start: effect type should be takeEvery, takeLatest, throttle or watcher'
    );
  }

  function noop() {}

  function* sagaWithCatch(...args) {
    const { __dva_resolve: resolve = noop, __dva_reject: reject = noop } =
      args.length > 0 ? args[0] : {};
    try {
      yield sagaEffects.put({ type: `${key}${NAMESPACE_SEP}@@start` });
      const ret = yield effect(...args.concat(createEffects(model)));
      yield sagaEffects.put({ type: `${key}${NAMESPACE_SEP}@@end` });
      resolve(ret);
    } catch (e) {
      onError(e, {
        key,
        effectArgs: args,
      });
      if (!e._dontReject) {
        reject(e);
      }
    }
  }

  const sagaWithOnEffect = applyOnEffect(onEffect, sagaWithCatch, model, key);

  switch (type) {
    case 'watcher':
      return sagaWithCatch;
    case 'takeLatest':
      return function*() {
        yield sagaEffects.takeLatest(key, sagaWithOnEffect);
      };
    case 'throttle':
      return function*() {
        yield sagaEffects.throttle(ms, key, sagaWithOnEffect);
      };
    default:
      return function*() {
        yield sagaEffects.takeEvery(key, sagaWithOnEffect);
      };
  }
}

function createEffects(model) {
  function assertAction(type, name) {
    invariant(type, 'dispatch: action should be a plain Object with type');
    warning(
      type.indexOf(`${model.namespace}${NAMESPACE_SEP}`) !== 0,
      `[${name}] ${type} should not be prefixed with namespace ${
        model.namespace
      }`
    );
  }
  function put(action) {
    const { type } = action;
    assertAction(type, 'sagaEffects.put');
    return sagaEffects.put({ ...action, type: prefixType(type, model) });
  }

  // The operator `put` doesn't block waiting the returned promise to resolve.
  // Using `put.resolve` will wait until the promsie resolve/reject before resuming.
  // It will be helpful to organize multi-effects in order,
  // and increase the reusability by seperate the effect in stand-alone pieces.
  // https://github.com/redux-saga/redux-saga/issues/336
  function putResolve(action) {
    const { type } = action;
    assertAction(type, 'sagaEffects.put.resolve');
    return sagaEffects.put.resolve({
      ...action,
      type: prefixType(type, model),
    });
  }
  put.resolve = putResolve;

  function take(type) {
    if (typeof type === 'string') {
      assertAction(type, 'sagaEffects.take');
      return sagaEffects.take(prefixType(type, model));
    } else if (Array.isArray(type)) {
      return sagaEffects.take(
        type.map(t => {
          if (typeof t === 'string') {
            assertAction(t, 'sagaEffects.take');
            return prefixType(type, model);
          }
          return t;
        })
      );
    } else {
      return sagaEffects.take(type);
    }
  }
  return { ...sagaEffects, put, take };
}

function applyOnEffect(fns, effect, model, key) {
  for (const fn of fns) {
    effect = fn(effect, sagaEffects, model, key);
  }
  return effect;
}

function identify(value) {
  return value;
}

function handleAction(actionType, reducer = identify) {
  return (state, action) => {
    const { type } = action;
    invariant(type, 'dispatch: action should be a plain Object with type');
    if (actionType === type) {
      return reducer(state, action);
    }
    return state;
  };
}

function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce((p, r) => r(p, current), previous);
}

function handleActions(handlers, defaultState) {
  const reducers = Object.keys(handlers).map(type =>
    handleAction(type, handlers[type])
  );
  const reducer = reduceReducers(...reducers);
  return (state = defaultState, action) => reducer(state, action);
}

function getReducer(reducers, state, handleActions$$1) {
  // Support reducer enhancer
  // e.g. reducers: [realReducers, enhancer]
  if (Array.isArray(reducers)) {
    return reducers[1](
      (handleActions$$1 || handleActions)(reducers[0], state)
    );
  } else {
    return (handleActions$$1 || handleActions)(reducers || {}, state);
  }
}

function createPromiseMiddleware(app) {
  return () => next => action => {
    const { type } = action;
    if (isEffect(type)) {
      return new Promise((resolve, reject) => {
        next({
          __dva_resolve: resolve,
          __dva_reject: reject,
          ...action,
        });
      });
    } else {
      return next(action);
    }
  };

  function isEffect(type) {
    if (!type || typeof type !== 'string') return false;
    const [namespace] = type.split(NAMESPACE_SEP);
    const model = app._models.filter(m => m.namespace === namespace)[0];
    if (model) {
      if (model.effects && model.effects[type]) {
        return true;
      }
    }

    return false;
  }
}

function prefixedDispatch(dispatch, model) {
  return (action) => {
    const { type } = action;
    invariant(type, 'dispatch: action should be a plain Object with type');
    warning(
      type.indexOf(`${model.namespace}${NAMESPACE_SEP}`) !== 0,
      `dispatch: ${type} should not be prefixed with namespace ${model.namespace}`,
    );
    return dispatch({ ...action, type: prefixType(type, model) });
  };
}

function run(subs, model, app, onError) {
  const funcs = [];
  const nonFuncs = [];
  for (const key in subs) {
    if (Object.prototype.hasOwnProperty.call(subs, key)) {
      const sub = subs[key];
      const unlistener = sub({
        dispatch: prefixedDispatch(app._store.dispatch, model),
        history: app._history,
      }, onError);
      if (isFunction(unlistener)) {
        funcs.push(unlistener);
      } else {
        nonFuncs.push(key);
      }
    }
  }
  return { funcs, nonFuncs };
}

function unlisten(unlisteners, namespace) {
  if (!unlisteners[namespace]) return;

  const { funcs, nonFuncs } = unlisteners[namespace];
  warning(
    nonFuncs.length === 0,
    `[app.unmodel] subscription should return unlistener function, check these subscriptions ${nonFuncs.join(', ')}`,
  );
  for (const unlistener of funcs) {
    unlistener();
  }
  delete unlisteners[namespace];
}

// Internal model to update global state when do unmodel
const dvaModel = {
  namespace: '@@dva',
  state: 0,
  reducers: {
    UPDATE(state) {
      return state + 1;
    },
  },
};

/**
 * Create dva-core instance.
 *
 * @param hooksAndOpts
 * @param createOpts
 */
function create(hooksAndOpts = {}, createOpts = {}) {
  const { initialReducer, setupApp = noop } = createOpts;

  const plugin = new Plugin();
  plugin.use(filterHooks(hooksAndOpts));

  const app = {
    _models: [prefixNamespace({ ...dvaModel })],
    _store: null,
    _plugin: plugin,
    use: plugin.use.bind(plugin),
    model,
    start,
  };
  return app;

  /**
   * Register model before app is started.
   *
   * @param m {Object} model to register
   */
  function model(m) {
    if (process.env.NODE_ENV !== 'production') {
      checkModel(m, app._models);
    }
    const prefixedModel = prefixNamespace({ ...m });
    app._models.push(prefixedModel);
    return prefixedModel;
  }

  /**
   * Inject model after app is started.
   *
   * @param createReducer
   * @param onError
   * @param unlisteners
   * @param m
   */
  function injectModel(createReducer, onError, unlisteners, m) {
    m = model(m);

    const store = app._store;
    store.asyncReducers[m.namespace] = getReducer(
      m.reducers,
      m.state,
      plugin._handleActions
    );
    store.replaceReducer(createReducer(store.asyncReducers));
    if (m.effects) {
      store.runSaga(
        app._getSaga(m.effects, m, onError, plugin.get('onEffect'))
      );
    }
    if (m.subscriptions) {
      unlisteners[m.namespace] = run(
        m.subscriptions,
        m,
        app,
        onError
      );
    }
  }

  /**
   * Unregister model.
   *
   * @param createReducer
   * @param reducers
   * @param unlisteners
   * @param namespace
   *
   * Unexpected key warn problem:
   * https://github.com/reactjs/redux/issues/1636
   */
  function unmodel(createReducer, reducers, unlisteners, namespace) {
    const store = app._store;

    // Delete reducers
    delete store.asyncReducers[namespace];
    delete reducers[namespace];
    store.replaceReducer(createReducer());
    store.dispatch({ type: '@@dva/UPDATE' });

    // Cancel effects
    store.dispatch({ type: `${namespace}/@@CANCEL_EFFECTS` });

    // Unlisten subscrioptions
    unlisten(unlisteners, namespace);

    // Delete model from app._models
    app._models = app._models.filter(model => model.namespace !== namespace);
  }

  /**
   * Start the app.
   *
   * @returns void
   */
  function start() {
    // Global error handler
    const onError = (err, extension) => {
      if (err) {
        if (typeof err === 'string') err = new Error(err);
        err.preventDefault = () => {
          err._dontReject = true;
        };
        plugin.apply('onError', err => {
          throw new Error(err.stack || err);
        })(err, app._store.dispatch, extension);
      }
    };

    const sagaMiddleware = createSagaMiddleware();
    const promiseMiddleware = createPromiseMiddleware(app);
    app._getSaga = getSaga.bind(null);

    const sagas = [];
    const reducers = { ...initialReducer };
    for (const m of app._models) {
      reducers[m.namespace] = getReducer(
        m.reducers,
        m.state,
        plugin._handleActions
      );
      if (m.effects)
        sagas.push(app._getSaga(m.effects, m, onError, plugin.get('onEffect')));
    }
    const reducerEnhancer = plugin.get('onReducer');
    const extraReducers = plugin.get('extraReducers');
    invariant(
      Object.keys(extraReducers).every(key => !(key in reducers)),
      `[app.start] extraReducers is conflict with other reducers, reducers list: ${Object.keys(
        reducers
      ).join(', ')}`
    );

    // Create store
    const store = (app._store = createStore({
      // eslint-disable-line
      reducers: createReducer(),
      initialState: hooksAndOpts.initialState || {},
      plugin,
      createOpts,
      sagaMiddleware,
      promiseMiddleware,
    }));

    // Extend store
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {};

    // Execute listeners when state is changed
    const listeners = plugin.get('onStateChange');
    for (const listener of listeners) {
      store.subscribe(() => {
        listener(store.getState());
      });
    }

    // Run sagas
    sagas.forEach(sagaMiddleware.run);

    // Setup app
    setupApp(app);

    // Run subscriptions
    const unlisteners = {};
    for (const model of this._models) {
      if (model.subscriptions) {
        unlisteners[model.namespace] = run(
          model.subscriptions,
          model,
          app,
          onError
        );
      }
    }

    // Setup app.model and app.unmodel
    app.model = injectModel.bind(app, createReducer, onError, unlisteners);
    app.unmodel = unmodel.bind(app, createReducer, reducers, unlisteners);

    /**
     * Create global reducer for redux.
     *
     * @returns {Object}
     */
    function createReducer() {
      return reducerEnhancer(
        redux.combineReducers({
          ...reducers,
          ...extraReducers,
          ...(app._store ? app._store.asyncReducers : {}),
        })
      );
    }
  }
}

module.exports = create;
