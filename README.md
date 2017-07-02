需求

利用 webpack，将源码目录（./src）下各个目录下的 html 文件结合模板文件 layout.html 进行内容替换并生成新的 html 页面，并按照相同的目录结构将新的页面文件放到 ./public 目录下。

说明

主要功能： 利用 webpack 的 HtmlWebpackPlugin 插件实现模板替换

参考文章： html-webpack-plugin 详解

整体思路：

利用 node 遍历指定目录，得到该目录下各个文件经过处理后的路径
将上面的路径存入一个数组 pathArr
然后循环遍历路径数组，并将每个路径都注入到一个 HtmlWebpackPlugin 实例中
在第三步的遍历中，可以读取各个路径指定文件的内容，并将读取到的内容注入到相应的 HtmlWebpackPlugin 实例中，这样就可以在模板中进行内容替换
最后在 webpack.config.js 文件中引入 HtmlWebpackPlugin 实例数组
注意事项： 读代码或改代码时，注意代码中的路径

构建步骤

在当前目录下

npm install

npm run build