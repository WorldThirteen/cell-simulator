import sh from './bash';
import chalk from 'chalk';
import path from 'path';

export default function runTests(list) {


	let handler = (p, index) => {

		sh(`mocha --require scripts/utils/jsdom.js --compilers js:babel-core/register ${p}`).then((result) => {

			console.log(chalk.grey('#########################################'));
			console.log(chalk.green('> ' + p));
			console.info(result.stdout);

		}).catch((err) => {

			console.log(chalk.red('> ' + err));

		});

	};

	list.map(handler);

}
