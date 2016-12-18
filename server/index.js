import path from 'path';
import express from 'express';
import { PORT, OUTPUT_PATH } from '../scripts/config'

const app = express();

app.use(express.static(path.join(__dirname, `../${OUTPUT_PATH}`)));

app.get('*', (request, responce) => {

	console.log('ss')

	responce.sendFile(path.join(__dirname, `../${OUTPUT_PATH}/index.html`));

});

process.on('uncaughtException', (err) => {

	console.log(err.message);

});

process.on('SIGINT', (err) => {

	console.log(`SIGINT: ${err}`);

});

app.listen(PORT, (err) => {

	if (err) {

		console.log(err);

	}

});