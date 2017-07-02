
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 要被扫描的主目录
let globalScanPath = './src';

// 路径数组
let pathArr = [];

// HtmlWebpackPlugin 实例数组
let htmlPluginArr = [];

// 递归读取目录下的文件或子目录，并将读取到的文件路径存入 pathArr
function getAllPath(scanPath) {
    let arr = fs.readdirSync(scanPath);

    arr.forEach(function(el) {
        let path = scanPath + '/' + el;
        let stats = fs.statSync(path);

        if (stats.isDirectory()) {
            let scanPath = path;
            getAllPath(scanPath);
        } else if (el === 'layout.html' || !el.match(/.+?\.html$/i)) {
            // 如果扫描到的文件是 layout.html 或者不是 html 文件
            // 则不会将其加入到路径数组中
        } else {
            pathArr.push(path);
        }

    });
}

getAllPath(globalScanPath);

// 将文件的路径依次注入到 HtmlWebpackPlugin 插件的实例中
pathArr.forEach(function(path) {
    let content = fs.readFileSync(path);
    let title = path.match(/[^\/]+(?=\.html)/)[0] + ' 页面';

    htmlPluginArr.push(new HtmlWebpackPlugin({

        // 新生成的文件放到 public 目录下
        filename: __dirname + path.replace(globalScanPath, '/public'),
        template: './src/layout.html',

        // 自定义数据
        title: title,
        PAGE_CONTENT: content,

        // 将 chunks 设置为空数组可以取消掉插件默认添加的 script 标签
        chunks: [],

        // 配置压缩选项
        minify: {
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }
    }));
});

module.exports = htmlPluginArr;