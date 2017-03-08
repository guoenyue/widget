### webpack中部分plugin用法
---
- html-webpack-plugin

用处：自动生成一个html文件，并且引用相关的assets文件。

用法(webpack.config.js)：

```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new HtmlWebpackPlugin({
            title: '',        // 设置HTML文件中的title
            filename: '',     // 设置HTML文件的名字，默认index.html
            template: '',     // 指定生成HTML文件的模板，使用自定义的模板文件时，要提前安装对应的loader
            inject: '[true | body | head | false]',    // 注入选项，决定js文件引用的位置
            favicon: '',      // 设置HTML文件中的shortcut icon favicon
            minify: [false | {html-minifier}],    // 压缩选项
            hash: [false | true],    // 给生成的js文件一个独特的hash值，默认值为false
            cache: [true | false],   // 默认值true，表示只有在内容变化时才生成一个新的文件
            showErrors: [true | false],    // webpack编译出现错误时，将错误信息包裹在pre标签内，默认为true，也就是显示错误信息
            chunks: [],            // 主要针对多入口文件，指定引入特定的文件，默认引用全部
            excludeChunks: [],     // 指定不引入特定的文件
            chunksSortMode: [dependency | auto | none | {function}],    // 决定引入文件的引用顺序
            xhtml: [false | true]    // 默认值false，为true时表示以兼容xhtml的模式引用文件
        })
    ]
}
```

    - 需要注意的点
        1. 当同时设置title和template时，webpack会选择template中的title，即使其未设置。

        2. inject选项：
            - true    默认值，script标签位于html文件的body底部
            - body    同true
            - head    script标签位于head标签内
            - false   不插入生成的js文件，只是单纯的生成一个html文件

        3. minify选项：
            - false   默认值，不对生成的html文件进行压缩
            - {html-minifier}    https://github.com/kangax/html-minifier#options-quick-reference
        
        4. chunksSortMode选项：
            - dependency    按照依赖关系排序
            - auto          默认值，按插件内置的排序方式
            - none    
            - {function}