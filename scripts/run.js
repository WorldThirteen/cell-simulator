import {
	PORT,
	ENTRY_PATH,
	TESTS_LIST,
	ESDOC_CONFIG
} from './config';
import { clear, bundle, sh } from './utils';
import chalk from 'chalk';
import makeConfig from './webpack/make_config';
import developmentServer from './webpack/development_server';
import RunTest from './utils/test';
import GenerateDocumentation from './utils/documentation';

const MODE = process.env.NODE_ENV;
const CONFIG = makeConfig(MODE);
const CLEAR = process.argv.includes('--clear');
const TEST = process.argv.includes('--test');
const DOCUMENTATION = process.argv.includes('--documentation');

if (CLEAR || TEST || DOCUMENTATION) {

	if (CLEAR) {

		clear();

	}

	if(TEST) {

		RunTest(TESTS_LIST);

	}

	if(DOCUMENTATION) {

		GenerateDocumentation(ESDOC_CONFIG);

	}

} else {

	if (MODE === 'production') {

		clear()
			.then(() => bundle(CONFIG))
			.then(() => {

				sh('babel-node ./server/index').then((result) => {

					console.log(result.stdout);

				});

				console.log(chalk.green(`> Server App Running on - ${PORT} port`));
				console.log(chalk.grey('>'));
				console.log(chalk.grey('>'));

			});

	}

	if (MODE === 'development') {

		developmentServer(PORT, () => {

			console.log(chalk.green(`> Development Server Running on - ${PORT}`));
			console.log(chalk.grey('>'));

		});

	}

}