import * as path from "path";
import glob from "glob";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import sveltePreprocess from "svelte-preprocess";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

let entries = {};
let outputs = [];

// get list of svelte files to compile
const files = glob.sync("./src/**/*.svelte").forEach((file) => {
  const entry = file.replace("./src/", "");

  // create virtual entry for each file, including menu
  const id = entry === "menu.svelte" ? "menu" : "app";
  entries[
    entry
  ] = `data:text/javascript,import App from "./src/${entry}"; const app = new App({ target: document.getElementById("${id}") }); export default app;`;

  // don't create a separate output file for the menu
  if (entry !== "menu.svelte") {
    outputs.push(
      new HtmlWebpackPlugin({
        chunks: ["menu.svelte", entry],
        filename: `${entry.replace(".svelte", "")}.html`,
        template: "./layout.tpl",
      })
    );
  }
});

const plugins = [
  ...outputs,
  new MiniCssExtractPlugin({
    filename: "css/[name]-[contenthash].css",
  }),
];

export default {
  stats: "errors-warnings",
  entry: entries,
  plugins: plugins,
  output: {
    path: path.join(path.resolve(), "/public"),
    filename: "js/[name].[contenthash].js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            preprocess: sveltePreprocess({
              postcss: {
                plugins: [tailwindcss, autoprefixer],
              },
            }),
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  mode,
  devtool: prod ? false : "source-map",
};
