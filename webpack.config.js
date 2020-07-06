/* === dont forget to import scss to main.js file === */
/* ===> import './main.scss'; <=== */

const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = (env, argv) => {
  let webpackConfig;
  const isDevelopment = argv.mode !== 'production';

  const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
  });
  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: isDevelopment ? '[name].css' : '[name].[hash].css',
    chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
  });

  webpackConfig = {
    entry: './src/main.tsx',
    output: {
      path: DIST_DIR,
      filename: 'bundle.js'
    },
    devtool: isDevelopment ? 'source-map' : false,
    devServer: {
      contentBase: DIST_DIR,
      open: true,
    },
    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: 'babel-loader'
        //   }
        // },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            }
          ]
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
              options: isDevelopment ? {} : {
                // publicPath: CSS_DIR
              }
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: { importLoaders: 2 }, // tell if that you are running your styles through two other loaders before this one should run
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader' // compiles Sass to CSS
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },

      ]
    },
    resolve: {
      alias: {
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      },
      extensions: [ '.ts', '.tsx', '.js' ],
    },
    plugins: [
      htmlPlugin,
      miniCssExtractPlugin
    ]
  };
  return webpackConfig;
};
