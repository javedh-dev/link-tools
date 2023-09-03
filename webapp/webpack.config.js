const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
  const mode = argv.mode || "development";
  const config = {
    entry: "./src/index.tsx",
    devtool: mode === "development" ? "inline-source-map" : false,
    mode: mode,
    performance: {
      hints: process.env.NODE_ENV === "production" ? "warning" : false,
    },
    output: {
      filename: "bundle.[fullhash].js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new Dotenv({
        path: "./.env",
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "bundle.[fullhash].css",
      }),
    ].filter(Boolean),
    resolve: {
      modules: [__dirname, "src", "node_modules"],
      extensions: [".*", ".js", ".jsx", ".tsx", ".ts", ".scss", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src/"),
        "@public": path.resolve(__dirname, "public/"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: ["babel-loader", "ts-loader"],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg)$/,
          exclude: /node_modules/,
          use: ["file-loader"],
        },
      ],
    },
    devServer: {
      port: 3000,
      compress: true,
      historyApiFallback: true,
    },
  };
  return config;
};
