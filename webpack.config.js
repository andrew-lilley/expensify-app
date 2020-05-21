const path = require('path');
const glob = require('glob');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')

// Define exports for webpack.
module.exports = (env) => {
  const isProduction = env === 'production';
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    optimization: {
      minimize: isProduction ? true : false,
      minimizer: [
        new TerserJSPlugin({
          cache: isProduction ? true : false,
          parallel: isProduction ? true : false,
          sourceMap: true,
          terserOptions: {}
        }), 
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new PurgecssPlugin({
        paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
        only: ['bundle', 'vendor']
      }),
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|s?css|html|svg)$/,
        threshold: 8192,
        minRatio: 0.8
      }),
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.(js|s?css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    // Reduce the size of the bundle.js file.
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    }
  }
}