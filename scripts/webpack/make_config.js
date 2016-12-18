import { ENTRY_FOLDER, OUTPUT_PATH } from '../config';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import developmentConfig from './development';
import productionConfig from './production';

let makeBasicConfig = (mode) => {

	return {
		debug: mode === 'DEVELOPMENT',
		cache: mode === 'DEVELOPMENT',
		devtool: 'source-map',
		stats: {
			colors: true,
			reasons: false,
			hash: false,
			version: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			cached: false,
			cachedAssets: false
		},
		noInfo: true,
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(__dirname, `../../${ENTRY_FOLDER}/index.html`),
				inject: 'body',
				filename: 'index.html'
			}),
			// new webpack.optimize.OccurenceOrderPlugin()
		],
		output: {
			path: path.join(__dirname, `../../${OUTPUT_PATH}`),
			filename: `[name].js`,
			publicPath: '/'
		},
		resolve: {
			modulesDirectories: ['node_modules'],
			// alias: {
			// 	quantizer: path.join(__dirname, '../../quantizer')
			// }
		},
		module: {
			loaders: [{
				test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg|gif)$/,
				exclude: /node_modules/,
				loader: 'url-loader?limit=100000'
			}, {
				test: /\.json?$/,
				loader: 'json'
			}, {
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}, {
				test: /.*basic_.*\.sass$/,
				loaders: [
					'style',
					'css',
					'sass?indentedSyntax'
				]
			}, {
				test: /\.sass$/,
				exclude: /.*basic_.*\.sass$/,
				loaders: [
					'style?sourceMap=false',
					'css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]',
					'sass'
				]
			}],
			noParse: /node_modules\/quill\/dist/
		}
	};
	
};

export default (mode) => {

	let basicConfig = makeBasicConfig(mode);
	let config = null;

	if (mode === 'development') {

		config = Object.assign({}, basicConfig, developmentConfig);
		basicConfig.plugins.map((plugin) => {

			config.plugins.push(plugin);

		});

	}

	if (mode === 'production') {

		config = Object.assign({}, basicConfig, productionConfig);
		basicConfig.plugins.map((plugin) => {
			
			config.plugins.push(plugin);
			
		});


	}
	
	return config;

};
