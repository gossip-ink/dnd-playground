import { merge } from "webpack-merge";
import common from "./webpack.common";
import * as paths from "./paths";

export default merge(common, {
  mode: "development",
  devServer: {
    contentBase: paths.dist(),
    historyApiFallback: true,
    hot: true,
    compress: true,
    transportMode: "ws",
  },
  devtool: "inline-source-map",
});
