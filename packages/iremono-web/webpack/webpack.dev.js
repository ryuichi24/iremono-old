const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify('http://localhost:4000'),
      },
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    static: path.resolve(__dirname, '..', './dist'),
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
