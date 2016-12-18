import webpack from 'webpack';
import chalk from 'chalk';
import makeConfig from '../webpack/make_config';

export default (config) => {

	return new Promise((resolve, reject) => {

		webpack(config).run((err, stats) => {

			if (err) {

				return reject(err);

			}

			console.log(chalk.blue(`> Source bundled to ./dist dirrectory`));

			return resolve();

		});

	});
	
};
