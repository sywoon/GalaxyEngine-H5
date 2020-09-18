const path = require ("path");
module.exports = {
    entry: "./src/Main.ts",   //主入口

    output: {
        filename: "./bundle.js"  //生成后的文件  自动创建dist目录
    },

    mode: "development",   //开发模式
    devtool: "inline-source-map",   //调试ts源码需要
    resolve: {
        extensions: [".ts", ".js"]    //可以解析的扩展名
    },
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,            //如果时.ts结尾的文件
                use: ["ts-loader"]        //则使用ts-loader加载ts源码 并自动转译
            }
        ]
    },

    //参数参考：https://webpack.js.org/configuration/dev-server
    devServer: {   //配置npm i webpack-dev-server --save-dev安装的那个服务器
        contentBase: path.join(__dirname, "./"),   //url根目录   默认也是这个地址
        compress: true,     //服务器会自动压缩代码
        host: "localhost",
        port: 3000,
        historyApiFallback: true,   //404错误 定位到index.html
        open: true      //启动服务器时自动打开浏览器
    }
}