//@ts-check

"use strict";

const path = require("path");
const terserPlugin = require("terser-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const commonConfig = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? "source-map"
      : isEnvDevelopment && "eval-cheap-module-source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          type: "asset/resource",
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve("ts-loader"),
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.css$/i,
          use: [miniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new terserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
    plugins: [new miniCssExtractPlugin()],
  };
};

const extensionConfig = (webpackEnv) => {
  return {
    ...commonConfig(webpackEnv),
    target: "node",
    entry: "./src/extension.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "extension.js",
      libraryTarget: "commonjs2",
    },
    externals: { vscode: "commonjs vscode" },
  };
};

const seekerUIConfig = (webpackEnv) => {
  return {
    ...commonConfig(webpackEnv),
    entry: "./src/infraestructure/views/SeekerUI/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "seeker-ui.js",
    },
  };
};

module.exports = [extensionConfig, seekerUIConfig];
