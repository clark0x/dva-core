import babel from 'rollup-plugin-babel';
import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [
  babel({
    'presets': [
      [
        '@babel/preset-es2015',
        {
          'modules': false,
        },
      ],
    ],
    'plugins': [
      '@babel/plugin-proposal-object-rest-spread',
    ],
    'exclude': [
      'node_modules/**',
      'test/**',
    ],
  }),
];

if (process.env.BUILD !== 'production') {
  plugins.push(istanbul({
    exclude: ['test/**/*', 'node_modules/**/*'],
  }));
}

export default {
  entry: 'src/index.js',
  plugins: plugins,
  external: external,
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      name: 'dva-core',
      sourceMap: true,
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true,
    },
  ],
};