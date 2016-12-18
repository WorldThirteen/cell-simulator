import makeConfig from './make_config';
import developmentServer from './development_server';
import { clear, bundle } from '../utils';

import { PORT, ENTRY_PATH } from '../config';
import chalk from 'chalk';

export default (mode) => {
	
	const config = makeConfig(mode);

	if (mode === 'production') {

		clear()
			.then(() => bundle(config))
			.then(() => {

				sh('babel-node ../../server/index');

				console.log(chalk.green(`> Server App Running on - ${PORT} port`));
				console.log(chalk.grey('>'));
				console.log(chalk.grey('>'));

			});



	}

	if (mode === 'development') {

		developmentServer(PORT, () => {

			console.log(chalk.green(`> Development Server Running on - ${PORT}`));
			console.log(chalk.grey('>'));

		});

	}

};
