const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry:{
        main: './src/index.js'
    },
    output:{
        filename:'[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch:true,
    watchOptions: {
        ignored: ['node_modules/**']
    },
    plugins: [
      new MiniCSSExtractPlugin({
        filename: "styles.css"
      })
    ],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ["babel-loader"],
          },
          { 
            test: /\.scss$/, 
            loader: [
              MiniCSSExtractPlugin.loader,
              "css-loader",
              'sass-loader'
            ]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              'file-loader',
          ],
          
         }
        ],
    },
    devServer: {
        port: 9000
    }
    
}