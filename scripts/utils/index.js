import { exec } from 'child_process';
import path from 'path';

function sh(cmd) {

	return new Promise((resolve, reject) => {

		exec(cmd, (err, stdout, stderr) => {

			if (err) {

				reject(err);

			} else {

				resolve({ stdout, stderr });

			}

		});

	});

}

export sh from './bash';
export clear from './clear';
export bundle from './bundle';
