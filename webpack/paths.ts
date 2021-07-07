import * as path from "path";

export const root = path.join.bind(null, __dirname, "..");
export const src = path.join.bind(null, root(), "src");
export const dist = path.join.bind(null, root(), "dist");
export const vendor = path.join.bind(null, root(), "vendors");
export const loader = path.join.bind(null, __dirname, "loaders");
/** `public` is a reserved token in strict mode */
export const publico = path.join.bind(null, root(), "public");
/** Used by `CopyWebpackPlugin`. */
export const copy = (filePath: string, ...paths: string[]) =>
  path.join(...paths, path.basename(filePath));
