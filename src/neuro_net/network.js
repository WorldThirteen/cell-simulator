import Layer from './layer';
import ACTIVATE_FUNCTIONS from './activate_functions';

export default class Network {

	constructor(params) {

		this.params = {
			...Network.defaultParams,
			...params
		}

		this.layers = this.params.layers.map(p => new Layer(p));

	}

	static defaultParams = {
		layers: []
	};
	
	static ACTIVATE_FUNCTIONS = ACTIVATE_FUNCTIONS;

	addLayer(params) {

		this.layers.push(new Layer(params));

	}

	process(input) {

		if (!this.layers.length) {

			// return Promise.resolve(null);
			return null;

		}

		// return new Promise((resolve, reject) => {

			for (let i = 0; i < this.layers.length; i++) {

				const _in = i == 0 ? input : this.layers[ i - 1 ].signals;
				this.layers[ i ].process(_in);

			}

			return this.layers[ this.layers.length - 1 ].signals;

		// });

	}

}