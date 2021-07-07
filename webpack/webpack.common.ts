import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { IgnorePlugin, ProgressPlugin } from "webpack";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import * as paths from "./paths";
import { Configuration, Plugin } from "./type";

const isProductionEnv = process.env.NODE_ENV === "production";

const styleLoader = isProductionEnv
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const common: Configuration = {
  entry: {
    main: paths.src("index.tsx"),
  },
  output: {
    filename: "[name].[fullhash].js",
    chunkFilename: "[name].[fullhash].js",
    assetModuleFilename: "[name][hash][ext]",
    path: paths.dist(),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        loader: "ts-loader",
      },
      {
        test: /\.pcss$/i,
        use: [styleLoader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.css$/i,
        use: [styleLoader, "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: [
          styleLoader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ProgressPlugin({}),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.src("index.html"),
    }),
    new IgnorePlugin({
      contextRegExp: /moment$/,
      resourceRegExp: /^\.\/locale$/,
    }),
    new WebpackManifestPlugin({}) as Plugin,
  ],
  optimization: {
    minimize: isProductionEnv,
  },
};

if (isProductionEnv) {
  common.plugins?.push(
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
      chunkFilename: "[id].[fullhash].css",
    }) as Plugin
  );
}

export default common;
