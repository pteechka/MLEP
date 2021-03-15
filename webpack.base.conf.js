const path = require('path');
const walkSync = require('walk-sync')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
}

//  Collect all *.pug files from pug/pages directory
const PAGES = walkSync(`${PATHS.src}/pug/pages/`, { directories: false })
              .filter(fileName => fileName.endsWith('.pug'))


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
          test: /\.(png|jpe?g|gif|svg|webp)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        },{
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: `${PATHS.assets}fonts/`
              }
            }
          ]
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
              loader: 'sass-loader',
              options: { sourceMap: true }
            }, 
            {
              loader: 'postcss-loader',
              options: { 
                sourceMap: true, 
                postcssOptions: {
                  config: "./postcss.config.js"
                }
              }
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
              loader: 'sass-loader',
              options: { sourceMap: true }
            }, 
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  config: "./postcss.config.js" 
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
      ...PAGES.map(page => new HtmlWebpackPlugin({
        template: `${PATHS.src}/pug/pages/${page}`,
        filename: `./${page.replace(/\.pug/, '.html')}`
      })),
      new MiniCssExtractPlugin({
        filename: `${PATHS.assets}css/[name].css`
      }),
      // new CopyWebpackPlugin({
      //   patterns: [
      //   {from: `${PATHS.src}/img/`, to: `${PATHS.assets}img/`}
      //   ]
      // }),
      
    ]
  };