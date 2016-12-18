const path = require('path');

module.exports = {
	entry: [
		path.join(__dirname, '../../src/index.js')
	],
	module: {
		loaders: [{
			test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg|gif)$/,
			loader: 'url-loader?limit=100000'
		}, {
			test: /\.json?$/,
			loader: 'json'
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.sass/,
			loaders: [
				'style?sourceMap=false',
				'css?modules&importLoaders=1&localIdentName=[name]_[hash:base64:4]',
				'sass'
			]
		}],
		noParse: /node_modules\/quill\/dist/
	}
};