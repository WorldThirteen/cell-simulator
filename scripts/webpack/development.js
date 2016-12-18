import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { ENTRY_PATH, OUTPUT_PATH, URL, PORT } from '../config';

export default {
	devtool: 'eval',
	// inline: true,
	entry: [
		`webpack-hot-middleware/client?${URL}:${PORT}&reload=true&noInfo=true&quiet=true`,
		'webpack/hot/only-dev-server',
		path.join(__dirname, `../../${ENTRY_PATH}`)
	],
	output: {
		path: path.join(__dirname, `../../${OUTPUT_PATH}`),
		filename: `[name].js`,
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('app.css', {
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	]
};
