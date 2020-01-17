/*** webpack.config.js 
 * 
 *  使用 example/src/index.js作为项目入口，处理资源文件的依赖关系
    通过 babel-loader来编译处理 js和jsx文件
    通过style-loader 和 css-loader来处理 css 依赖和注入内联样式
    通过html-webpack-plugin自动注入编译打包好的脚本文件
    为 demo 启动端口为 3001 的服务

 * ***/
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
 template: path.join(__dirname, "example/src/index.html"),
 filename: "./index.html"
});
module.exports = {
 entry: path.join(__dirname, "example/src/index.js"),
//  新增输出文件
 output: {
    path: path.join(__dirname, "example/dist"),
    filename: "bundle.js"
  },
 module: {
   rules: [{
     test: /\.(js|jsx)$/,
   use: "babel-loader",
   exclude: /node_modules/
 },{
   test: /\.css$/,
   use: ["style-loader", "css-loader"]
 }]
},
 plugins: [htmlWebpackPlugin],
 resolve: {
   extensions: [".js", ".jsx"]
 },
 devServer: {
   port: 3001
}};