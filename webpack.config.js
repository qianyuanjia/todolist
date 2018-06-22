const path=require('path')
const cleanWebpackPlugin=require('clean-webpack-plugin')
const htmlWebpackPlugin=require('html-webpack-plugin')
const isDev=process.env.NODE_ENV==='development'
const webpack=require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function getAbsolutePath(dir){
    return path.join(__dirname,dir)
}

const config={
    target:'web',
    entry:'./src/main.js',
    output:{
        filename:'app.js',
        path:getAbsolutePath('dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.js$/,
                loader:'babel-loader'
            }
        ]
    },
    plugins:[
        new cleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
            template:getAbsolutePath('index.html')
        }),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        })
    ]
}

if(isDev){
    config.devServer={
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        open:true,
        hot:true
    }
    config.module.rules.push(
        {
            test:/\.css$/,
            use:[
                'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        }
    )
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ),
    config.devtool = "#cheap-module-eval-souce-map"
}else{
    config.module.rules.push(
        {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader"
            ]
        }
    )
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "style-[contenthash:8].css"
          })
    )
    config.output.filename="[name]-[chunkhash:8].js"
    config.optimization={
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
}
module.exports=config