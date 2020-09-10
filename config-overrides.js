const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require('customize-cra');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const addCustom = () => (config) => {
  // eslint-disable-next-line no-param-reassign
  config.devtool = false;
  // eslint-disable-next-line no-param-reassign
  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
      }),
    ],
  };
  return config;
};
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      localIdentName: '[local]--[hash:base64:5]',
    },
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    '@app': path.resolve(__dirname, './src/app'),
    '@components': path.resolve(__dirname, './src/components'),
    '@services': path.resolve(__dirname, './src/services'),
    '@store': path.resolve(__dirname, './src/store'),
    '@utils': path.resolve(__dirname, './src/utils'),
  }),
  addCustom()
);
