const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: { main: "./src/scripts/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    // путь, куда "смотрит" режим разработчика
    static: path.resolve(__dirname, "./dist"), 
    // это ускорит загрузку в режиме разработки
    compress: true,
    // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    port: 8080, 
    // сайт будет открываться сам при запуске npm run dev
    open: true, 
  },
  module: {
    rules: [
      // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: "/node_modules/",
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            //Если вы используете директиву @import в css-файлах, после подключения postcss-loader, нужно изменить то, как подключается css-loader.
            // В конце css-loader необходимо передать опцию importLoaders со значением 1:
            options: { importLoaders: 1 },
          },
          // Добавьте postcss-loader
          "postcss-loader",
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ]
};
