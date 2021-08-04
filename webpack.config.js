const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const AsyncChunkNames = require('webpack-async-chunk-names-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const f = new Date();
const meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

module.exports = (env, options) => {
  const jsonFiles = {}

  // Destination path
  const getDestinationPath = () => {
    return options.mode === 'development' ? `bundle/dev` : `bundle/prod`
  }

  // Construye dinámicamente la lista de archivos de entrada
  const files = glob.sync(`./src/business/${env.site}/scenes/*/**.js`)

  // Create dynamic site files
  for (let i = 0; i < files.length; i++) {
    fileName = files[i].split('.js')[0]
    jsonFiles[fileName] = fileName
  }
  const webpackConfig = {
    mode: 'development',
    devtool: (options.mode === 'development' ? 'inline-source-map' : false),
    watch: true,
    watchOptions: {
      aggregateTimeout: 300, // Process all changes which happened in this time into one rebuild
      poll: 1000, // Check for changes every second,
      ignored: /node_modules/
      // ignored: [
      //   '**/*.scss', '/node_modules/'
      // ]
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        common: path.resolve(__dirname, './src/common')
      }
    },
    devServer: {
      contentBase: 'bundle/dev',
      hot: true,
      open: true,
      inline: true,
      writeToDisk: true,
      watchContentBase: true,
      port: 3000,
      https: true,
      compress: true,
      disableHostCheck: true,
      stats: { children: false },
      overlay: {
        warnings: true,
        errors: true
      },
      headers: { 'Access-Control-Allow-Origin': '*' }
    },
    entry: jsonFiles,
    output: {
      publicPath: '/dist',
      path: path.join(__dirname, getDestinationPath()),
      filename: '[name].min.js',
      chunkFilename: '[name].min.js'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                additionalData: `@import './src/business/${env.site}/config/_variables.scss';`,
                implementation: require('dart-sass')
              }
            }
          ]
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env']
            }
          }
        }
      ]
    },
    plugins: [
      // new CleanWebpackPlugin({
      //   cleanOnceBeforeBuildPatterns: [`bundle/dev/*.hot-update.*`],
      //   dry: false,
      //   dangerouslyAllowCleanPatternsOutsideProject: true
      // }),
      new MiniCssExtractPlugin({
        filename: '[name].min.css'
      })
    ]
  }

  if (options.mode === 'development') {
    webpackConfig.plugins.push(
      new AsyncChunkNames(),
      new webpack.HotModuleReplacementPlugin()
    );
  } else {
    webpackConfig.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new webpack.BannerPlugin({
        banner: (`${env.site} \r * Uploaded on: (` + f.getDate() + ` ` + meses[f.getMonth()] + `, ` + f.getFullYear() + ` - ` + f.getHours() + `:` + f.getMinutes() + `` + (f.getHours() >= 12 ? `pm` : `am`) + `)  \r * Version: 1.1 \r * @requires jQuery v1.5 or later \r * Autor: Antony tasayco {Antony.exe@gmail.com}`),
        entryOnly: true
      })
    );
  }

  // Enviamos generamos el html por cada Scenes
  glob
    .sync(`./src/business/${env.site}/scenes/**/*.html`, {})
    .forEach((element) => {
      const path = element.split('/')
      const name = path[path.length - 1].split('.')[0]
      const filePath = element.split('.html')[0]
      webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
          // inject: false,
          template: `${filePath}.html`,
          // chunks: ['scenes'],
          filename: `./html/${env.site}/${name}.html`,
          templateParameters: {
            titulo: name
          },
          chunks: [filePath]
        })
      )
    }),
    glob
      .sync(`./src/business/${env.site}/plugins/**/*`, {})
      .forEach((element) => {
        const path = element.split('/')
        const namePath = path[path.length - 2]
        if (element.includes('.css') || element.includes('.js')) {
          webpackConfig.plugins.push(
            new CopyPlugin({
              patterns: [{ from: element, to: `./html/${env.site}/files` }]
            })
          )
        }
      })
  return webpackConfig
}
