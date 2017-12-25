const path = require('path');
const base = require('./webpack.config');
base.module.rules.push({
  test: /\.ts$/,
  use: {
    loader: 'istanbul-instrumenter-loader',
    options: { esModules: true }
  },
  include: path.resolve('src/'),
  enforce: 'post',
  exclude: /node_modules|\.test\.js$/
});

module.exports = base;
