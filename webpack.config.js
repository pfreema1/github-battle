const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

var config = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  resolve: {
    // changed from extensions: [".js", ".jsx"]
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, use: { loader: "awesome-typescript-loader" } },
      // addition - add source-map support
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  // addition - add source-map support
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html"
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
