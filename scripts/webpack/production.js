import path from 'path';
import webpack from 'webpack';
import { ENTRY_PATH, ENTRY_FOLDER } from '../config'

export default {
	entry: [
		path.join(__dirname, `../../${ENTRY_PATH}`)
	]
};
