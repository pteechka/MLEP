const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
}

module.exports = {
    externals: {
      paths: PATHS
    },
    entry: PATHS.src,
    output: {
      path: PATHS.dist,
      filename: `${PATHS.assets}js/[name].bundle.js`,
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/'
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            }, 
            {
              loader: 'postcss-loader',
              options: { 
                sourceMap: true, 
                postcssOptions: {
                  config: "./src/js/postcss.config.js"
                }
              }
            }, 
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            }, 
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  config: "./src/js/postcss.config.js" 
                }              
              }
            }
          ],
        },
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
      }),
      new HtmlWebpackPlugin({
        filename: 'assets/UIKit/Form_Elements.html',
        template: 'src/pug/pages/UIKit/Form_Elements.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'assets/UIKit/Cards.html',
        template: 'src/pug/pages/UIKit/Cards.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'assets/UIKit/Headers_Footers.html',
        template: 'src/pug/pages/UIKit/Headers_Footers.pug'
      }),
      new MiniCssExtractPlugin({
        filename: `${PATHS.assets}css/[name].css`
      }),
      new CopyWebpackPlugin({
        patterns: [
        {from: `${PATHS.src}/img/`, to: `${PATHS.assets}img/`}
        ]
      })
    ]
  };