const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPluginConfig = require('./html-webpack-plugin-config.js');

let config = {
    entry: __dirname + "/main.js", // 唯一入口文件
    output: {
        path: __dirname + "/build", // 打包后的文件存放的地方
        filename: "bundle.js" // 打包后输出文件的文件名
    },
    plugins: [...htmlWebpackPluginConfig]
};

module.exports = config;