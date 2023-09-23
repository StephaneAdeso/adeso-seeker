//@ts-check

'use strict';

const path = require('path');
const terserPlugin = require('terser-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const commonConfig = (env, argv) => {
  const isProduction = argv.nodeEnv === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    bail: isProduction,
    devtool: isProduction ? 'none' : 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          type: 'asset/resource'
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('ts-loader')
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.css$/i,
          use: [miniCssExtractPlugin.loader, 'css-loader'],
          sideEffects: true
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new terserPlugin({
          terserOptions: {
            format: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    },
    plugins: [new miniCssExtractPlugin()]
  };
};

// extension sources
const extensionConfig = (env, argv) => {
  return {
    ...commonConfig(env, argv),
    target: 'node',
    entry: './src/extension.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'extension.js',
      libraryTarget: 'commonjs2'
    },
    externals: {
      vscode: 'commonjs vscode'
    }
  };
};

// react sources
const seekerUIConfig = (env, argv) => {
  return {
    ...commonConfig(env, argv),
    entry: './src/infraestructure/views/SeekerUI/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'seeker-ui.js'
    }
  };
};

module.exports = [extensionConfig, seekerUIConfig];
