const path = require("path");
const BundleTracker = require("webpack-bundle-tracker");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve("./static/"),
    filename: "[name].js",
    publicPath: "auto",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleTracker({
      path: __dirname,
      filename: "webpack-stats.json",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
