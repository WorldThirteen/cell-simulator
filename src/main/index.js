import Vec2 from '../math/vec2';
import Evolver from '../controllers/evolve';
import History from '../controllers/history';
import toMatrix from '../helpers/to_matrix';
import Clone from '../helpers/clone';
import SimulatorWorker from 'worker-loader!../workers/simulator_worker';

export default class MainController {

	constructor(opts) {

		this.drawer = opts.drawer;
		this.ui = opts.ui;
		this.ui.setCallback(::this.actionHandler);

		this.history = new History();

		this.generateFood();

		this.options = {
			visibleUnit: 'HS',
			populationSize: 10,
			speed: 10,
			FPS: 60,
		};

		this.initEvolver();

		this.current = [];
		this.workers = [];
		this.status = 'started';
		this.populationNum = 0;
		this.prevFrame = 0;

		this.init();

	}

	initEvolver(population) {

		this.evolver = new Evolver({
			populationSize: this.options.populationSize,
			numberOfGenes: 450,
			numberOfWinners: 3,
			genesToMutate: 200,
			mutationRate: 0.25
		}, population);

	}

	actionHandler(type, value) {

		switch (type) {

			case 'options':

				this.options = Object.assign(this.options, value);
				if (typeof value.speed !== 'undefined') {
					
					this.setSpeed();
					
				}
				break;

			case 'play':

				this.setState(this.status === 'started' ? 'paused' : 'started');
				break;
			
			case 'form_options':

				if (value.populationSize) {
					this.options.populationSize = value.populationSize;
				}
				this.evolver.params = Object.assign(this.evolver.params, value);
				break;

		}

	}

	generateFood() {

		this.food = new Array(Math.round(Math.random() * 100))
			.fill(null)
			.map(() => {

				return new Vec2(
					Math.random() * 800,
					Math.random() * 400,
				);

			});

	}

	toUnits(population) {

		return population.map(u => {

			return {
				x: 400,
				y: 200,
				weights: [
					toMatrix(u.slice(0, u.length / 2), 15),
					toMatrix(u.slice(u.length / 2, u.length), 15),
				]
			};

		});

	}

	init() {

		this.evolver.initRandomPopulation();
		this.ui.init(this);
		this.initRound();

		requestAnimationFrame(::this.frameHandler);

	}

	initRound() {

		const population = this.toUnits(this.evolver.population);
		this.generateFood();

		this.initWorkers(population, this.food);
	}

	evolve() {

		this.evolver.evolve(this.current.map(u => u.units[0].score));
		this.populationNum++;

	}

	draw() {

		const u = this.current[ this.getViewableUnitIndex() ];
		if (u) {
			this.drawer.drawFrame(u);
		}

	}

	initWorkers(units, food) {

		this.current = units.map(u => ({
			units: [{ ...u, life: 100, lines: [], score: 0 }],
			food: this.food
		}));

		if (units.length < this.workers.length) {
			this.workers.map((w, key) => {
				if (key >= units.length) {
					w.terminate();
				}
			});
		}

		units.map((u, i) => {

			if (!this.workers[ i ]) {

				this.workers[ i ] = new SimulatorWorker();
				this.workers[ i ].addEventListener('message', (e) => {
					if (e.data.type === 'STEP_SUCCESS') {
						this.current[ i ] = e.data.unit;
					}
					this.checkEnd();
				});

			}

			this.workers[ i ].postMessage({
				type: 'INIT',
				population: [u],
				food,
				delay: this.options.speed,
				state: this.status,
			});

		});

	}

	checkEnd() {

		if (this.current.map(u => u.end).indexOf(false) === -1) {

			this.updateHistory();
			this.evolve();
			if (this.options.FPS === 0) {
				this.updateUI();
			}
			this.ui.updateGraph(this.history.get('score'));
			this.initRound();

		}

	}

	updateUI() {

		this.ui.update({
			units: this.current.map(u => u.units[0]),
			visible: this.options.visibleUnit,
			highlight: this.getViewableUnitIndex(),
			populationNum: this.populationNum
		});

	}

	frameHandler() {

		requestAnimationFrame(::this.frameHandler);

		if (Date.now() - this.prevFrame > 1000 / this.options.FPS) {

			try {

				if (Date.now() % 2 === 0) {

					this.updateUI();

				}
				this.draw();

			} catch (err) {

				console.log(err);

			}

			this.prevFrame = Date.now();

		}

	}

	setSpeed() {
		
		this.workers.map(w => {
			
			w.postMessage({ type: 'CHANGE_DELAY', delay: this.options.speed });
			
		});
		
	}

	setState(status) {

		if (status !== this.status) {

			this.status = status;

			this.workers.map(w => {

				w.postMessage({ type: 'CHANGE_STATE', state: this.status });

			});


		}

	}

	updateHistory() {

		this.history.push(Clone({
			evolveParams: this.evolver.params,
			population: this.evolver.population,
			food: this.food,
			score: this.current.map(u => u.units[0].score),
			num: this.populationNum,
		}));

	}

	toJSON() {

		return JSON.stringify({
			population: this.evolver.population,
			populationNum: this.populationNum,
			history: this.history.get(),
		});

	}

	fromJSON(data) {

		this.setState('paused');

		const res = JSON.parse(data);

		this.initEvolver(res.population);
		this.populationNum = res.populationNum;
		this.history.set(res.history);

		this.initRound();
		this.setState('started');

	}

	getViewableUnitIndex() {

		if (this.options.visibleUnit === 'HS') {
			const i = this.current
				.filter(u => u.units[0].life > 0)
				.sort((a, b) => {

					if (a.units[0].score > b.units[0].score) {
						return -1;
					}
					if (a.units[0].score < b.units[0].score) {
						return 1;
					}
					return 0;

				})[ 0 ];
			return this.current.indexOf(i);
		}

		return this.options.visibleUnit - 1;

	}

}