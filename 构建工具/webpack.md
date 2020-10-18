# webpack
代码转换、文件优化、代码分割、模块合并、热更新、代码校验、自动发布

externals

## 分析
输出webpack构建信息的json文件，`--profile`用于统计构建中的耗时信息
```
webpack --profile --json > stats.json
```
webpack-bundle-analyzer

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
 
const smp = new SpeedMeasurePlugin();
 
module.exports = smp.wrap(YourWebpackConfig);

```

cache-loader
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.ext$/,
        use: ['cache-loader', ...loaders],
        include: path.resolve('src'),
      },
    ],
  },
};

```

happypack
```js
//webpack.config.js
const HappyPack = require("happypack");
const os = require("os");
//充分发挥多核的作用，进程数量设置为设备的核数
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module: {
        rules: [
            {
                test: /\.css$/,
                use: ["happypack/loader?id=css"]
            },
            {
                test: /\.less$/,
                use: ["happypack/loader?id=less"]
            },
            {
                test:/\.(png|jpe?g|gif)$/,
                use: ["happypack/loader?id=pic"]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: ["happypack/loader?id=ttf"]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "./src"),
                use: ["happypack/loader?id=babel"]
              }
        ]
    },

    plugins: [
	        new HappyPack({
            id: "css",
            loaders: ["style-loader", "css-loader"],
            threadPool: happyThreadPool
          }),
          new HappyPack({
            id: "less",
            loaders: ["style-loader", "css-loader","less-loader"],
            threadPool: happyThreadPool
          }),
          new HappyPack({
            id: "pic",
            loaders: [
              {
                loader: "file-loader",
                options: {
                  name: "[name]_[hash:6].[ext]",
                  outputPath: "images/"
                }
              }
            ],
            threadPool: happyThreadPool
          }),
          new HappyPack({
            id: "ttf",
            loaders: [
              {
                loader: "file-loader",
                options: {
                  name: "[name].[ext]",
                }
              }
            ],
            threadPool: happyThreadPool
          }),
          new HappyPack({
            id: "babel",
            loaders: [
              {
                loader: "babel-loader"
              }
            ],
            threadPool: happyThreadPool
          }),
     ]

```

```js
resolve: {
        modules: [path.resolve(__dirname, "./node_modules")],
        alias: {
            "vue": path.resolve(
              __dirname,
              "./node_modules/vue/dist/vue.esm.js"
            ),
            "react": path.resolve(
                __dirname,
                "./node_modules/react/umd/react.production.min.js"
              ),
              "react-dom": path.resolve(
                __dirname,
                "./node_modules/react-dom/umd/react-dom.production.min.js"
              )
        },
        extensions:['.js']
    },

```

```
//webpack.config.js

module.export = {
		watchOptions : {
      ignored : '/node_modules/',
      aggregateTimeout: 300,  //文件变动后多久发起构建，越大越好
      poll: 1000,  //每秒询问次数，越小越好
    }
}

```

webpack-dev-server --hot 模块热替换

## plugin
- html-webpack-plugin
- mini-css-extract-plugin、optimize-css-assets-webpack-plugin
- uglifyjs-webpack-plugin

## loader
- less-loader、postcss-loader、css-loader、style-loader
- babel-loader
- expose-loader

优化loader配置
```js
{
  test: /\.js$/,
  use: [
    'babel-loader?cacheDirectory' // 开启转换结果缓存
  ],
  include: path.resolve(__dirname, 'src'),
  exclude: path.resolve(__dirname, 'node_modules')
}
```

demo：
```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ]
        }
      },
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ]
    },
    {
      test: /\.less$/,
      use: [
        'less-loader'
      ]
    }
  ]
}
```
