const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/main.js'],
    output: {
      path: __dirname + '/dist',
      filename: '[name].bundle.js',
      publicPath: '/assets/'
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/pug/pages/index/index.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'assets/UIKit/Colors_Type.html',
        template: 'src/pug/pages/UIKit/Colors_Type.pug'
      })
    ]
  };