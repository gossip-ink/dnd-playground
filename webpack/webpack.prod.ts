import CssMinimizerWebpackPlugin from "css-minimizer-webpack-plugin";
import { merge } from "webpack-merge";
import { Plugin } from "./type";
import common from "./webpack.common";

export default merge(common, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: ["...", new CssMinimizerWebpackPlugin() as Plugin],
  },
});
