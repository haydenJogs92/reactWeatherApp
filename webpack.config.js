var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var destination = debug ? __dirname + "/src/" : __dirname + "/build/";
console.log("building to this destination: " + destination);

//npm run dev, npm run live, npm run prod
//https://hackernoon.com/optimising-your-application-bundle-size-with-webpack-e85b00bab579

console.log('Running in ' + process.env.NODE_ENV + " Mode");
console.log(debug);

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : 'cheap-module-source-map',


  entry: "./js/client.js",
  module: {
    loaders: [
        //loader for loading JSON
       { test: /\.json$/, loader: 'json' },
       //loader for js/react/jsx
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      //loader for jpeg, png etc
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ]
      },
      {test: /\.css$/, loaders: ['style', 'css']}
      //loader for css
      /*{
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      }*/
    ]
  },
  output: {
    //path: debug ? __dirname + "/src/" : __dirname + "/build/",
    path: destination,
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
  ],
};
