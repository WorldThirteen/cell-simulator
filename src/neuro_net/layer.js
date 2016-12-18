import Neuron from './neuron';

export default class Layer {

	constructor(params) {

		this.params = {
			...Layer.defaultParams,
			...params
		}

		this.neurons = new Array(this.params.length)
			.fill(null)
			.map((n, key) => new Neuron({
				weights: this.params.weights[ key ] || [],
				domain: this.params.domain,
				defaultOut: this.params.defaultOut,
				activateFunction: this.params.activateFunction,
			}));

		this.out = this.params.defaultOut;

	}

	static defaultParams = {
		weights: [],
		domain: [0,1],
		defaultOut: 0,
		activateFunction: 'threshold',
		length: 0
	}

	addNeuron(params) {

		this.neurons.push(new Neuron({
			weights: [],
			domain: this.params.domain,
			defaultOut: this.params.defaultOut,
			activateFunction: this.params.activateFunction,
			...params
		}));

	}

	process(signals) {

		this.out = this.neurons.map(neuron => neuron.process(signals));
		return this.out;

	}

	get signals() {

		return this.out;

	}

}