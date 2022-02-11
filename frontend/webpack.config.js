import path from "path";
import glob from "glob";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import sveltePreprocess from "svelte-preprocess";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import fs from "fs";

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

let entries = {}; // used to hold all entry points templates
let outputs = []; // used to hold all output html files templates

// generate entry points and output files templates
glob.sync("src/**/*.svelte").forEach((file) => {
  const entry = file.replace(/src\/([a-zA-Z_-]+)\.svelte/, "$1");

  const tpl = `import App from "./${entry}.svelte"; export default new App({ target: document.getElementById("app") });`;

  fs.writeFileSync(`/dev/shm/${entry}.js`, tpl);

  // create entry point template loaded above
  fs.writeFileSync(
    `/dev/shm/${entry}.svelte`,
    `<script>
      import Menu from "/components/menu.svelte";
      import Main from "/${file}";
      import Toasts from "/components/toasts.svelte";
      import "/src/style.css";
    </script>
    <header>
      <nav>
        <Menu />
      </nav>
    </header>
    <main>
      <Main />
    </main>
    <footer>
      footer content goes here
      <Toasts />
    </footer>`
  );

  // create virtual entry for each file, including menu
  entries[entry] = `/dev/shm/${entry}.js`; // webpack needs to have a data:text/javascript format

  // generates html files for each entry point and rewrites the script / css links
  outputs.push(
    new HtmlWebpackPlugin({
      chunks: [entry], // include menu and template file
      filename: `${entry}/index.html`, // output file name
      template: "./layout.tpl", // layout template
    })
  );
});

// merge all the plugins
const plugins = [
  ...outputs,
  new MiniCssExtractPlugin({
    filename: "assets/css/[name]-[contenthash].css", // all css files put here
  }),
];

export default {
  stats: {
    colors: true,
    preset: "minimal",
    warnings: true,
    errors: true,
    errorDetails: true,
  },
  resolve: {
    modules: [path.resolve("node_modules"), path.resolve("./")],
  },
  entry: entries, // defined above
  plugins: plugins, // defined above
  output: {
    path: path.join(path.resolve(), "../public"), // output path
    filename: "assets/js/[name].[contenthash].js", // all js files put here
    clean: true, // delete all files in the output directory before each build
    publicPath: "/", // absolute path to the output files
  },
  // only loading svelte files and css currently, no ts, assets, etc
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
            emitCss: true, // will generate separate css file
            preprocess: sveltePreprocess({
              // use tailwindcss, process css first before compiling
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
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode, // development or production
  devtool: prod ? false : "source-map", // generate source maps if in development
};
