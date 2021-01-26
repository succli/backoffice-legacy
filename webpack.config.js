const path = require('path');

module.exports = {
  mode: process.env.ENVIRONMENT ? process.env.ENVIRONMENT : 'production',
  entry: './app/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|server)/,
        use: ['babel-loader']
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader'
      },
      {
        test: /\.(ttf|eot)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: 'file-loader?context=app/assets/images/&name=[path][name].[ext]&publicPath=/'
      }
    ]
  }
}