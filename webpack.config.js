const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      scripts: [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/angular/angular.min.js',
        './WebApp/app.js',
        './WebApp/Components/test.component.js',
        './WebApp/Directives/test.directive.js',
      ],
      styles: [
        './Content/site.css',
        './WebApp/Components/test.component.css',
        './WebApp/Directives/test.directive.css',
      ],
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'wwwroot/bundles'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
      }),
    ],
    devtool: isProduction ? false : 'source-map',
    optimization: {
      minimize: isProduction,
    },
  };
};
