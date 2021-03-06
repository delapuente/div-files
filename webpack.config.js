const path = require('path');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var plugins = [];
process.env.SIZE_ANALYSIS && plugins.push(new BundleAnalyzerPlugin());

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    filename: 'div-files.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    library: 'div',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: [path.resolve(__dirname), path.resolve(__dirname, 'assets')],
    watchContentBase: true,
    disableHostCheck: true
  },
  plugins: plugins,
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};
