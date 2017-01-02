import Simulator from '../controllers/simulator';

class SimulatorWorker {

	constructor() {

		this.simulator = new Simulator();
		self.addEventListener('message', ::this.onMessage);
		this.delay = 10;

	}

	init(population, food) {

		this.simulator.init(population, food);

	}

	start() {

		clearInterval(this.interval);
		this.interval = setInterval(() => {
			this.step();
		}, this.delay);

	}

	pause() {

		clearInterval(this.interval);

	}

	step() {

		try {

			const res = this.simulator.step()[ 0 ];
			if (res.end) {

				this.pause();

			}

			postMessage({ type: 'STEP_SUCCESS', unit: res });

		} catch (err) {

			this.pause();
			console.warn(err);
			postMessage({ type: 'STEP_ERROR', err: err.message });

		}

	}

	onMessage(e) {

		const { type, population, food, delay, state } = e.data;

		switch (type) {

			case 'INIT':

				this.init(population, food);
				if (typeof delay !== 'undefined') {
					this.delay = delay;
				}
				if (state === 'started') {
					this.start();
				}
				break;

			case 'CHANGE_DELAY':

				this.delay = delay;
				this.pause();
				this.start();
				break;

			case 'CHANGE_STATE':

				if (state === 'paused') {
					this.pause();
				} else {
					this.start();
				}
				break;

			default:
				return false;

		}
		return true;
	}


}

export default new SimulatorWorker();