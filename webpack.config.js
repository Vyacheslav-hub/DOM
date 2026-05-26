import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (_env, argv) => ({
  entry: {
    goblin: "./src/goblins-game/app.js",
    table: './src/table/app.js'
  },
  devServer: {
    static: "./dist",
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['goblin']
    }),
    new HtmlWebpackPlugin({
      template: './src/table.html',
      filename: 'table.html',
      chunks: ['table']
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
    publicPath: argv.mode === "production" ? "/DOM/" : "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
});
