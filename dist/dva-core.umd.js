(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('redux'), require('is-plain-object'), require('invariant'), require('warning'), require('flatten')) :
	typeof define === 'function' && define.amd ? define(['redux', 'is-plain-object', 'invariant', 'warning', 'flatten'], factory) :
	(global['dva-core'] = factory(global.redux,global.isPlainObject,global.invariant,global.warning,global.flatten));
}(this, (function (redux,isPlainObject,invariant,warning,flatten) { 'use strict';

	var redux__default = 'default' in redux ? redux['default'] : redux;
	isPlainObject = isPlainObject && isPlainObject.hasOwnProperty('default') ? isPlainObject['default'] : isPlainObject;
	invariant = invariant && invariant.hasOwnProperty('default') ? invariant['default'] : invariant;
	warning = warning && warning.hasOwnProperty('default') ? warning['default'] : warning;
	flatten = flatten && flatten.hasOwnProperty('default') ? flatten['default'] : flatten;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var symbols = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SAGA_LOCATION = exports.TASK_CANCEL = exports.TASK = exports.SELF_CANCELLATION = exports.SAGA_ACTION = exports.MULTICAST = exports.MATCH = exports.IO = exports.CHANNEL_END_TYPE = exports.CHANNEL_END = exports.CANCEL = void 0;

	var createName = function createName(name) {
	  return "@@redux-saga/" + name;
	};

	var createSymbol = function createSymbol(id) {
	  id = createName(id);
	  return typeof Symbol === 'function' ? Symbol(id) : id;
	};

	var createGlobalSymbol = function createGlobalSymbol(id) {
	  id = createName(id);
	  return typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for(id) : id;
	};

	var CANCEL =
	/*#__PURE__*/
	createSymbol('CANCEL_PROMISE');
	exports.CANCEL = CANCEL;
	var CHANNEL_END =
	/*#__PURE__*/
	createSymbol('CHANNEL_END');
	exports.CHANNEL_END = CHANNEL_END;
	var CHANNEL_END_TYPE =
	/*#__PURE__*/
	createSymbol('CHANNEL_END');
	exports.CHANNEL_END_TYPE = CHANNEL_END_TYPE;
	var IO =
	/*#__PURE__*/
	createSymbol('IO');
	exports.IO = IO;
	var MATCH =
	/*#__PURE__*/
	createSymbol('MATCH');
	exports.MATCH = MATCH;
	var MULTICAST =
	/*#__PURE__*/
	createSymbol('MULTICAST');
	exports.MULTICAST = MULTICAST;
	var SAGA_ACTION =
	/*#__PURE__*/
	createSymbol('SAGA_ACTION');
	exports.SAGA_ACTION = SAGA_ACTION;
	var SELF_CANCELLATION =
	/*#__PURE__*/
	createSymbol('SELF_CANCELLATION');
	exports.SELF_CANCELLATION = SELF_CANCELLATION;
	var TASK =
	/*#__PURE__*/
	createSymbol('TASK');
	exports.TASK = TASK;
	var TASK_CANCEL =
	/*#__PURE__*/
	createSymbol('TASK_CANCEL');
	exports.TASK_CANCEL = TASK_CANCEL;
	var SAGA_LOCATION =
	/*#__PURE__*/
	createGlobalSymbol('LOCATION');
	exports.SAGA_LOCATION = SAGA_LOCATION;
	});

	unwrapExports(symbols);
	var symbols_1 = symbols.SAGA_LOCATION;
	var symbols_2 = symbols.TASK_CANCEL;
	var symbols_3 = symbols.TASK;
	var symbols_4 = symbols.SELF_CANCELLATION;
	var symbols_5 = symbols.SAGA_ACTION;
	var symbols_6 = symbols.MULTICAST;
	var symbols_7 = symbols.MATCH;
	var symbols_8 = symbols.IO;
	var symbols_9 = symbols.CHANNEL_END_TYPE;
	var symbols_10 = symbols.CHANNEL_END;
	var symbols_11 = symbols.CANCEL;

	var utils = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.check = check;
	exports.hasOwn = hasOwn;
	exports.remove = remove;
	exports.once = once;
	exports.deferred = deferred;
	exports.arrayOfDeferred = arrayOfDeferred;
	exports.delay = delay;
	exports.createMockTask = createMockTask;
	exports.autoInc = autoInc;
	exports.makeIterator = makeIterator;
	exports.log = log;
	exports.deprecate = deprecate;
	exports.cloneableGenerator = exports.wrapSagaDispatch = exports.createSetContextWarning = exports.internalErr = exports.updateIncentive = exports.uid = exports.array = exports.object = exports.is = exports.identity = exports.noop = exports.kFalse = exports.kTrue = exports.konst = void 0;



	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	var konst = function konst(v) {
	  return function () {
	    return v;
	  };
	};

	exports.konst = konst;
	var kTrue =
	/*#__PURE__*/
	konst(true);
	exports.kTrue = kTrue;
	var kFalse =
	/*#__PURE__*/
	konst(false);
	exports.kFalse = kFalse;

	var noop = function noop() {};

	exports.noop = noop;

	var identity = function identity(v) {
	  return v;
	};

	exports.identity = identity;

	function check(value, predicate, error) {
	  if (!predicate(value)) {
	    throw new Error(error);
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function hasOwn(object, property) {
	  return is.notUndef(object) && hasOwnProperty.call(object, property);
	}

	var is = {
	  undef: function undef(v) {
	    return v === null || v === undefined;
	  },
	  notUndef: function notUndef(v) {
	    return v !== null && v !== undefined;
	  },
	  func: function func(f) {
	    return typeof f === 'function';
	  },
	  number: function number(n) {
	    return typeof n === 'number';
	  },
	  string: function string(s) {
	    return typeof s === 'string';
	  },
	  array: Array.isArray,
	  object: function object(obj) {
	    return obj && !is.array(obj) && typeof obj === 'object';
	  },
	  promise: function promise(p) {
	    return p && is.func(p.then);
	  },
	  iterator: function iterator(it) {
	    return it && is.func(it.next) && is.func(it.throw);
	  },
	  iterable: function iterable(it) {
	    return it && is.func(Symbol) ? is.func(it[Symbol.iterator]) : is.array(it);
	  },
	  task: function task(t) {
	    return t && t[symbols.TASK];
	  },
	  observable: function observable(ob) {
	    return ob && is.func(ob.subscribe);
	  },
	  buffer: function buffer(buf) {
	    return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
	  },
	  pattern: function pattern(pat) {
	    return pat && (is.string(pat) || is.symbol(pat) || is.func(pat) || is.array(pat));
	  },
	  channel: function channel(ch) {
	    return ch && is.func(ch.take) && is.func(ch.close);
	  },
	  stringableFunc: function stringableFunc(f) {
	    return is.func(f) && hasOwn(f, 'toString');
	  },
	  symbol: function symbol(sym) {
	    return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
	  },
	  multicast: function multicast(ch) {
	    return is.channel(ch) && ch[symbols.MULTICAST];
	  }
	};
	exports.is = is;
	var object = {
	  assign: function assign(target, source) {
	    for (var i in source) {
	      if (hasOwn(source, i)) {
	        target[i] = source[i];
	      }
	    }
	  }
	};
	exports.object = object;

	function remove(array, item) {
	  var index = array.indexOf(item);

	  if (index >= 0) {
	    array.splice(index, 1);
	  }
	}

	var array = {
	  from: function from(obj) {
	    var arr = Array(obj.length);

	    for (var i in obj) {
	      if (hasOwn(obj, i)) {
	        arr[i] = obj[i];
	      }
	    }

	    return arr;
	  }
	};
	exports.array = array;

	function once(fn) {
	  var called = false;
	  return function () {
	    if (called) {
	      return;
	    }

	    called = true;
	    fn();
	  };
	}

	function deferred(props) {
	  if (props === void 0) {
	    props = {};
	  }

	  var def = _extends({}, props);

	  var promise = new Promise(function (resolve, reject) {
	    def.resolve = resolve;
	    def.reject = reject;
	  });
	  def.promise = promise;
	  return def;
	}

	function arrayOfDeferred(length) {
	  var arr = [];

	  for (var i = 0; i < length; i++) {
	    arr.push(deferred());
	  }

	  return arr;
	}

	function delay(ms, val) {
	  if (val === void 0) {
	    val = true;
	  }

	  var timeoutId;
	  var promise = new Promise(function (resolve) {
	    timeoutId = setTimeout(function () {
	      return resolve(val);
	    }, ms);
	  });

	  promise[symbols.CANCEL] = function () {
	    return clearTimeout(timeoutId);
	  };

	  return promise;
	}

	function createMockTask() {
	  var _ref;

	  var running = true;

	  var _result, _error;

	  return _ref = {}, _ref[symbols.TASK] = true, _ref.isRunning = function isRunning() {
	    return running;
	  }, _ref.result = function result() {
	    return _result;
	  }, _ref.error = function error() {
	    return _error;
	  }, _ref.setRunning = function setRunning(b) {
	    return running = b;
	  }, _ref.setResult = function setResult(r) {
	    return _result = r;
	  }, _ref.setError = function setError(e) {
	    return _error = e;
	  }, _ref;
	}

	function autoInc(seed) {
	  if (seed === void 0) {
	    seed = 0;
	  }

	  return function () {
	    return ++seed;
	  };
	}

	var uid =
	/*#__PURE__*/
	autoInc();
	exports.uid = uid;

	var kThrow = function kThrow(err) {
	  throw err;
	};

	var kReturn = function kReturn(value) {
	  return {
	    value: value,
	    done: true
	  };
	};

	function makeIterator(next, thro, name) {
	  if (thro === void 0) {
	    thro = kThrow;
	  }

	  if (name === void 0) {
	    name = 'iterator';
	  }

	  var iterator = {
	    meta: {
	      name: name
	    },
	    next: next,
	    throw: thro,
	    return: kReturn,
	    isSagaIterator: true
	  };

	  if (typeof Symbol !== 'undefined') {
	    iterator[Symbol.iterator] = function () {
	      return iterator;
	    };
	  }

	  return iterator;
	}
	/**
	  Print error in a useful way whether in a browser environment
	  (with expandable error stack traces), or in a node.js environment
	  (text-only log output)
	 **/


	function log(level, message, error) {
	  if (error === void 0) {
	    error = '';
	  }

	  /*eslint-disable no-console*/
	  if (typeof window === 'undefined') {
	    console.log("redux-saga " + level + ": " + message + "\n" + (error && error.stack || error));
	  } else {
	    console[level](message, error);
	  }
	}

	function deprecate(fn, deprecationWarning) {
	  return function () {
	    if (process.env.NODE_ENV === 'development') log('warn', deprecationWarning);
	    return fn.apply(void 0, arguments);
	  };
	}

	var updateIncentive = function updateIncentive(deprecated, preferred) {
	  return deprecated + " has been deprecated in favor of " + preferred + ", please update your code";
	};

	exports.updateIncentive = updateIncentive;

	var internalErr = function internalErr(err) {
	  return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + err + "\n");
	};

	exports.internalErr = internalErr;

	var createSetContextWarning = function createSetContextWarning(ctx, props) {
	  return (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
	};

	exports.createSetContextWarning = createSetContextWarning;

	var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
	  return function (action) {
	    return dispatch(Object.defineProperty(action, symbols.SAGA_ACTION, {
	      value: true
	    }));
	  };
	};

	exports.wrapSagaDispatch = wrapSagaDispatch;

	var cloneableGenerator = function cloneableGenerator(generatorFunc) {
	  return function () {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var history = [];
	    var gen = generatorFunc.apply(void 0, args);
	    return {
	      next: function next(arg) {
	        history.push(arg);
	        return gen.next(arg);
	      },
	      clone: function clone() {
	        var clonedGen = cloneableGenerator(generatorFunc).apply(void 0, args);
	        history.forEach(function (arg) {
	          return clonedGen.next(arg);
	        });
	        return clonedGen;
	      },
	      return: function _return(value) {
	        return gen.return(value);
	      },
	      throw: function _throw(exception) {
	        return gen.throw(exception);
	      }
	    };
	  };
	};

	exports.cloneableGenerator = cloneableGenerator;
	});

	unwrapExports(utils);
	var utils_1 = utils.check;
	var utils_2 = utils.hasOwn;
	var utils_3 = utils.remove;
	var utils_4 = utils.once;
	var utils_5 = utils.deferred;
	var utils_6 = utils.arrayOfDeferred;
	var utils_7 = utils.delay;
	var utils_8 = utils.createMockTask;
	var utils_9 = utils.autoInc;
	var utils_10 = utils.makeIterator;
	var utils_11 = utils.log;
	var utils_12 = utils.deprecate;
	var utils_13 = utils.cloneableGenerator;
	var utils_14 = utils.wrapSagaDispatch;
	var utils_15 = utils.createSetContextWarning;
	var utils_16 = utils.internalErr;
	var utils_17 = utils.updateIncentive;
	var utils_18 = utils.uid;
	var utils_19 = utils.array;
	var utils_20 = utils.object;
	var utils_21 = utils.is;
	var utils_22 = utils.identity;
	var utils_23 = utils.noop;
	var utils_24 = utils.kFalse;
	var utils_25 = utils.kTrue;
	var utils_26 = utils.konst;

	var buffers = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.expanding = exports.sliding = exports.dropping = exports.fixed = exports.none = void 0;



	var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
	var ON_OVERFLOW_THROW = 1;
	var ON_OVERFLOW_DROP = 2;
	var ON_OVERFLOW_SLIDE = 3;
	var ON_OVERFLOW_EXPAND = 4;
	var zeroBuffer = {
	  isEmpty: utils.kTrue,
	  put: utils.noop,
	  take: utils.noop
	};

	function ringBuffer(limit, overflowAction) {
	  if (limit === void 0) {
	    limit = 10;
	  }

	  var arr = new Array(limit);
	  var length = 0;
	  var pushIndex = 0;
	  var popIndex = 0;

	  var push = function push(it) {
	    arr[pushIndex] = it;
	    pushIndex = (pushIndex + 1) % limit;
	    length++;
	  };

	  var take = function take() {
	    if (length != 0) {
	      var it = arr[popIndex];
	      arr[popIndex] = null;
	      length--;
	      popIndex = (popIndex + 1) % limit;
	      return it;
	    }
	  };

	  var flush = function flush() {
	    var items = [];

	    while (length) {
	      items.push(take());
	    }

	    return items;
	  };

	  return {
	    isEmpty: function isEmpty() {
	      return length == 0;
	    },
	    put: function put(it) {
	      if (length < limit) {
	        push(it);
	      } else {
	        var doubledLimit;

	        switch (overflowAction) {
	          case ON_OVERFLOW_THROW:
	            throw new Error(BUFFER_OVERFLOW);

	          case ON_OVERFLOW_SLIDE:
	            arr[pushIndex] = it;
	            pushIndex = (pushIndex + 1) % limit;
	            popIndex = pushIndex;
	            break;

	          case ON_OVERFLOW_EXPAND:
	            doubledLimit = 2 * limit;
	            arr = flush();
	            length = arr.length;
	            pushIndex = arr.length;
	            popIndex = 0;
	            arr.length = doubledLimit;
	            limit = doubledLimit;
	            push(it);
	            break;

	          default: // DROP

	        }
	      }
	    },
	    take: take,
	    flush: flush
	  };
	}

	var none = function none() {
	  return zeroBuffer;
	};

	exports.none = none;

	var fixed = function fixed(limit) {
	  return ringBuffer(limit, ON_OVERFLOW_THROW);
	};

	exports.fixed = fixed;

	var dropping = function dropping(limit) {
	  return ringBuffer(limit, ON_OVERFLOW_DROP);
	};

	exports.dropping = dropping;

	var sliding = function sliding(limit) {
	  return ringBuffer(limit, ON_OVERFLOW_SLIDE);
	};

	exports.sliding = sliding;

	var expanding = function expanding(initialSize) {
	  return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
	};

	exports.expanding = expanding;
	});

	unwrapExports(buffers);
	var buffers_1 = buffers.expanding;
	var buffers_2 = buffers.sliding;
	var buffers_3 = buffers.dropping;
	var buffers_4 = buffers.fixed;
	var buffers_5 = buffers.none;

	var scheduler = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.asap = asap;
	exports.suspend = suspend;
	exports.flush = flush;
	var queue = [];
	/**
	  Variable to hold a counting semaphore
	  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
	    already suspended)
	  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
	    triggers flushing the queued tasks.
	**/

	var semaphore = 0;
	/**
	  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
	  and flushed after this task has finished (assuming the scheduler endup in a released
	  state).
	**/

	function exec(task) {
	  try {
	    suspend();
	    task();
	  } finally {
	    release();
	  }
	}
	/**
	  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
	**/


	function asap(task) {
	  queue.push(task);

	  if (!semaphore) {
	    suspend();
	    flush();
	  }
	}
	/**
	  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
	  scheduler is released.
	**/


	function suspend() {
	  semaphore++;
	}
	/**
	  Puts the scheduler in a `released` state.
	**/


	function release() {
	  semaphore--;
	}
	/**
	  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
	**/


	function flush() {
	  release();
	  var task;

	  while (!semaphore && (task = queue.shift()) !== undefined) {
	    exec(task);
	  }
	}
	});

	unwrapExports(scheduler);
	var scheduler_1 = scheduler.asap;
	var scheduler_2 = scheduler.suspend;
	var scheduler_3 = scheduler.flush;

	var matcher_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = matcher;
	exports.wildcard = exports.symbol = exports.string = exports.predicate = exports.array = void 0;



	var array = function array(patterns) {
	  return function (input) {
	    return patterns.some(function (p) {
	      return matcher(p)(input);
	    });
	  };
	};

	exports.array = array;

	var predicate = function predicate(_predicate) {
	  return function (input) {
	    return _predicate(input);
	  };
	};

	exports.predicate = predicate;

	var string = function string(pattern) {
	  return function (input) {
	    return input.type === String(pattern);
	  };
	};

	exports.string = string;

	var symbol = function symbol(pattern) {
	  return function (input) {
	    return input.type === pattern;
	  };
	};

	exports.symbol = symbol;

	var wildcard = function wildcard() {
	  return utils.kTrue;
	};

	exports.wildcard = wildcard;

	function matcher(pattern) {
	  // prettier-ignore
	  var matcherCreator = pattern === '*' ? wildcard : utils.is.string(pattern) ? string : utils.is.array(pattern) ? array : utils.is.stringableFunc(pattern) ? string : utils.is.func(pattern) ? predicate : utils.is.symbol(pattern) ? symbol : null;

	  if (matcherCreator === null) {
	    throw new Error("invalid pattern: " + pattern);
	  }

	  return matcherCreator(pattern);
	}
	});

	unwrapExports(matcher_1);
	var matcher_2 = matcher_1.wildcard;
	var matcher_3 = matcher_1.symbol;
	var matcher_4 = matcher_1.string;
	var matcher_5 = matcher_1.predicate;
	var matcher_6 = matcher_1.array;

	var channel_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.channel = channel;
	exports.eventChannel = eventChannel;
	exports.multicastChannel = multicastChannel;
	exports.stdChannel = stdChannel;
	exports.isEnd = exports.END = void 0;





	var buffers$$1 =
	/*#__PURE__*/
	_interopRequireWildcard(
	/*#__PURE__*/
	buffers);



	var matchers =
	/*#__PURE__*/
	_interopRequireWildcard(
	/*#__PURE__*/
	matcher_1);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	var END = {
	  type: symbols.CHANNEL_END_TYPE
	};
	exports.END = END;

	var isEnd = function isEnd(a) {
	  return a && a.type === symbols.CHANNEL_END_TYPE;
	};

	exports.isEnd = isEnd;
	var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
	var UNDEFINED_INPUT_ERROR = "Saga or channel was provided with an undefined action\nHints:\n  - check that your Action Creator returns a non-undefined value\n  - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners";

	function channel(buffer) {
	  if (buffer === void 0) {
	    buffer = buffers$$1.expanding();
	  }

	  var closed = false;
	  var takers = [];

	  if (process.env.NODE_ENV === 'development') {
	    (0, utils.check)(buffer, utils.is.buffer, INVALID_BUFFER);
	  }

	  function checkForbiddenStates() {
	    if (closed && takers.length) {
	      throw (0, utils.internalErr)('Cannot have a closed channel with pending takers');
	    }

	    if (takers.length && !buffer.isEmpty()) {
	      throw (0, utils.internalErr)('Cannot have pending takers with non empty buffer');
	    }
	  }

	  function put(input) {
	    checkForbiddenStates();

	    if (process.env.NODE_ENV === 'development') {
	      (0, utils.check)(input, utils.is.notUndef, UNDEFINED_INPUT_ERROR);
	    }

	    if (closed) {
	      return;
	    }

	    if (!takers.length) {
	      return buffer.put(input);
	    }

	    var cb = takers[0];
	    takers.splice(0, 1);
	    cb(input);
	  }

	  function take(cb) {
	    checkForbiddenStates();

	    if (process.env.NODE_ENV === 'development') {
	      (0, utils.check)(cb, utils.is.func, "channel.take's callback must be a function");
	    }

	    if (closed && buffer.isEmpty()) {
	      cb(END);
	    } else if (!buffer.isEmpty()) {
	      cb(buffer.take());
	    } else {
	      takers.push(cb);

	      cb.cancel = function () {
	        return (0, utils.remove)(takers, cb);
	      };
	    }
	  }

	  function flush(cb) {
	    checkForbiddenStates(); // TODO: check if some new state should be forbidden now

	    if (process.env.NODE_ENV === 'development') {
	      (0, utils.check)(cb, utils.is.func, "channel.flush' callback must be a function");
	    }

	    if (closed && buffer.isEmpty()) {
	      cb(END);
	      return;
	    }

	    cb(buffer.flush());
	  }

	  function close() {
	    checkForbiddenStates();

	    if (!closed) {
	      closed = true;

	      if (takers.length) {
	        var arr = takers;
	        takers = [];

	        for (var i = 0, len = arr.length; i < len; i++) {
	          var taker = arr[i];
	          taker(END);
	        }
	      }
	    }
	  }

	  return {
	    take: take,
	    put: put,
	    flush: flush,
	    close: close
	  };
	}

	function eventChannel(subscribe, buffer) {
	  if (buffer === void 0) {
	    buffer = buffers$$1.none();
	  }

	  var closed = false;
	  var unsubscribe;
	  var chan = channel(buffer);

	  var close = function close() {
	    if (utils.is.func(unsubscribe)) {
	      unsubscribe();
	    }

	    chan.close();
	  };

	  unsubscribe = subscribe(function (input) {
	    if (isEnd(input)) {
	      close();
	      closed = true;
	      return;
	    }

	    chan.put(input);
	  });

	  if (!utils.is.func(unsubscribe)) {
	    throw new Error('in eventChannel: subscribe should return a function to unsubscribe');
	  }

	  unsubscribe = (0, utils.once)(unsubscribe);

	  if (closed) {
	    unsubscribe();
	  }

	  return {
	    take: chan.take,
	    flush: chan.flush,
	    close: close
	  };
	}

	function multicastChannel() {
	  var _ref;

	  var closed = false;
	  var currentTakers = [];
	  var nextTakers = currentTakers;

	  var ensureCanMutateNextTakers = function ensureCanMutateNextTakers() {
	    if (nextTakers !== currentTakers) {
	      return;
	    }

	    nextTakers = currentTakers.slice();
	  }; // TODO: check if its possible to extract closing function and reuse it in both unicasts and multicasts


	  var close = function close() {
	    closed = true;
	    var takers = currentTakers = nextTakers;

	    for (var i = 0; i < takers.length; i++) {
	      var taker = takers[i];
	      taker(END);
	    }

	    nextTakers = [];
	  };

	  return _ref = {}, _ref[symbols.MULTICAST] = true, _ref.put = function put(input) {
	    // TODO: should I check forbidden state here? 1 of them is even impossible
	    // as we do not possibility of buffer here
	    if (process.env.NODE_ENV === 'development') {
	      (0, utils.check)(input, utils.is.notUndef, UNDEFINED_INPUT_ERROR);
	    }

	    if (closed) {
	      return;
	    }

	    if (isEnd(input)) {
	      close();
	      return;
	    }

	    var takers = currentTakers = nextTakers;

	    for (var i = 0; i < takers.length; i++) {
	      var taker = takers[i];

	      if (taker[symbols.MATCH](input)) {
	        taker.cancel();
	        taker(input);
	      }
	    }
	  }, _ref.take = function take(cb, matcher) {
	    if (matcher === void 0) {
	      matcher = matchers.wildcard;
	    }

	    if (closed) {
	      cb(END);
	      return;
	    }

	    cb[symbols.MATCH] = matcher;
	    ensureCanMutateNextTakers();
	    nextTakers.push(cb);
	    cb.cancel = (0, utils.once)(function () {
	      ensureCanMutateNextTakers();
	      (0, utils.remove)(nextTakers, cb);
	    });
	  }, _ref.close = close, _ref;
	}

	function stdChannel() {
	  var chan = multicastChannel();
	  var put = chan.put;

	  chan.put = function (input) {
	    if (input[symbols.SAGA_ACTION]) {
	      put(input);
	      return;
	    }

	    (0, scheduler.asap)(function () {
	      return put(input);
	    });
	  };

	  return chan;
	}
	});

	unwrapExports(channel_1);
	var channel_2 = channel_1.channel;
	var channel_3 = channel_1.eventChannel;
	var channel_4 = channel_1.multicastChannel;
	var channel_5 = channel_1.stdChannel;
	var channel_6 = channel_1.isEnd;
	var channel_7 = channel_1.END;

	var errorUtils = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getLocation = getLocation;
	exports.sagaStackToString = sagaStackToString;
	exports.addSagaStack = addSagaStack;



	function formatLocation(fileName, lineNumber) {
	  return fileName + "?" + lineNumber;
	}

	function getLocation(instrumented) {
	  return instrumented[symbols.SAGA_LOCATION];
	}

	function effectLocationAsString(effect) {
	  var location = getLocation(effect);

	  if (location) {
	    var code = location.code,
	        fileName = location.fileName,
	        lineNumber = location.lineNumber;
	    var source = code + "  " + formatLocation(fileName, lineNumber);
	    return source;
	  }

	  return '';
	}

	function sagaLocationAsString(sagaMeta) {
	  var name = sagaMeta.name,
	      location = sagaMeta.location;

	  if (location) {
	    return name + "  " + formatLocation(location.fileName, location.lineNumber);
	  }

	  return name;
	}

	var flatMap = function flatMap(arr, getter) {
	  if (getter === void 0) {
	    getter = function getter(f) {
	      return f;
	    };
	  }

	  return arr.reduce(function (acc, i) {
	    return acc.concat(getter(i));
	  }, []);
	};

	function cancelledTasksAsString(sagaStack) {
	  var cancelledTasks = flatMap(sagaStack, function (i) {
	    return i.cancelledTasks;
	  });

	  if (!cancelledTasks.length) {
	    return '';
	  }

	  return ['Tasks cancelled due to error:'].concat(cancelledTasks).join('\n');
	}
	/**
	    @param {saga, effect}[] sagaStack
	    @returns {string}

	    @example
	    The above error occurred in task errorInPutSaga {pathToFile}
	    when executing effect put({type: 'REDUCER_ACTION_ERROR_IN_PUT'}) {pathToFile}
	        created by fetchSaga {pathToFile}
	        created by rootSaga {pathToFile}
	*/


	function sagaStackToString(sagaStack) {
	  var firstSaga = sagaStack[0],
	      otherSagas = sagaStack.slice(1);
	  var crashedEffectLocation = firstSaga.effect ? effectLocationAsString(firstSaga.effect) : null;
	  var errorMessage = "The above error occurred in task " + sagaLocationAsString(firstSaga.meta) + (crashedEffectLocation ? " \n when executing effect " + crashedEffectLocation : '');
	  return [errorMessage].concat(otherSagas.map(function (s) {
	    return "    created by " + sagaLocationAsString(s.meta);
	  }), [cancelledTasksAsString(sagaStack)]).join('\n');
	}

	function addSagaStack(errorObject, errorStack) {
	  if (typeof errorObject === 'object') {
	    if (typeof errorObject.sagaStack === 'undefined') {
	      // property is used as a stack of descriptors for failed sagas
	      // after formatting to string it will be re-written
	      // to pass sagaStack as a string in user land
	      Object.defineProperty(errorObject, 'sagaStack', {
	        value: [],
	        writable: true,
	        enumerable: false
	      });
	    }

	    errorObject.sagaStack.push(errorStack);
	  }
	}
	});

	unwrapExports(errorUtils);
	var errorUtils_1 = errorUtils.getLocation;
	var errorUtils_2 = errorUtils.sagaStackToString;
	var errorUtils_3 = errorUtils.addSagaStack;

	var fsmIterator_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.safeName = safeName;
	exports.default = fsmIterator;
	exports.qEnd = void 0;



	var done = {
	  done: true,
	  value: undefined
	};
	var qEnd = {};
	exports.qEnd = qEnd;

	function safeName(patternOrChannel) {
	  if (utils.is.channel(patternOrChannel)) {
	    return 'channel';
	  }

	  if (utils.is.stringableFunc(patternOrChannel)) {
	    return String(patternOrChannel);
	  }

	  if (utils.is.func(patternOrChannel)) {
	    return patternOrChannel.name;
	  }

	  return String(patternOrChannel);
	}

	function fsmIterator(fsm, q0, name) {
	  var updateState,
	      qNext = q0;

	  function next(arg, error) {
	    if (qNext === qEnd) {
	      return done;
	    }

	    if (error) {
	      qNext = qEnd;
	      throw error;
	    } else {
	      updateState && updateState(arg);

	      var _fsm$qNext = fsm[qNext](),
	          q = _fsm$qNext[0],
	          output = _fsm$qNext[1],
	          _updateState = _fsm$qNext[2];

	      qNext = q;
	      updateState = _updateState;
	      return qNext === qEnd ? done : output;
	    }
	  }

	  return (0, utils.makeIterator)(next, function (error) {
	    return next(null, error);
	  }, name);
	}
	});

	unwrapExports(fsmIterator_1);
	var fsmIterator_2 = fsmIterator_1.safeName;
	var fsmIterator_3 = fsmIterator_1.qEnd;

	var takeEvery_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = takeEvery;

	var _fsmIterator =
	/*#__PURE__*/
	_interopRequireWildcard(
	/*#__PURE__*/
	fsmIterator_1);





	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function takeEvery(patternOrChannel, worker) {
	  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  var yTake = {
	    done: false,
	    value: (0, io.take)(patternOrChannel)
	  };

	  var yFork = function yFork(ac) {
	    return {
	      done: false,
	      value: io.fork.apply(void 0, [worker].concat(args, [ac]))
	    };
	  };

	  var action,
	      setAction = function setAction(ac) {
	    return action = ac;
	  };

	  return (0, _fsmIterator.default)({
	    q1: function q1() {
	      return ['q2', yTake, setAction];
	    },
	    q2: function q2() {
	      return action === channel_1.END ? [_fsmIterator.qEnd] : ['q1', yFork(action)];
	    }
	  }, 'q1', "takeEvery(" + (0, _fsmIterator.safeName)(patternOrChannel) + ", " + worker.name + ")");
	}
	});

	unwrapExports(takeEvery_1);

	var takeLatest_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = takeLatest;

	var _fsmIterator =
	/*#__PURE__*/
	_interopRequireWildcard(
	/*#__PURE__*/
	fsmIterator_1);





	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function takeLatest(patternOrChannel, worker) {
	  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  var yTake = {
	    done: false,
	    value: (0, io.take)(patternOrChannel)
	  };

	  var yFork = function yFork(ac) {
	    return {
	      done: false,
	      value: io.fork.apply(void 0, [worker].concat(args, [ac]))
	    };
	  };

	  var yCancel = function yCancel(task) {
	    return {
	      done: false,
	      value: (0, io.cancel)(task)
	    };
	  };

	  var task, action;

	  var setTask = function setTask(t) {
	    return task = t;
	  };

	  var setAction = function setAction(ac) {
	    return action = ac;
	  };

	  return (0, _fsmIterator.default)({
	    q1: function q1() {
	      return ['q2', yTake, setAction];
	    },
	    q2: function q2() {
	      return action === channel_1.END ? [_fsmIterator.qEnd] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
	    },
	    q3: function q3() {
	      return ['q1', yFork(action), setTask];
	    }
	  }, 'q1', "takeLatest(" + (0, _fsmIterator.safeName)(patternOrChannel) + ", " + worker.name + ")");
	}
	});

	unwrapExports(takeLatest_1);

	var takeLeading_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = takeLeading;

	var _fsmIterator =
	/*#__PURE__*/
	_interopRequireWildcard(
	/*#__PURE__*/
	fsmIterator_1);





	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function takeLeading(patternOrChannel, worker) {
	  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  var yTake = {
	    done: false,
	    value: (0, io.take)(patternOrChannel)
	  };

	  var yCall = function yCall(ac) {
	    return {
	      done: false,
	      value: io.call.apply(void 0, [worker].concat(args, [ac]))
	    };
	  };

	  var action;

	  var setAction = function setAction(ac) {
	    return action = ac;
	  };

	  return (0, _fsmIterator.default)({
	    q1: function q1() {
	      return ['q2', yTake, setAction];
	    },
	    q2: function q2() {
	      return action === channel_1.END ? [_fsmIterator.qEnd] : ['q1', yCall(action)];
	    }
	  }, 'q1', "takeLeading(" + (0, _fsmIterator.safeName)(patternOrChannel) + ", " + worker.name + ")");
	}
	});

	unwrapExports(takeLeading_1);

	var throttle_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = throttle;

	var _fsmIterator =
	/*#__PURE__*/
	_interopRequireWildcard(
	/*#__PURE__*/
	fsmIterator_1);





	var buffers$$1 =
	/*#__PURE__*/
	_interopRequireWildcard(
	/*#__PURE__*/
	buffers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function throttle(delayLength, pattern, worker) {
	  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	    args[_key - 3] = arguments[_key];
	  }

	  var action, channel;
	  var yActionChannel = {
	    done: false,
	    value: (0, io.actionChannel)(pattern, buffers$$1.sliding(1))
	  };

	  var yTake = function yTake() {
	    return {
	      done: false,
	      value: (0, io.take)(channel)
	    };
	  };

	  var yFork = function yFork(ac) {
	    return {
	      done: false,
	      value: io.fork.apply(void 0, [worker].concat(args, [ac]))
	    };
	  };

	  var yDelay = {
	    done: false,
	    value: (0, io.delay)(delayLength)
	  };

	  var setAction = function setAction(ac) {
	    return action = ac;
	  };

	  var setChannel = function setChannel(ch) {
	    return channel = ch;
	  };

	  return (0, _fsmIterator.default)({
	    q1: function q1() {
	      return ['q2', yActionChannel, setChannel];
	    },
	    q2: function q2() {
	      return ['q3', yTake(), setAction];
	    },
	    q3: function q3() {
	      return action === channel_1.END ? [_fsmIterator.qEnd] : ['q4', yFork(action)];
	    },
	    q4: function q4() {
	      return ['q2', yDelay];
	    }
	  }, 'q1', "throttle(" + (0, _fsmIterator.safeName)(pattern) + ", " + worker.name + ")");
	}
	});

	unwrapExports(throttle_1);

	var sagaHelpers = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "takeEveryHelper", {
	  enumerable: true,
	  get: function get() {
	    return _takeEvery.default;
	  }
	});
	Object.defineProperty(exports, "takeLatestHelper", {
	  enumerable: true,
	  get: function get() {
	    return _takeLatest.default;
	  }
	});
	Object.defineProperty(exports, "takeLeadingHelper", {
	  enumerable: true,
	  get: function get() {
	    return _takeLeading.default;
	  }
	});
	Object.defineProperty(exports, "throttleHelper", {
	  enumerable: true,
	  get: function get() {
	    return _throttle.default;
	  }
	});

	var _takeEvery =
	/*#__PURE__*/
	_interopRequireDefault(
	/*#__PURE__*/
	takeEvery_1);

	var _takeLatest =
	/*#__PURE__*/
	_interopRequireDefault(
	/*#__PURE__*/
	takeLatest_1);

	var _takeLeading =
	/*#__PURE__*/
	_interopRequireDefault(
	/*#__PURE__*/
	takeLeading_1);

	var _throttle =
	/*#__PURE__*/
	_interopRequireDefault(
	/*#__PURE__*/
	throttle_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	});

	unwrapExports(sagaHelpers);

	var io = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.take = take;
	exports.put = put;
	exports.all = all;
	exports.race = race;
	exports.call = call;
	exports.apply = apply;
	exports.cps = cps;
	exports.fork = fork;
	exports.spawn = spawn;
	exports.join = join;
	exports.cancel = cancel;
	exports.select = select;
	exports.actionChannel = actionChannel;
	exports.cancelled = cancelled;
	exports.flush = flush;
	exports.getContext = getContext;
	exports.setContext = setContext;
	exports.takeEvery = takeEvery;
	exports.takeLatest = takeLatest;
	exports.takeLeading = takeLeading;
	exports.throttle = throttle;
	exports.asEffect = exports.delay = exports.putResolve = exports.takeMaybe = exports.detach = void 0;







	var TAKE = 'TAKE';
	var PUT = 'PUT';
	var ALL = 'ALL';
	var RACE = 'RACE';
	var CALL = 'CALL';
	var CPS = 'CPS';
	var FORK = 'FORK';
	var JOIN = 'JOIN';
	var CANCEL = 'CANCEL';
	var SELECT = 'SELECT';
	var ACTION_CHANNEL = 'ACTION_CHANNEL';
	var CANCELLED = 'CANCELLED';
	var FLUSH = 'FLUSH';
	var GET_CONTEXT = 'GET_CONTEXT';
	var SET_CONTEXT = 'SET_CONTEXT';
	var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

	var effect = function effect(type, payload) {
	  var _ref;

	  return _ref = {}, _ref[symbols.IO] = true, _ref[type] = payload, _ref;
	};

	var detach = function detach(eff) {
	  if (process.env.NODE_ENV === 'development') {
	    (0, utils.check)(asEffect.fork(eff), utils.is.object, 'detach(eff): argument must be a fork effect');
	  }

	  eff[FORK].detached = true;
	  return eff;
	};

	exports.detach = detach;

	function take(patternOrChannel, multicastPattern) {
	  if (patternOrChannel === void 0) {
	    patternOrChannel = '*';
	  }

	  if (process.env.NODE_ENV === 'development' && arguments.length) {
	    (0, utils.check)(arguments[0], utils.is.notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
	  }

	  if (utils.is.pattern(patternOrChannel)) {
	    return effect(TAKE, {
	      pattern: patternOrChannel
	    });
	  }

	  if (utils.is.multicast(patternOrChannel) && utils.is.notUndef(multicastPattern) && utils.is.pattern(multicastPattern)) {
	    return effect(TAKE, {
	      channel: patternOrChannel,
	      pattern: multicastPattern
	    });
	  }

	  if (utils.is.channel(patternOrChannel)) {
	    return effect(TAKE, {
	      channel: patternOrChannel
	    });
	  }

	  throw new Error("take(patternOrChannel): argument " + patternOrChannel + " is not valid channel or a valid pattern");
	}

	var takeMaybe = function takeMaybe() {
	  var eff = take.apply(void 0, arguments);
	  eff[TAKE].maybe = true;
	  return eff;
	};

	exports.takeMaybe = takeMaybe;

	function put(channel, action) {
	  if (process.env.NODE_ENV === 'development') {
	    if (arguments.length > 1) {
	      (0, utils.check)(channel, utils.is.notUndef, 'put(channel, action): argument channel is undefined');
	      (0, utils.check)(channel, utils.is.channel, "put(channel, action): argument " + channel + " is not a valid channel");
	      (0, utils.check)(action, utils.is.notUndef, 'put(channel, action): argument action is undefined');
	    } else {
	      (0, utils.check)(channel, utils.is.notUndef, 'put(action): argument action is undefined');
	    }
	  }

	  if (utils.is.undef(action)) {
	    action = channel;
	    channel = null;
	  }

	  return effect(PUT, {
	    channel: channel,
	    action: action
	  });
	}

	var putResolve = function putResolve() {
	  var eff = put.apply(void 0, arguments);
	  eff[PUT].resolve = true;
	  return eff;
	};

	exports.putResolve = putResolve;

	function all(effects) {
	  return effect(ALL, effects);
	}

	function race(effects) {
	  return effect(RACE, effects);
	}

	function getFnCallDesc(meth, fn, args) {
	  if (process.env.NODE_ENV === 'development') {
	    (0, utils.check)(fn, utils.is.notUndef, meth + ": argument fn is undefined");
	  }

	  var context = null;

	  if (utils.is.array(fn)) {
	    var _fn = fn;
	    context = _fn[0];
	    fn = _fn[1];
	  } else if (fn.fn) {
	    var _fn2 = fn;
	    context = _fn2.context;
	    fn = _fn2.fn;
	  }

	  if (context && utils.is.string(fn) && utils.is.func(context[fn])) {
	    fn = context[fn];
	  }

	  if (process.env.NODE_ENV === 'development') {
	    (0, utils.check)(fn, utils.is.func, meth + ": argument " + fn + " is not a function");
	  }

	  return {
	    context: context,
	    fn: fn,
	    args: args
	  };
	}

	function call(fn) {
	  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return effect(CALL, getFnCallDesc('call', fn, args));
	}

	function apply(context, fn, args) {
	  if (args === void 0) {
	    args = [];
	  }

	  return effect(CALL, getFnCallDesc('apply', {
	    context: context,
	    fn: fn
	  }, args));
	}

	function cps(fn) {
	  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    args[_key2 - 1] = arguments[_key2];
	  }

	  return effect(CPS, getFnCallDesc('cps', fn, args));
	}

	function fork(fn) {
	  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    args[_key3 - 1] = arguments[_key3];
	  }

	  return effect(FORK, getFnCallDesc('fork', fn, args));
	}

	function spawn(fn) {
	  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    args[_key4 - 1] = arguments[_key4];
	  }

	  return detach(fork.apply(void 0, [fn].concat(args)));
	}

	function join() {
	  for (var _len5 = arguments.length, tasks = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	    tasks[_key5] = arguments[_key5];
	  }

	  if (tasks.length > 1) {
	    return all(tasks.map(function (t) {
	      return join(t);
	    }));
	  }

	  var task = tasks[0];

	  if (process.env.NODE_ENV === 'development') {
	    (0, utils.check)(task, utils.is.notUndef, 'join(task): argument task is undefined');
	    (0, utils.check)(task, utils.is.task, "join(task): argument " + task + " is not a valid Task object " + TEST_HINT);
	  }

	  return effect(JOIN, task);
	}

	function cancel() {
	  for (var _len6 = arguments.length, tasks = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	    tasks[_key6] = arguments[_key6];
	  }

	  if (tasks.length > 1) {
	    return all(tasks.map(function (t) {
	      return cancel(t);
	    }));
	  }

	  var task = tasks[0];

	  if (process.env.NODE_ENV === 'development' && tasks.length === 1) {
	    (0, utils.check)(task, utils.is.notUndef, 'cancel(task): argument task is undefined');
	    (0, utils.check)(task, utils.is.task, "cancel(task): argument " + task + " is not a valid Task object " + TEST_HINT);
	  }

	  return effect(CANCEL, task || symbols.SELF_CANCELLATION);
	}

	function select(selector) {
	  if (selector === void 0) {
	    selector = utils.identity;
	  }

	  for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
	    args[_key7 - 1] = arguments[_key7];
	  }

	  if (process.env.NODE_ENV === 'development' && arguments.length) {
	    (0, utils.check)(arguments[0], utils.is.notUndef, 'select(selector, [...]): argument selector is undefined');
	    (0, utils.check)(selector, utils.is.func, "select(selector, [...]): argument " + selector + " is not a function");
	  }

	  return effect(SELECT, {
	    selector: selector,
	    args: args
	  });
	}
	/**
	  channel(pattern, [buffer])    => creates a proxy channel for store actions
	**/


	function actionChannel(pattern, buffer) {
	  if (process.env.NODE_ENV === 'development') {
	    (0, utils.check)(pattern, utils.is.notUndef, 'actionChannel(pattern,...): argument pattern is undefined');

	    if (arguments.length > 1) {
	      (0, utils.check)(buffer, utils.is.notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
	      (0, utils.check)(buffer, utils.is.buffer, "actionChannel(pattern, buffer): argument " + buffer + " is not a valid buffer");
	    }
	  }

	  return effect(ACTION_CHANNEL, {
	    pattern: pattern,
	    buffer: buffer
	  });
	}

	function cancelled() {
	  return effect(CANCELLED, {});
	}

	function flush(channel) {
	  if (process.env.NODE_ENV === 'development') {
	    (0, utils.check)(channel, utils.is.channel, "flush(channel): argument " + channel + " is not valid channel");
	  }

	  return effect(FLUSH, channel);
	}

	function getContext(prop) {
	  if (process.env.NODE_ENV === 'development') {
	    (0, utils.check)(prop, utils.is.string, "getContext(prop): argument " + prop + " is not a string");
	  }

	  return effect(GET_CONTEXT, prop);
	}

	function setContext(props) {
	  if (process.env.NODE_ENV === 'development') {
	    (0, utils.check)(props, utils.is.object, (0, utils.createSetContextWarning)(null, props));
	  }

	  return effect(SET_CONTEXT, props);
	}

	function takeEvery(patternOrChannel, worker) {
	  for (var _len8 = arguments.length, args = new Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
	    args[_key8 - 2] = arguments[_key8];
	  }

	  return fork.apply(void 0, [sagaHelpers.takeEveryHelper, patternOrChannel, worker].concat(args));
	}

	function takeLatest(patternOrChannel, worker) {
	  for (var _len9 = arguments.length, args = new Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
	    args[_key9 - 2] = arguments[_key9];
	  }

	  return fork.apply(void 0, [sagaHelpers.takeLatestHelper, patternOrChannel, worker].concat(args));
	}

	function takeLeading(patternOrChannel, worker) {
	  for (var _len10 = arguments.length, args = new Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
	    args[_key10 - 2] = arguments[_key10];
	  }

	  return fork.apply(void 0, [sagaHelpers.takeLeadingHelper, patternOrChannel, worker].concat(args));
	}

	function throttle(ms, pattern, worker) {
	  for (var _len11 = arguments.length, args = new Array(_len11 > 3 ? _len11 - 3 : 0), _key11 = 3; _key11 < _len11; _key11++) {
	    args[_key11 - 3] = arguments[_key11];
	  }

	  return fork.apply(void 0, [sagaHelpers.throttleHelper, ms, pattern, worker].concat(args));
	}

	var delay =
	/*#__PURE__*/
	call.bind(null, utils.delay);
	exports.delay = delay;

	var createAsEffectType = function createAsEffectType(type) {
	  return function (effect) {
	    return effect && effect[symbols.IO] && effect[type];
	  };
	};

	var asEffect = {
	  take:
	  /*#__PURE__*/
	  createAsEffectType(TAKE),
	  put:
	  /*#__PURE__*/
	  createAsEffectType(PUT),
	  all:
	  /*#__PURE__*/
	  createAsEffectType(ALL),
	  race:
	  /*#__PURE__*/
	  createAsEffectType(RACE),
	  call:
	  /*#__PURE__*/
	  createAsEffectType(CALL),
	  cps:
	  /*#__PURE__*/
	  createAsEffectType(CPS),
	  fork:
	  /*#__PURE__*/
	  createAsEffectType(FORK),
	  join:
	  /*#__PURE__*/
	  createAsEffectType(JOIN),
	  cancel:
	  /*#__PURE__*/
	  createAsEffectType(CANCEL),
	  select:
	  /*#__PURE__*/
	  createAsEffectType(SELECT),
	  actionChannel:
	  /*#__PURE__*/
	  createAsEffectType(ACTION_CHANNEL),
	  cancelled:
	  /*#__PURE__*/
	  createAsEffectType(CANCELLED),
	  flush:
	  /*#__PURE__*/
	  createAsEffectType(FLUSH),
	  getContext:
	  /*#__PURE__*/
	  createAsEffectType(GET_CONTEXT),
	  setContext:
	  /*#__PURE__*/
	  createAsEffectType(SET_CONTEXT)
	};
	exports.asEffect = asEffect;
	});

	unwrapExports(io);
	var io_1 = io.take;
	var io_2 = io.put;
	var io_3 = io.all;
	var io_4 = io.race;
	var io_5 = io.call;
	var io_6 = io.apply;
	var io_7 = io.cps;
	var io_8 = io.fork;
	var io_9 = io.spawn;
	var io_10 = io.join;
	var io_11 = io.cancel;
	var io_12 = io.select;
	var io_13 = io.actionChannel;
	var io_14 = io.cancelled;
	var io_15 = io.flush;
	var io_16 = io.getContext;
	var io_17 = io.setContext;
	var io_18 = io.takeEvery;
	var io_19 = io.takeLatest;
	var io_20 = io.takeLeading;
	var io_21 = io.throttle;
	var io_22 = io.asEffect;
	var io_23 = io.delay;
	var io_24 = io.putResolve;
	var io_25 = io.takeMaybe;
	var io_26 = io.detach;

	var proc_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getMetaInfo = getMetaInfo;
	exports.default = proc;
	exports.TASK_CANCEL = exports.CHANNEL_END = void 0;













	var _matcher =
	/*#__PURE__*/
	_interopRequireDefault(
	/*#__PURE__*/
	matcher_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function getMetaInfo(fn) {
	  return {
	    name: fn.name || 'anonymous',
	    location: (0, errorUtils.getLocation)(fn)
	  };
	}

	function getIteratorMetaInfo(iterator, fn) {
	  if (iterator.isSagaIterator) {
	    return {
	      name: iterator.meta.name
	    };
	  }

	  return getMetaInfo(fn);
	} // TODO: check if this hacky toString stuff is needed
	// also check again whats the difference between CHANNEL_END and CHANNEL_END_TYPE
	// maybe this could become MAYBE_END
	// I guess this gets exported so takeMaybe result can be checked


	var CHANNEL_END = {
	  toString: function toString() {
	    return symbols.CHANNEL_END;
	  }
	};
	exports.CHANNEL_END = CHANNEL_END;
	var TASK_CANCEL = {
	  toString: function toString() {
	    return symbols.TASK_CANCEL;
	  }
	};
	/**
	  Used to track a parent task and its forks
	  In the new fork model, forked tasks are attached by default to their parent
	  We model this using the concept of Parent task && main Task
	  main task is the main flow of the current Generator, the parent tasks is the
	  aggregation of the main tasks + all its forked tasks.
	  Thus the whole model represents an execution tree with multiple branches (vs the
	  linear execution tree in sequential (non parallel) programming)

	  A parent tasks has the following semantics
	  - It completes if all its forks either complete or all cancelled
	  - If it's cancelled, all forks are cancelled as well
	  - It aborts if any uncaught error bubbles up from forks
	  - If it completes, the return value is the one returned by the main task
	**/

	exports.TASK_CANCEL = TASK_CANCEL;

	function forkQueue(mainTask, onAbort, cb) {
	  var tasks = [],
	      result,
	      completed = false;
	  addTask(mainTask);

	  var getTasks = function getTasks() {
	    return tasks;
	  };

	  var getTaskNames = function getTaskNames() {
	    return tasks.map(function (t) {
	      return t.meta.name;
	    });
	  };

	  function abort(err) {
	    onAbort();
	    cancelAll();
	    cb(err, true);
	  }

	  function addTask(task) {
	    tasks.push(task);

	    task.cont = function (res, isErr) {
	      if (completed) {
	        return;
	      }

	      (0, utils.remove)(tasks, task);
	      task.cont = utils.noop;

	      if (isErr) {
	        abort(res);
	      } else {
	        if (task === mainTask) {
	          result = res;
	        }

	        if (!tasks.length) {
	          completed = true;
	          cb(result);
	        }
	      }
	    }; // task.cont.cancel = task.cancel

	  }

	  function cancelAll() {
	    if (completed) {
	      return;
	    }

	    completed = true;
	    tasks.forEach(function (t) {
	      t.cont = utils.noop;
	      t.cancel();
	    });
	    tasks = [];
	  }

	  return {
	    addTask: addTask,
	    cancelAll: cancelAll,
	    abort: abort,
	    getTasks: getTasks,
	    getTaskNames: getTaskNames
	  };
	}

	function createTaskIterator(_ref) {
	  var context = _ref.context,
	      fn = _ref.fn,
	      args = _ref.args;

	  if (utils.is.iterator(fn)) {
	    return fn;
	  } // catch synchronous failures; see #152 and #441


	  var result, error;

	  try {
	    result = fn.apply(context, args);
	  } catch (err) {
	    error = err;
	  } // i.e. a generator function returns an iterator


	  if (utils.is.iterator(result)) {
	    return result;
	  } // do not bubble up synchronous failures for detached forks
	  // instead create a failed task. See #152 and #441


	  return error ? (0, utils.makeIterator)(function () {
	    throw error;
	  }) : (0, utils.makeIterator)(function () {
	    var pc;
	    var eff = {
	      done: false,
	      value: result
	    };

	    var ret = function ret(value) {
	      return {
	        done: true,
	        value: value
	      };
	    };

	    return function (arg) {
	      if (!pc) {
	        pc = true;
	        return eff;
	      } else {
	        return ret(arg);
	      }
	    };
	  }());
	}

	function proc(iterator, stdChannel, dispatch, getState, parentContext, options, parentEffectId, meta, cont) {
	  if (dispatch === void 0) {
	    dispatch = utils.noop;
	  }

	  if (getState === void 0) {
	    getState = utils.noop;
	  }

	  if (parentContext === void 0) {
	    parentContext = {};
	  }

	  if (options === void 0) {
	    options = {};
	  }

	  if (parentEffectId === void 0) {
	    parentEffectId = 0;
	  }

	  var _options = options,
	      sagaMonitor = _options.sagaMonitor,
	      logger = _options.logger,
	      onError = _options.onError,
	      middleware = _options.middleware;
	  var log = logger || utils.log;

	  var logError = function logError(err) {
	    log('error', err);

	    if (err.sagaStack) {
	      log('error', err.sagaStack);
	    }
	  };

	  var taskContext = Object.create(parentContext);
	  var crashedEffect = null;
	  var cancelledDueToErrorTasks = [];
	  /**
	    Tracks the current effect cancellation
	    Each time the generator progresses. calling runEffect will set a new value
	    on it. It allows propagating cancellation to child effects
	  **/

	  next.cancel = utils.noop;
	  /**
	    Creates a new task descriptor for this generator, We'll also create a main task
	    to track the main flow (besides other forked tasks)
	  **/

	  var task = newTask(parentEffectId, meta, iterator, cont);
	  var mainTask = {
	    meta: meta,
	    cancel: cancelMain,
	    isRunning: true
	  };
	  var taskQueue = forkQueue(mainTask, function onAbort() {
	    cancelledDueToErrorTasks.push.apply(cancelledDueToErrorTasks, taskQueue.getTaskNames());
	  }, end);
	  /**
	    cancellation of the main task. We'll simply resume the Generator with a Cancel
	  **/

	  function cancelMain() {
	    if (mainTask.isRunning && !mainTask.isCancelled) {
	      mainTask.isCancelled = true;
	      next(TASK_CANCEL);
	    }
	  }
	  /**
	    This may be called by a parent generator to trigger/propagate cancellation
	    cancel all pending tasks (including the main task), then end the current task.
	     Cancellation propagates down to the whole execution tree holded by this Parent task
	    It's also propagated to all joiners of this task and their execution tree/joiners
	     Cancellation is noop for terminated/Cancelled tasks tasks
	  **/


	  function cancel() {
	    /**
	      We need to check both Running and Cancelled status
	      Tasks can be Cancelled but still Running
	    **/
	    if (iterator._isRunning && !iterator._isCancelled) {
	      iterator._isCancelled = true;
	      taskQueue.cancelAll();
	      /**
	        Ending with a Never result will propagate the Cancellation to all joiners
	      **/

	      end(TASK_CANCEL);
	    }
	  }
	  /**
	    attaches cancellation logic to this task's continuation
	    this will permit cancellation to propagate down the call chain
	  **/


	  cont && (cont.cancel = cancel); // tracks the running status

	  iterator._isRunning = true; // kicks up the generator

	  next(); // then return the task descriptor to the caller

	  return task;
	  /**
	    This is the generator driver
	    It's a recursive async/continuation function which calls itself
	    until the generator terminates or throws
	  **/

	  function next(arg, isErr) {
	    // Preventive measure. If we end up here, then there is really something wrong
	    if (!mainTask.isRunning) {
	      throw new Error('Trying to resume an already finished generator');
	    }

	    try {
	      var result;

	      if (isErr) {
	        result = iterator.throw(arg);
	      } else if (arg === TASK_CANCEL) {
	        /**
	          getting TASK_CANCEL automatically cancels the main task
	          We can get this value here
	           - By cancelling the parent task manually
	          - By joining a Cancelled task
	        **/
	        mainTask.isCancelled = true;
	        /**
	          Cancels the current effect; this will propagate the cancellation down to any called tasks
	        **/

	        next.cancel();
	        /**
	          If this Generator has a `return` method then invokes it
	          This will jump to the finally block
	        **/

	        result = utils.is.func(iterator.return) ? iterator.return(TASK_CANCEL) : {
	          done: true,
	          value: TASK_CANCEL
	        };
	      } else if (arg === CHANNEL_END) {
	        // We get CHANNEL_END by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
	        result = utils.is.func(iterator.return) ? iterator.return() : {
	          done: true
	        };
	      } else {
	        result = iterator.next(arg);
	      }

	      if (!result.done) {
	        digestEffect(result.value, parentEffectId, '', next);
	      } else {
	        /**
	          This Generator has ended, terminate the main task and notify the fork queue
	        **/
	        mainTask.isMainRunning = false;
	        mainTask.cont && mainTask.cont(result.value);
	      }
	    } catch (error) {
	      if (mainTask.isCancelled) {
	        logError(error);
	      }

	      mainTask.isMainRunning = false;
	      mainTask.cont(error, true);
	    }
	  }

	  function end(result, isErr) {
	    iterator._isRunning = false; // stdChannel.close()

	    if (!isErr) {
	      iterator._result = result;
	      iterator._deferredEnd && iterator._deferredEnd.resolve(result);
	    } else {
	      (0, errorUtils.addSagaStack)(result, {
	        meta: meta,
	        effect: crashedEffect,
	        cancelledTasks: cancelledDueToErrorTasks
	      });

	      if (!task.cont) {
	        if (result.sagaStack) {
	          result.sagaStack = (0, errorUtils.sagaStackToString)(result.sagaStack);
	        }

	        if (result instanceof Error && onError) {
	          onError(result);
	        } else {
	          // TODO: could we skip this when _deferredEnd is attached?
	          logError(result);
	        }
	      }

	      iterator._error = result;
	      iterator._isAborted = true;
	      iterator._deferredEnd && iterator._deferredEnd.reject(result);
	    }

	    task.cont && task.cont(result, isErr);
	    task.joiners.forEach(function (j) {
	      return j.cb(result, isErr);
	    });
	    task.joiners = null;
	  }

	  function runEffect(effect, effectId, currCb) {
	    /**
	      each effect runner must attach its own logic of cancellation to the provided callback
	      it allows this generator to propagate cancellation downward.
	       ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
	      And the setup must occur before calling the callback
	       This is a sort of inversion of control: called async functions are responsible
	      of completing the flow by calling the provided continuation; while caller functions
	      are responsible for aborting the current flow by calling the attached cancel function
	       Library users can attach their own cancellation logic to promises by defining a
	      promise[CANCEL] method in their returned promises
	      ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
	    **/
	    var data; // prettier-ignore

	    return (// Non declarative effect
	      utils.is.promise(effect) ? resolvePromise(effect, currCb) : utils.is.iterator(effect) ? resolveIterator(effect, effectId, meta, currCb) // declarative effects
	      : (data = io.asEffect.take(effect)) ? runTakeEffect(data, currCb) : (data = io.asEffect.put(effect)) ? runPutEffect(data, currCb) : (data = io.asEffect.all(effect)) ? runAllEffect(data, effectId, currCb) : (data = io.asEffect.race(effect)) ? runRaceEffect(data, effectId, currCb) : (data = io.asEffect.call(effect)) ? runCallEffect(data, effectId, currCb) : (data = io.asEffect.cps(effect)) ? runCPSEffect(data, currCb) : (data = io.asEffect.fork(effect)) ? runForkEffect(data, effectId, currCb) : (data = io.asEffect.join(effect)) ? runJoinEffect(data, currCb) : (data = io.asEffect.cancel(effect)) ? runCancelEffect(data, currCb) : (data = io.asEffect.select(effect)) ? runSelectEffect(data, currCb) : (data = io.asEffect.actionChannel(effect)) ? runChannelEffect(data, currCb) : (data = io.asEffect.flush(effect)) ? runFlushEffect(data, currCb) : (data = io.asEffect.cancelled(effect)) ? runCancelledEffect(data, currCb) : (data = io.asEffect.getContext(effect)) ? runGetContextEffect(data, currCb) : (data = io.asEffect.setContext(effect)) ? runSetContextEffect(data, currCb) :
	      /* anything else returned as is */
	      currCb(effect)
	    );
	  }

	  function digestEffect(effect, parentEffectId, label, cb) {
	    if (label === void 0) {
	      label = '';
	    }

	    var effectId = (0, utils.uid)();
	    sagaMonitor && sagaMonitor.effectTriggered({
	      effectId: effectId,
	      parentEffectId: parentEffectId,
	      label: label,
	      effect: effect
	    });
	    /**
	      completion callback and cancel callback are mutually exclusive
	      We can't cancel an already completed effect
	      And We can't complete an already cancelled effectId
	    **/

	    var effectSettled; // Completion callback passed to the appropriate effect runner

	    function currCb(res, isErr) {
	      if (effectSettled) {
	        return;
	      }

	      effectSettled = true;
	      cb.cancel = utils.noop; // defensive measure

	      if (sagaMonitor) {
	        isErr ? sagaMonitor.effectRejected(effectId, res) : sagaMonitor.effectResolved(effectId, res);
	      }

	      if (isErr) {
	        crashedEffect = effect;
	      }

	      cb(res, isErr);
	    } // tracks down the current cancel


	    currCb.cancel = utils.noop; // setup cancellation logic on the parent cb

	    cb.cancel = function () {
	      // prevents cancelling an already completed effect
	      if (effectSettled) {
	        return;
	      }

	      effectSettled = true;
	      /**
	        propagates cancel downward
	        catch uncaught cancellations errors; since we can no longer call the completion
	        callback, log errors raised during cancellations into the console
	      **/

	      try {
	        currCb.cancel();
	      } catch (err) {
	        logError(err);
	      }

	      currCb.cancel = utils.noop; // defensive measure

	      sagaMonitor && sagaMonitor.effectCancelled(effectId);
	    }; // if one can find a way to decouple runEffect from closure variables
	    // so it could be the call to it could be referentially transparent
	    // this potentially could be simplified, finalRunEffect created beforehand
	    // and this part of the code wouldnt have to know about middleware stuff


	    if (utils.is.func(middleware)) {
	      middleware(function (eff) {
	        return runEffect(eff, effectId, currCb);
	      })(effect);
	      return;
	    }

	    runEffect(effect, effectId, currCb);
	  }

	  function resolvePromise(promise, cb) {
	    var cancelPromise = promise[symbols.CANCEL];

	    if (utils.is.func(cancelPromise)) {
	      cb.cancel = cancelPromise;
	    } else if (utils.is.func(promise.abort)) {
	      cb.cancel = function () {
	        return promise.abort();
	      };
	    }

	    promise.then(cb, function (error) {
	      return cb(error, true);
	    });
	  }

	  function resolveIterator(iterator, effectId, meta, cb) {
	    proc(iterator, stdChannel, dispatch, getState, taskContext, options, effectId, meta, cb);
	  }

	  function runTakeEffect(_ref2, cb) {
	    var _ref2$channel = _ref2.channel,
	        channel = _ref2$channel === void 0 ? stdChannel : _ref2$channel,
	        pattern = _ref2.pattern,
	        maybe = _ref2.maybe;

	    var takeCb = function takeCb(input) {
	      if (input instanceof Error) {
	        cb(input, true);
	        return;
	      }

	      if ((0, channel_1.isEnd)(input) && !maybe) {
	        cb(CHANNEL_END);
	        return;
	      }

	      cb(input);
	    };

	    try {
	      channel.take(takeCb, utils.is.notUndef(pattern) ? (0, _matcher.default)(pattern) : null);
	    } catch (err) {
	      cb(err, true);
	      return;
	    }

	    cb.cancel = takeCb.cancel;
	  }

	  function runPutEffect(_ref3, cb) {
	    var channel = _ref3.channel,
	        action = _ref3.action,
	        resolve = _ref3.resolve;

	    /**
	      Schedule the put in case another saga is holding a lock.
	      The put will be executed atomically. ie nested puts will execute after
	      this put has terminated.
	    **/
	    (0, scheduler.asap)(function () {
	      var result;

	      try {
	        result = (channel ? channel.put : dispatch)(action);
	      } catch (error) {
	        cb(error, true);
	        return;
	      }

	      if (resolve && utils.is.promise(result)) {
	        resolvePromise(result, cb);
	      } else {
	        cb(result);
	        return;
	      }
	    }); // Put effects are non cancellables
	  }

	  function runCallEffect(_ref4, effectId, cb) {
	    var context = _ref4.context,
	        fn = _ref4.fn,
	        args = _ref4.args;
	    var result; // catch synchronous failures; see #152

	    try {
	      result = fn.apply(context, args);
	    } catch (error) {
	      cb(error, true);
	      return;
	    }

	    return utils.is.promise(result) ? resolvePromise(result, cb) : utils.is.iterator(result) ? resolveIterator(result, effectId, getMetaInfo(fn), cb) : cb(result);
	  }

	  function runCPSEffect(_ref5, cb) {
	    var context = _ref5.context,
	        fn = _ref5.fn,
	        args = _ref5.args;

	    // CPS (ie node style functions) can define their own cancellation logic
	    // by setting cancel field on the cb
	    // catch synchronous failures; see #152
	    try {
	      var cpsCb = function cpsCb(err, res) {
	        return utils.is.undef(err) ? cb(res) : cb(err, true);
	      };

	      fn.apply(context, args.concat(cpsCb));

	      if (cpsCb.cancel) {
	        cb.cancel = function () {
	          return cpsCb.cancel();
	        };
	      }
	    } catch (error) {
	      cb(error, true);
	      return;
	    }
	  }

	  function runForkEffect(_ref6, effectId, cb) {
	    var context = _ref6.context,
	        fn = _ref6.fn,
	        args = _ref6.args,
	        detached = _ref6.detached;
	    var taskIterator = createTaskIterator({
	      context: context,
	      fn: fn,
	      args: args
	    });
	    var meta = getIteratorMetaInfo(taskIterator, fn);

	    try {
	      (0, scheduler.suspend)();

	      var _task = proc(taskIterator, stdChannel, dispatch, getState, taskContext, options, effectId, meta, detached ? null : utils.noop);

	      if (detached) {
	        cb(_task);
	      } else {
	        if (taskIterator._isRunning) {
	          taskQueue.addTask(_task);
	          cb(_task);
	        } else if (taskIterator._error) {
	          taskQueue.abort(taskIterator._error);
	        } else {
	          cb(_task);
	        }
	      }
	    } finally {
	      (0, scheduler.flush)();
	    } // Fork effects are non cancellables

	  }

	  function runJoinEffect(t, cb) {
	    if (t.isRunning()) {
	      var joiner = {
	        task: task,
	        cb: cb
	      };

	      cb.cancel = function () {
	        return (0, utils.remove)(t.joiners, joiner);
	      };

	      t.joiners.push(joiner);
	    } else {
	      t.isAborted() ? cb(t.error(), true) : cb(t.result());
	    }
	  }

	  function runCancelEffect(taskToCancel, cb) {
	    if (taskToCancel === symbols.SELF_CANCELLATION) {
	      taskToCancel = task;
	    }

	    if (taskToCancel.isRunning()) {
	      taskToCancel.cancel();
	    }

	    cb(); // cancel effects are non cancellables
	  }

	  function runAllEffect(effects, effectId, cb) {
	    var keys = Object.keys(effects);

	    if (!keys.length) {
	      cb(utils.is.array(effects) ? [] : {});
	      return;
	    }

	    var completedCount = 0;
	    var completed;
	    var results = {};
	    var childCbs = {};

	    function checkEffectEnd() {
	      if (completedCount === keys.length) {
	        completed = true;
	        cb(utils.is.array(effects) ? utils.array.from(_extends({}, results, {
	          length: keys.length
	        })) : results);
	      }
	    }

	    keys.forEach(function (key) {
	      var chCbAtKey = function chCbAtKey(res, isErr) {
	        if (completed) {
	          return;
	        }

	        if (isErr || (0, channel_1.isEnd)(res) || res === CHANNEL_END || res === TASK_CANCEL) {
	          cb.cancel();
	          cb(res, isErr);
	        } else {
	          results[key] = res;
	          completedCount++;
	          checkEffectEnd();
	        }
	      };

	      chCbAtKey.cancel = utils.noop;
	      childCbs[key] = chCbAtKey;
	    });

	    cb.cancel = function () {
	      if (!completed) {
	        completed = true;
	        keys.forEach(function (key) {
	          return childCbs[key].cancel();
	        });
	      }
	    };

	    keys.forEach(function (key) {
	      return digestEffect(effects[key], effectId, key, childCbs[key]);
	    });
	  }

	  function runRaceEffect(effects, effectId, cb) {
	    var completed;
	    var keys = Object.keys(effects);
	    var childCbs = {};
	    keys.forEach(function (key) {
	      var chCbAtKey = function chCbAtKey(res, isErr) {
	        if (completed) {
	          return;
	        }

	        if (isErr) {
	          // Race Auto cancellation
	          cb.cancel();
	          cb(res, true);
	        } else if (!(0, channel_1.isEnd)(res) && res !== CHANNEL_END && res !== TASK_CANCEL) {
	          var _response;

	          cb.cancel();
	          completed = true;
	          var response = (_response = {}, _response[key] = res, _response);
	          cb(utils.is.array(effects) ? [].slice.call(_extends({}, response, {
	            length: keys.length
	          })) : response);
	        }
	      };

	      chCbAtKey.cancel = utils.noop;
	      childCbs[key] = chCbAtKey;
	    });

	    cb.cancel = function () {
	      // prevents unnecessary cancellation
	      if (!completed) {
	        completed = true;
	        keys.forEach(function (key) {
	          return childCbs[key].cancel();
	        });
	      }
	    };

	    keys.forEach(function (key) {
	      if (completed) {
	        return;
	      }

	      digestEffect(effects[key], effectId, key, childCbs[key]);
	    });
	  }

	  function runSelectEffect(_ref7, cb) {
	    var selector = _ref7.selector,
	        args = _ref7.args;

	    try {
	      var state = selector.apply(void 0, [getState()].concat(args));
	      cb(state);
	    } catch (error) {
	      cb(error, true);
	    }
	  }

	  function runChannelEffect(_ref8, cb) {
	    var pattern = _ref8.pattern,
	        buffer = _ref8.buffer;
	    // TODO: rethink how END is handled
	    var chan = (0, channel_1.channel)(buffer);
	    var match = (0, _matcher.default)(pattern);

	    var taker = function taker(action) {
	      if (!(0, channel_1.isEnd)(action)) {
	        stdChannel.take(taker, match);
	      }

	      chan.put(action);
	    };

	    stdChannel.take(taker, match);
	    cb(chan);
	  }

	  function runCancelledEffect(data, cb) {
	    cb(!!mainTask.isCancelled);
	  }

	  function runFlushEffect(channel, cb) {
	    channel.flush(cb);
	  }

	  function runGetContextEffect(prop, cb) {
	    cb(taskContext[prop]);
	  }

	  function runSetContextEffect(props, cb) {
	    utils.object.assign(taskContext, props);

	    cb();
	  }

	  function newTask(id, meta, iterator, cont) {
	    var _ref9;

	    iterator._deferredEnd = null;
	    return _ref9 = {}, _ref9[symbols.TASK] = true, _ref9.id = id, _ref9.meta = meta, _ref9.toPromise = function toPromise() {
	      if (iterator._deferredEnd) {
	        return iterator._deferredEnd.promise;
	      }

	      var def = (0, utils.deferred)();
	      iterator._deferredEnd = def;

	      if (!iterator._isRunning) {
	        if (iterator._isAborted) {
	          def.reject(iterator._error);
	        } else {
	          def.resolve(iterator._result);
	        }
	      }

	      return def.promise;
	    }, _ref9.cont = cont, _ref9.joiners = [], _ref9.cancel = cancel, _ref9.isRunning = function isRunning() {
	      return iterator._isRunning;
	    }, _ref9.isCancelled = function isCancelled() {
	      return iterator._isCancelled;
	    }, _ref9.isAborted = function isAborted() {
	      return iterator._isAborted;
	    }, _ref9.result = function result() {
	      return iterator._result;
	    }, _ref9.error = function error() {
	      return iterator._error;
	    }, _ref9.setContext = function setContext(props) {
	      if (process.env.NODE_ENV === 'development') {
	        (0, utils.check)(props, utils.is.object, (0, utils.createSetContextWarning)('task', props));
	      }

	      utils.object.assign(taskContext, props);
	    }, _ref9;
	  }
	}
	});

	unwrapExports(proc_1);
	var proc_2 = proc_1.getMetaInfo;
	var proc_3 = proc_1.TASK_CANCEL;
	var proc_4 = proc_1.CHANNEL_END;

	var runSaga_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.runSaga = runSaga;





	var _proc =
	/*#__PURE__*/
	_interopRequireWildcard(
	/*#__PURE__*/
	proc_1);



	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	var RUN_SAGA_SIGNATURE = 'runSaga(options, saga, ...args)';
	var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ": saga argument must be a Generator function!";

	function runSaga(options, saga) {
	  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  if (process.env.NODE_ENV === 'development') {
	    (0, utils.check)(saga, utils.is.func, NON_GENERATOR_ERR);
	  }

	  var iterator = saga.apply(void 0, args);

	  if (process.env.NODE_ENV === 'development') {
	    (0, utils.check)(iterator, utils.is.iterator, NON_GENERATOR_ERR);
	  }

	  var _options$channel = options.channel,
	      channel = _options$channel === void 0 ? (0, channel_1.stdChannel)() : _options$channel,
	      dispatch = options.dispatch,
	      getState = options.getState,
	      context = options.context,
	      sagaMonitor = options.sagaMonitor,
	      logger = options.logger,
	      effectMiddlewares = options.effectMiddlewares,
	      onError = options.onError;
	  var effectId = (0, utils.uid)();

	  if (sagaMonitor) {
	    // monitors are expected to have a certain interface, let's fill-in any missing ones
	    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || utils.noop;
	    sagaMonitor.effectResolved = sagaMonitor.effectResolved || utils.noop;
	    sagaMonitor.effectRejected = sagaMonitor.effectRejected || utils.noop;
	    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || utils.noop;
	    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || utils.noop;
	    sagaMonitor.effectTriggered({
	      effectId: effectId,
	      root: true,
	      parentEffectId: 0,
	      effect: {
	        root: true,
	        saga: saga,
	        args: args
	      }
	    });
	  }

	  if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && utils.is.notUndef(effectMiddlewares)) {
	    var MIDDLEWARE_TYPE_ERROR = 'effectMiddlewares must be an array of functions';
	    (0, utils.check)(effectMiddlewares, utils.is.array, MIDDLEWARE_TYPE_ERROR);
	    effectMiddlewares.forEach(function (effectMiddleware) {
	      return (0, utils.check)(effectMiddleware, utils.is.func, MIDDLEWARE_TYPE_ERROR);
	    });
	  }

	  var middleware = effectMiddlewares && redux__default.compose.apply(void 0, effectMiddlewares);

	  var task = (0, _proc.default)(iterator, channel, (0, utils.wrapSagaDispatch)(dispatch), getState, context, {
	    sagaMonitor: sagaMonitor,
	    logger: logger,
	    onError: onError,
	    middleware: middleware
	  }, effectId, (0, _proc.getMetaInfo)(saga));

	  if (sagaMonitor) {
	    sagaMonitor.effectResolved(effectId, task);
	  }

	  return task;
	}
	});

	unwrapExports(runSaga_1);
	var runSaga_2 = runSaga_1.runSaga;

	var middleware = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = sagaMiddlewareFactory;







	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

	function sagaMiddlewareFactory(_ref) {
	  if (_ref === void 0) {
	    _ref = {};
	  }

	  var _ref2 = _ref,
	      _ref2$context = _ref2.context,
	      context = _ref2$context === void 0 ? {} : _ref2$context,
	      options = _objectWithoutProperties(_ref2, ["context"]);

	  var sagaMonitor = options.sagaMonitor,
	      logger = options.logger,
	      onError = options.onError,
	      effectMiddlewares = options.effectMiddlewares;

	  if (process.env.NODE_ENV === 'development') {
	    if (utils.is.notUndef(logger)) {
	      (0, utils.check)(logger, utils.is.func, 'options.logger passed to the Saga middleware is not a function!');
	    }

	    if (utils.is.notUndef(onError)) {
	      (0, utils.check)(onError, utils.is.func, 'options.onError passed to the Saga middleware is not a function!');
	    }

	    if (utils.is.notUndef(options.emitter)) {
	      (0, utils.check)(options.emitter, utils.is.func, 'options.emitter passed to the Saga middleware is not a function!');
	    }
	  }

	  function sagaMiddleware(_ref3) {
	    var getState = _ref3.getState,
	        dispatch = _ref3.dispatch;
	    var channel = (0, channel_1.stdChannel)();
	    channel.put = (options.emitter || utils.identity)(channel.put);
	    sagaMiddleware.run = runSaga_1.runSaga.bind(null, {
	      context: context,
	      channel: channel,
	      dispatch: dispatch,
	      getState: getState,
	      sagaMonitor: sagaMonitor,
	      logger: logger,
	      onError: onError,
	      effectMiddlewares: effectMiddlewares
	    });
	    return function (next) {
	      return function (action) {
	        if (sagaMonitor && sagaMonitor.actionDispatched) {
	          sagaMonitor.actionDispatched(action);
	        }

	        var result = next(action); // hit reducers

	        channel.put(action);
	        return result;
	      };
	    };
	  }

	  sagaMiddleware.run = function () {
	    throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
	  };

	  sagaMiddleware.setContext = function (props) {
	    if (process.env.NODE_ENV === 'development') {
	      (0, utils.check)(props, utils.is.object, (0, utils.createSetContextWarning)('sagaMiddleware', props));
	    }

	    utils.object.assign(context, props);
	  };

	  return sagaMiddleware;
	}
	});

	var createSagaMiddleware = unwrapExports(middleware);

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

	var win;

	if (typeof window !== "undefined") {
	    win = window;
	} else if (typeof commonjsGlobal !== "undefined") {
	    win = commonjsGlobal;
	} else if (typeof self !== "undefined"){
	    win = self;
	} else {
	    win = {};
	}

	var window_1 = win;

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
	    window_1.__REDUX_DEVTOOLS_EXTENSION__
	  ) {
	    devtools = window_1.__REDUX_DEVTOOLS_EXTENSION__;
	  }

	  const enhancers = [
	    redux.applyMiddleware(...middlewares),
	    ...extraEnhancers,
	    devtools(window_1.__REDUX_DEVTOOLS_EXTENSION__OPTIONS),
	  ];

	  return redux.createStore(reducers, initialState, redux.compose(...enhancers));
	}

	var createName = function createName(name) {
	  return "@@redux-saga/" + name;
	};

	var createSymbol = function createSymbol(id) {
	  id = createName(id);
	  return typeof Symbol === 'function' ? Symbol(id) : id;
	};

	var CANCEL =
	/*#__PURE__*/
	createSymbol('CANCEL_PROMISE');
	var CHANNEL_END =
	/*#__PURE__*/
	createSymbol('CHANNEL_END');
	var CHANNEL_END_TYPE =
	/*#__PURE__*/
	createSymbol('CHANNEL_END');
	var IO =
	/*#__PURE__*/
	createSymbol('IO');
	var MATCH =
	/*#__PURE__*/
	createSymbol('MATCH');
	var MULTICAST =
	/*#__PURE__*/
	createSymbol('MULTICAST');
	var SAGA_ACTION =
	/*#__PURE__*/
	createSymbol('SAGA_ACTION');
	var SELF_CANCELLATION =
	/*#__PURE__*/
	createSymbol('SELF_CANCELLATION');
	var TASK =
	/*#__PURE__*/
	createSymbol('TASK');
	var TASK_CANCEL =
	/*#__PURE__*/
	createSymbol('TASK_CANCEL');

	var identity = function identity(v) {
	  return v;
	};
	function check(value, predicate, error) {
	  if (!predicate(value)) {
	    throw new Error(error);
	  }
	}
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn(object, property) {
	  return is.notUndef(object) && hasOwnProperty.call(object, property);
	}
	var is = {
	  undef: function undef(v) {
	    return v === null || v === undefined;
	  },
	  notUndef: function notUndef(v) {
	    return v !== null && v !== undefined;
	  },
	  func: function func(f) {
	    return typeof f === 'function';
	  },
	  number: function number(n) {
	    return typeof n === 'number';
	  },
	  string: function string(s) {
	    return typeof s === 'string';
	  },
	  array: Array.isArray,
	  object: function object(obj) {
	    return obj && !is.array(obj) && typeof obj === 'object';
	  },
	  promise: function promise(p) {
	    return p && is.func(p.then);
	  },
	  iterator: function iterator(it) {
	    return it && is.func(it.next) && is.func(it.throw);
	  },
	  iterable: function iterable(it) {
	    return it && is.func(Symbol) ? is.func(it[Symbol.iterator]) : is.array(it);
	  },
	  task: function task(t) {
	    return t && t[TASK];
	  },
	  observable: function observable(ob) {
	    return ob && is.func(ob.subscribe);
	  },
	  buffer: function buffer(buf) {
	    return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
	  },
	  pattern: function pattern(pat) {
	    return pat && (is.string(pat) || is.symbol(pat) || is.func(pat) || is.array(pat));
	  },
	  channel: function channel(ch) {
	    return ch && is.func(ch.take) && is.func(ch.close);
	  },
	  stringableFunc: function stringableFunc(f) {
	    return is.func(f) && hasOwn(f, 'toString');
	  },
	  symbol: function symbol(sym) {
	    return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
	  },
	  multicast: function multicast(ch) {
	    return is.channel(ch) && ch[MULTICAST];
	  }
	};
	function delay(ms, val) {
	  if (val === void 0) {
	    val = true;
	  }

	  var timeoutId;
	  var promise = new Promise(function (resolve) {
	    timeoutId = setTimeout(function () {
	      return resolve(val);
	    }, ms);
	  });

	  promise[CANCEL] = function () {
	    return clearTimeout(timeoutId);
	  };

	  return promise;
	}

	var kThrow = function kThrow(err) {
	  throw err;
	};

	var kReturn = function kReturn(value) {
	  return {
	    value: value,
	    done: true
	  };
	};

	function makeIterator(next, thro, name) {
	  if (thro === void 0) {
	    thro = kThrow;
	  }

	  if (name === void 0) {
	    name = 'iterator';
	  }

	  var iterator = {
	    meta: {
	      name: name
	    },
	    next: next,
	    throw: thro,
	    return: kReturn,
	    isSagaIterator: true
	  };

	  if (typeof Symbol !== 'undefined') {
	    iterator[Symbol.iterator] = function () {
	      return iterator;
	    };
	  }

	  return iterator;
	}
	var createSetContextWarning = function createSetContextWarning(ctx, props) {
	  return (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
	};

	var done = {
	  done: true,
	  value: undefined
	};
	var qEnd = {};
	function safeName(patternOrChannel) {
	  if (is.channel(patternOrChannel)) {
	    return 'channel';
	  }

	  if (is.stringableFunc(patternOrChannel)) {
	    return String(patternOrChannel);
	  }

	  if (is.func(patternOrChannel)) {
	    return patternOrChannel.name;
	  }

	  return String(patternOrChannel);
	}
	function fsmIterator$1(fsm, q0, name) {
	  var updateState,
	      qNext = q0;

	  function next(arg, error) {
	    if (qNext === qEnd) {
	      return done;
	    }

	    if (error) {
	      qNext = qEnd;
	      throw error;
	    } else {
	      updateState && updateState(arg);

	      var _fsm$qNext = fsm[qNext](),
	          q = _fsm$qNext[0],
	          output = _fsm$qNext[1],
	          _updateState = _fsm$qNext[2];

	      qNext = q;
	      updateState = _updateState;
	      return qNext === qEnd ? done : output;
	    }
	  }

	  return makeIterator(next, function (error) {
	    return next(null, error);
	  }, name);
	}

	var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
	var ON_OVERFLOW_THROW = 1;
	var ON_OVERFLOW_SLIDE = 3;
	var ON_OVERFLOW_EXPAND = 4;

	function ringBuffer(limit, overflowAction) {
	  if (limit === void 0) {
	    limit = 10;
	  }

	  var arr = new Array(limit);
	  var length = 0;
	  var pushIndex = 0;
	  var popIndex = 0;

	  var push = function push(it) {
	    arr[pushIndex] = it;
	    pushIndex = (pushIndex + 1) % limit;
	    length++;
	  };

	  var take = function take() {
	    if (length != 0) {
	      var it = arr[popIndex];
	      arr[popIndex] = null;
	      length--;
	      popIndex = (popIndex + 1) % limit;
	      return it;
	    }
	  };

	  var flush = function flush() {
	    var items = [];

	    while (length) {
	      items.push(take());
	    }

	    return items;
	  };

	  return {
	    isEmpty: function isEmpty() {
	      return length == 0;
	    },
	    put: function put(it) {
	      if (length < limit) {
	        push(it);
	      } else {
	        var doubledLimit;

	        switch (overflowAction) {
	          case ON_OVERFLOW_THROW:
	            throw new Error(BUFFER_OVERFLOW);

	          case ON_OVERFLOW_SLIDE:
	            arr[pushIndex] = it;
	            pushIndex = (pushIndex + 1) % limit;
	            popIndex = pushIndex;
	            break;

	          case ON_OVERFLOW_EXPAND:
	            doubledLimit = 2 * limit;
	            arr = flush();
	            length = arr.length;
	            pushIndex = arr.length;
	            popIndex = 0;
	            arr.length = doubledLimit;
	            limit = doubledLimit;
	            push(it);
	            break;

	          default: // DROP

	        }
	      }
	    },
	    take: take,
	    flush: flush
	  };
	}
	var sliding = function sliding(limit) {
	  return ringBuffer(limit, ON_OVERFLOW_SLIDE);
	};

	var END = {
	  type: CHANNEL_END_TYPE
	};

	function takeEvery$1(patternOrChannel, worker) {
	  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  var yTake = {
	    done: false,
	    value: take(patternOrChannel)
	  };

	  var yFork = function yFork(ac) {
	    return {
	      done: false,
	      value: fork.apply(void 0, [worker].concat(args, [ac]))
	    };
	  };

	  var action,
	      setAction = function setAction(ac) {
	    return action = ac;
	  };

	  return fsmIterator$1({
	    q1: function q1() {
	      return ['q2', yTake, setAction];
	    },
	    q2: function q2() {
	      return action === END ? [qEnd] : ['q1', yFork(action)];
	    }
	  }, 'q1', "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
	}

	function takeLatest$1(patternOrChannel, worker) {
	  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  var yTake = {
	    done: false,
	    value: take(patternOrChannel)
	  };

	  var yFork = function yFork(ac) {
	    return {
	      done: false,
	      value: fork.apply(void 0, [worker].concat(args, [ac]))
	    };
	  };

	  var yCancel = function yCancel(task) {
	    return {
	      done: false,
	      value: cancel(task)
	    };
	  };

	  var task, action;

	  var setTask = function setTask(t) {
	    return task = t;
	  };

	  var setAction = function setAction(ac) {
	    return action = ac;
	  };

	  return fsmIterator$1({
	    q1: function q1() {
	      return ['q2', yTake, setAction];
	    },
	    q2: function q2() {
	      return action === END ? [qEnd] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
	    },
	    q3: function q3() {
	      return ['q1', yFork(action), setTask];
	    }
	  }, 'q1', "takeLatest(" + safeName(patternOrChannel) + ", " + worker.name + ")");
	}

	function takeLeading$1(patternOrChannel, worker) {
	  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  var yTake = {
	    done: false,
	    value: take(patternOrChannel)
	  };

	  var yCall = function yCall(ac) {
	    return {
	      done: false,
	      value: call.apply(void 0, [worker].concat(args, [ac]))
	    };
	  };

	  var action;

	  var setAction = function setAction(ac) {
	    return action = ac;
	  };

	  return fsmIterator$1({
	    q1: function q1() {
	      return ['q2', yTake, setAction];
	    },
	    q2: function q2() {
	      return action === END ? [qEnd] : ['q1', yCall(action)];
	    }
	  }, 'q1', "takeLeading(" + safeName(patternOrChannel) + ", " + worker.name + ")");
	}

	function throttle$1(delayLength, pattern, worker) {
	  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	    args[_key - 3] = arguments[_key];
	  }

	  var action, channel;
	  var yActionChannel = {
	    done: false,
	    value: actionChannel(pattern, sliding(1))
	  };

	  var yTake = function yTake() {
	    return {
	      done: false,
	      value: take(channel)
	    };
	  };

	  var yFork = function yFork(ac) {
	    return {
	      done: false,
	      value: fork.apply(void 0, [worker].concat(args, [ac]))
	    };
	  };

	  var yDelay = {
	    done: false,
	    value: delay$1(delayLength)
	  };

	  var setAction = function setAction(ac) {
	    return action = ac;
	  };

	  var setChannel = function setChannel(ch) {
	    return channel = ch;
	  };

	  return fsmIterator$1({
	    q1: function q1() {
	      return ['q2', yActionChannel, setChannel];
	    },
	    q2: function q2() {
	      return ['q3', yTake(), setAction];
	    },
	    q3: function q3() {
	      return action === END ? [qEnd] : ['q4', yFork(action)];
	    },
	    q4: function q4() {
	      return ['q2', yDelay];
	    }
	  }, 'q1', "throttle(" + safeName(pattern) + ", " + worker.name + ")");
	}

	var TAKE = 'TAKE';
	var PUT = 'PUT';
	var ALL = 'ALL';
	var RACE = 'RACE';
	var CALL = 'CALL';
	var CPS = 'CPS';
	var FORK = 'FORK';
	var JOIN = 'JOIN';
	var CANCEL$1 = 'CANCEL';
	var SELECT = 'SELECT';
	var ACTION_CHANNEL = 'ACTION_CHANNEL';
	var CANCELLED = 'CANCELLED';
	var FLUSH = 'FLUSH';
	var GET_CONTEXT = 'GET_CONTEXT';
	var SET_CONTEXT = 'SET_CONTEXT';
	var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

	var effect = function effect(type, payload) {
	  var _ref;

	  return _ref = {}, _ref[IO] = true, _ref[type] = payload, _ref;
	};

	var detach = function detach(eff) {
	  if (process.env.NODE_ENV === 'development') {
	    check(asEffect.fork(eff), is.object, 'detach(eff): argument must be a fork effect');
	  }

	  eff[FORK].detached = true;
	  return eff;
	};
	function take(patternOrChannel, multicastPattern) {
	  if (patternOrChannel === void 0) {
	    patternOrChannel = '*';
	  }

	  if (process.env.NODE_ENV === 'development' && arguments.length) {
	    check(arguments[0], is.notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
	  }

	  if (is.pattern(patternOrChannel)) {
	    return effect(TAKE, {
	      pattern: patternOrChannel
	    });
	  }

	  if (is.multicast(patternOrChannel) && is.notUndef(multicastPattern) && is.pattern(multicastPattern)) {
	    return effect(TAKE, {
	      channel: patternOrChannel,
	      pattern: multicastPattern
	    });
	  }

	  if (is.channel(patternOrChannel)) {
	    return effect(TAKE, {
	      channel: patternOrChannel
	    });
	  }

	  throw new Error("take(patternOrChannel): argument " + patternOrChannel + " is not valid channel or a valid pattern");
	}

	var takeMaybe = function takeMaybe() {
	  var eff = take.apply(void 0, arguments);
	  eff[TAKE].maybe = true;
	  return eff;
	};
	function put(channel, action) {
	  if (process.env.NODE_ENV === 'development') {
	    if (arguments.length > 1) {
	      check(channel, is.notUndef, 'put(channel, action): argument channel is undefined');
	      check(channel, is.channel, "put(channel, action): argument " + channel + " is not a valid channel");
	      check(action, is.notUndef, 'put(channel, action): argument action is undefined');
	    } else {
	      check(channel, is.notUndef, 'put(action): argument action is undefined');
	    }
	  }

	  if (is.undef(action)) {
	    action = channel;
	    channel = null;
	  }

	  return effect(PUT, {
	    channel: channel,
	    action: action
	  });
	}

	var putResolve = function putResolve() {
	  var eff = put.apply(void 0, arguments);
	  eff[PUT].resolve = true;
	  return eff;
	};
	function all(effects) {
	  return effect(ALL, effects);
	}
	function race(effects) {
	  return effect(RACE, effects);
	}

	function getFnCallDesc(meth, fn, args) {
	  if (process.env.NODE_ENV === 'development') {
	    check(fn, is.notUndef, meth + ": argument fn is undefined");
	  }

	  var context = null;

	  if (is.array(fn)) {
	    var _fn = fn;
	    context = _fn[0];
	    fn = _fn[1];
	  } else if (fn.fn) {
	    var _fn2 = fn;
	    context = _fn2.context;
	    fn = _fn2.fn;
	  }

	  if (context && is.string(fn) && is.func(context[fn])) {
	    fn = context[fn];
	  }

	  if (process.env.NODE_ENV === 'development') {
	    check(fn, is.func, meth + ": argument " + fn + " is not a function");
	  }

	  return {
	    context: context,
	    fn: fn,
	    args: args
	  };
	}

	function call(fn) {
	  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return effect(CALL, getFnCallDesc('call', fn, args));
	}
	function apply(context, fn, args) {
	  if (args === void 0) {
	    args = [];
	  }

	  return effect(CALL, getFnCallDesc('apply', {
	    context: context,
	    fn: fn
	  }, args));
	}
	function cps(fn) {
	  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    args[_key2 - 1] = arguments[_key2];
	  }

	  return effect(CPS, getFnCallDesc('cps', fn, args));
	}
	function fork(fn) {
	  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    args[_key3 - 1] = arguments[_key3];
	  }

	  return effect(FORK, getFnCallDesc('fork', fn, args));
	}
	function spawn(fn) {
	  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    args[_key4 - 1] = arguments[_key4];
	  }

	  return detach(fork.apply(void 0, [fn].concat(args)));
	}
	function join() {
	  for (var _len5 = arguments.length, tasks = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	    tasks[_key5] = arguments[_key5];
	  }

	  if (tasks.length > 1) {
	    return all(tasks.map(function (t) {
	      return join(t);
	    }));
	  }

	  var task = tasks[0];

	  if (process.env.NODE_ENV === 'development') {
	    check(task, is.notUndef, 'join(task): argument task is undefined');
	    check(task, is.task, "join(task): argument " + task + " is not a valid Task object " + TEST_HINT);
	  }

	  return effect(JOIN, task);
	}
	function cancel() {
	  for (var _len6 = arguments.length, tasks = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	    tasks[_key6] = arguments[_key6];
	  }

	  if (tasks.length > 1) {
	    return all(tasks.map(function (t) {
	      return cancel(t);
	    }));
	  }

	  var task = tasks[0];

	  if (process.env.NODE_ENV === 'development' && tasks.length === 1) {
	    check(task, is.notUndef, 'cancel(task): argument task is undefined');
	    check(task, is.task, "cancel(task): argument " + task + " is not a valid Task object " + TEST_HINT);
	  }

	  return effect(CANCEL$1, task || SELF_CANCELLATION);
	}
	function select(selector) {
	  if (selector === void 0) {
	    selector = identity;
	  }

	  for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
	    args[_key7 - 1] = arguments[_key7];
	  }

	  if (process.env.NODE_ENV === 'development' && arguments.length) {
	    check(arguments[0], is.notUndef, 'select(selector, [...]): argument selector is undefined');
	    check(selector, is.func, "select(selector, [...]): argument " + selector + " is not a function");
	  }

	  return effect(SELECT, {
	    selector: selector,
	    args: args
	  });
	}
	/**
	  channel(pattern, [buffer])    => creates a proxy channel for store actions
	**/

	function actionChannel(pattern, buffer) {
	  if (process.env.NODE_ENV === 'development') {
	    check(pattern, is.notUndef, 'actionChannel(pattern,...): argument pattern is undefined');

	    if (arguments.length > 1) {
	      check(buffer, is.notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
	      check(buffer, is.buffer, "actionChannel(pattern, buffer): argument " + buffer + " is not a valid buffer");
	    }
	  }

	  return effect(ACTION_CHANNEL, {
	    pattern: pattern,
	    buffer: buffer
	  });
	}
	function cancelled() {
	  return effect(CANCELLED, {});
	}
	function flush$1(channel) {
	  if (process.env.NODE_ENV === 'development') {
	    check(channel, is.channel, "flush(channel): argument " + channel + " is not valid channel");
	  }

	  return effect(FLUSH, channel);
	}
	function getContext(prop) {
	  if (process.env.NODE_ENV === 'development') {
	    check(prop, is.string, "getContext(prop): argument " + prop + " is not a string");
	  }

	  return effect(GET_CONTEXT, prop);
	}
	function setContext(props) {
	  if (process.env.NODE_ENV === 'development') {
	    check(props, is.object, createSetContextWarning(null, props));
	  }

	  return effect(SET_CONTEXT, props);
	}
	function takeEvery$2(patternOrChannel, worker) {
	  for (var _len8 = arguments.length, args = new Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
	    args[_key8 - 2] = arguments[_key8];
	  }

	  return fork.apply(void 0, [takeEvery$1, patternOrChannel, worker].concat(args));
	}
	function takeLatest$2(patternOrChannel, worker) {
	  for (var _len9 = arguments.length, args = new Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
	    args[_key9 - 2] = arguments[_key9];
	  }

	  return fork.apply(void 0, [takeLatest$1, patternOrChannel, worker].concat(args));
	}
	function takeLeading$2(patternOrChannel, worker) {
	  for (var _len10 = arguments.length, args = new Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
	    args[_key10 - 2] = arguments[_key10];
	  }

	  return fork.apply(void 0, [takeLeading$1, patternOrChannel, worker].concat(args));
	}
	function throttle$2(ms, pattern, worker) {
	  for (var _len11 = arguments.length, args = new Array(_len11 > 3 ? _len11 - 3 : 0), _key11 = 3; _key11 < _len11; _key11++) {
	    args[_key11 - 3] = arguments[_key11];
	  }

	  return fork.apply(void 0, [throttle$1, ms, pattern, worker].concat(args));
	}
	var delay$1 =
	/*#__PURE__*/
	call.bind(null, delay);

	var createAsEffectType = function createAsEffectType(type) {
	  return function (effect) {
	    return effect && effect[IO] && effect[type];
	  };
	};

	var asEffect = {
	  take:
	  /*#__PURE__*/
	  createAsEffectType(TAKE),
	  put:
	  /*#__PURE__*/
	  createAsEffectType(PUT),
	  all:
	  /*#__PURE__*/
	  createAsEffectType(ALL),
	  race:
	  /*#__PURE__*/
	  createAsEffectType(RACE),
	  call:
	  /*#__PURE__*/
	  createAsEffectType(CALL),
	  cps:
	  /*#__PURE__*/
	  createAsEffectType(CPS),
	  fork:
	  /*#__PURE__*/
	  createAsEffectType(FORK),
	  join:
	  /*#__PURE__*/
	  createAsEffectType(JOIN),
	  cancel:
	  /*#__PURE__*/
	  createAsEffectType(CANCEL$1),
	  select:
	  /*#__PURE__*/
	  createAsEffectType(SELECT),
	  actionChannel:
	  /*#__PURE__*/
	  createAsEffectType(ACTION_CHANNEL),
	  cancelled:
	  /*#__PURE__*/
	  createAsEffectType(CANCELLED),
	  flush:
	  /*#__PURE__*/
	  createAsEffectType(FLUSH),
	  getContext:
	  /*#__PURE__*/
	  createAsEffectType(GET_CONTEXT),
	  setContext:
	  /*#__PURE__*/
	  createAsEffectType(SET_CONTEXT)
	};



	var sagaEffects = /*#__PURE__*/Object.freeze({
		take: take,
		takeMaybe: takeMaybe,
		put: put,
		putResolve: putResolve,
		all: all,
		race: race,
		call: call,
		apply: apply,
		cps: cps,
		fork: fork,
		spawn: spawn,
		join: join,
		cancel: cancel,
		select: select,
		actionChannel: actionChannel,
		cancelled: cancelled,
		flush: flush$1,
		getContext: getContext,
		setContext: setContext,
		takeEvery: takeEvery$2,
		takeLatest: takeLatest$2,
		takeLeading: takeLeading$2,
		throttle: throttle$2,
		delay: delay$1
	});

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
	        const task = yield fork(watcher);
	        yield fork(function*() {
	          yield take(`${model.namespace}/@@CANCEL_EFFECTS`);
	          yield cancel(task);
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
	      yield put({ type: `${key}${NAMESPACE_SEP}@@start` });
	      const ret = yield effect(...args.concat(createEffects(model)));
	      yield put({ type: `${key}${NAMESPACE_SEP}@@end` });
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
	        yield takeLatest$2(key, sagaWithOnEffect);
	      };
	    case 'throttle':
	      return function*() {
	        yield throttle$2(ms, key, sagaWithOnEffect);
	      };
	    default:
	      return function*() {
	        yield takeEvery$2(key, sagaWithOnEffect);
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
	  function put$$1(action) {
	    const { type } = action;
	    assertAction(type, 'sagaEffects.put');
	    return put({ ...action, type: prefixType(type, model) });
	  }

	  // The operator `put` doesn't block waiting the returned promise to resolve.
	  // Using `put.resolve` will wait until the promsie resolve/reject before resuming.
	  // It will be helpful to organize multi-effects in order,
	  // and increase the reusability by seperate the effect in stand-alone pieces.
	  // https://github.com/redux-saga/redux-saga/issues/336
	  function putResolve$$1(action) {
	    const { type } = action;
	    assertAction(type, 'sagaEffects.put.resolve');
	    return put.resolve({
	      ...action,
	      type: prefixType(type, model),
	    });
	  }
	  put$$1.resolve = putResolve$$1;

	  function take$$1(type) {
	    if (typeof type === 'string') {
	      assertAction(type, 'sagaEffects.take');
	      return take(prefixType(type, model));
	    } else if (Array.isArray(type)) {
	      return take(
	        type.map(t => {
	          if (typeof t === 'string') {
	            assertAction(t, 'sagaEffects.take');
	            return prefixType(type, model);
	          }
	          return t;
	        })
	      );
	    } else {
	      return take(type);
	    }
	  }
	  return { ...sagaEffects, put: put$$1, take: take$$1 };
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

	return create;

})));
