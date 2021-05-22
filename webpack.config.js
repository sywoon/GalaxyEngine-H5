const path = require ("path");
const webpack = require('webpack')

var config = {
    entry: "./src/Main.ts",   //主入口

    output: {
        publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
        path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
        filename: "./bundle.js"  //生成后的文件  自动创建dist目录
    },

    mode: "development",   //开发模式
    devtool: "inline-source-map",   //调试ts源码需要
    resolve: {
        // alias: {
        //     h5libs: path.resolve(__dirname, 'src/galaxyEngine/h5libs/VertexArrayObject.js')
        // },
        extensions: [".ts", ".js"]    //可以解析的扩展名
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     // $: 'jquery', // npm
        //     h5libs: 'h5libs' // 本地Js文件
        // })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,            //如果时.ts结尾的文件
                use: ["ts-loader"],        //则使用ts-loader加载ts源码 并自动转译
                exclude: /node_modules/
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
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
      config.devtool = "inline-source-map";
    } else if (argv.mode === "production") {
    //   config.output.path = path.resolve(__dirname, "build");
    //   config.output.libraryTarget = "umd";
      config.output.globalObject = "typeof self !== 'undefined' ? self : this";
    }
  
    return config;
};