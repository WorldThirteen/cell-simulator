import ACTIVATE_FUNCTIONS from './activate_functions';

const functions = {};

Object.keys(ACTIVATE_FUNCTIONS).map(key => {

	let func = () => {};

	switch (key) {

		case 'threshold':

			func = ACTIVATE_FUNCTIONS[ key ].bind(null, 0, 1, 0.5);

		case 'gisterezis':

			func = ACTIVATE_FUNCTIONS[ key ].bind(null, 0, 1, 0.35, 0.65);

		case 'sigmoid':

			func = ACTIVATE_FUNCTIONS[ key ].bind(null, 0, 1, 1);


	}

	functions[ key ] = func;
	
});

export default functions;