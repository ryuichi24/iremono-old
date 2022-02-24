const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(''),
      },
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    static: path.resolve(__dirname, '..', './dist'),
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}`,
        secure: false,
        changeOrigin: true,
        headers: {
          Connection: 'keep-alive',
        },
      },
      open: true,
    },
  },
};
