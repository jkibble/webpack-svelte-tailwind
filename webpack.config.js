const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    filename: "assets/[name]-[hash].css",
  }),
];

module.exports = {
  entry: entries,
  plugins: plugins,
  output: {
    path: path.join(__dirname, "/public"),
    filename: "assets/[name].[hash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: !prod,
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
  devServer: {
    hot: true,
  },
};
