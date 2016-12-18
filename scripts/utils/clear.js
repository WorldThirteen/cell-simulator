import sh from './bash';
import chalk from 'chalk';
import { ENTRY_PATH, OUTPUT_PATH } from '../config'

export default () => {

	return sh(`rm -rf ${OUTPUT_PATH}`).then(() => {

		console.log(chalk.blue('> Build cleared sueccesfull.'));

	});

}


