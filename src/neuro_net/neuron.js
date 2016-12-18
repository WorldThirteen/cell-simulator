import ACTIVATE_FUNCTIONS from './ready_functions';

export default class Neuron {

	constructor(params) {

		this.params = {
			...Neuron.defaultParams,
			...params
		}

		this.activationFunc = Neuron.GetActivationFunc(this.params.activateFunction);
		this.out = this.params.defaultOut;

	}

	static defaultParams = {
		weights: [],
		domain: [0,1],
		defaultOut: 0,
		activateFunction: 'threshold'
	}

	static GetActivationFunc(func) {

		switch (typeof func) {

			case 'function':

				return func;

			case 'string':

				return ACTIVATE_FUNCTIONS[ func ];

			default:

				throw new Error('Neuron\'s \'activateFunction\' param must be a string of function');

		}

	}

	process(signals) {

		this.out = this.activationFunc(this.sum(signals));
		return this.out;

	}

	sum(signals) {

		let sum = 0;

		for (let i = 0; i < signals.length; i++) {

			const weight = this.params.weights[ i ];

			if (!Number.isFinite(weight) || !Number.isFinite(signals[ i ])) {

				throw new Error(`Signal or weight is not finite: weight ${weight}, signal ${signals[ i ]}`);

			}

			sum += signals[ i ] * weight;

		}

		return sum;

	}

	get signal() {

		return this.out;

	}

}