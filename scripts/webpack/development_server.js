import path from 'path';
import express from 'express';
import request from 'request';
import webpack from 'webpack';
import makeConfig from './make_config';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WebpackDevServer from 'webpack-dev-server';
import { URL, PORT, ENTRY_PATH } from '../config';

export default (port, callback) => {

	const config = makeConfig('development');

	let app = express();
	let compiler = webpack(config);

	app.use(webpackMiddleware(compiler, { publicPath: '/', stats: config.stats.toString() }));
	app.use(webpackHotMiddleware(compiler));
	app.use((req, res, next) => {

		if (req.url !== '/') {

			req.pipe(request(`${URL}:${PORT}`)).pipe(res);

		} else {

			next();

		}

	});

	app.get('*', (request, responce) => {

		responce.sendFile(path.join(__dirname, `../../${ENTRY_PATH}/index.html`));

	});

	app.listen(port, (err) => {

		if (err) {

			console.log(err);
			return;

		}

		callback();

	});

};
