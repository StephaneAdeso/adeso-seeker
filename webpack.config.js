//@ts-check

'use strict';
/**
 * @typedef {import('monaco-editor-webpack-plugin').IMonacoEditorWebpackPluginOpts} MonacoWebpackPluginOptions
 */

const path = require('path');
const fs = require('fs');
const terserPlugin = require('terser-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const cleanDistDirectory = () => {
  const distPath = path.resolve(__dirname, 'dist');

  if (fs.existsSync(distPath)) {
    fs.readdirSync(distPath).forEach((file) => {
      const filePath = path.resolve(distPath, file);
      fs.unlinkSync(filePath);
    });
  }
};

/** @type {MonacoWebpackPluginOptions} */
const monacoPluginOptions = {
  languages: [
    'cpp',
    'csharp',
    'go',
    'graphql',
    'html',
    'java',
    'javascript',
    'json',
    'php',
    'python',
    'restructuredtext',
    'shell',
    'typescript',
    'xml'
  ]
};

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const commonConfig = (env, argv) => {
  const isProduction = argv.nodeEnv === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    bail: isProduction,
    devtool: isProduction ? 'none' : 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        react: 'react',
        'react-dom': 'react-dom'
      }
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
    externals: {
      vscode: 'commonjs vscode'
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
    plugins: [
      new miniCssExtractPlugin(),
      new MonacoWebpackPlugin(monacoPluginOptions)
    ]
  };
};

// extension sources
const extensionConfig = (env, argv) => {
  return {
    ...commonConfig(env, argv),
    target: 'node',
    entry: path.resolve(__dirname, 'src', 'extension.ts'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'extension.js',
      library: {
        type: 'commonjs2'
      }
    }
  };
};

// react sources
const seekerUIConfig = (env, argv) => {
  return {
    ...commonConfig(env, argv),
    entry: path.resolve(
      __dirname,
      'src',
      'infrastructure',
      'seeker-ui',
      'index.tsx'
    ),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'seekerUi.js',
      sourceMapFilename: '[file].js.map'
    }
  };
};

cleanDistDirectory();
module.exports = [extensionConfig, seekerUIConfig];
