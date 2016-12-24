import World from '../simulator';
import Vec2 from '../math/vec2';
import Evolver from '../evolve';

export default class MainController {

	constructor(opts) {

		this.drawer = opts.drawer;
		this.ui = opts.ui;
		this.ui.setCallback(::this.actionHandler);

		this.simulator = new World();
		this.generateFood();

		this.options = {
			visibleUnit: 'HS',
			populationSize: 10,
			speed: 0,
		}

		this.evolver = new Evolver({
			populationSize: this.options.populationSize,
			numberOfGenes: 450,
			numberOfWinners: 3,
			genesToMutate: 200,
			mutationRate: 0.25
		});

		this.current = [];
		this.status = 'paused';
		this.populationNum = 0;

		this.init();

	}

	actionHandler(type, value) {

		switch (type) {

			case 'options':

				this.options = Object.assign(this.options, value);

				if (typeof value.visibleUnit != 'undefined') {

					this.draw();
					this.ui.update({
						units: this.current.map(u => u.units[0]),
						visible: this.options.visibleUnit,
						highlight: this.getViewebleUnitIndex(),
						populationNum: this.populationNum
					});

				}
				break;

			case 'play':

				if (this.status == 'paused') {
					this.start();
				} else if (this.status == 'started') {
					this.pause();
				}
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

	toMatrix(data, row) {

		var matrix = [];
		for (var i = 0; i < data.length; i += row) {
			matrix.push(data.slice(i, i + row));
		}
		return matrix;

	}

	toUnits(population) {

		return population.map(u => {

			return {
				x: 400,
				y: 200,
				weights: [
					this.toMatrix(u.slice(0, u.length / 2), 15),
					this.toMatrix(u.slice(u.length / 2, u.length), 15),
				]
			};

		});

	}

	init() {

		this.evolver.initRandomPopulation();
		this.ui.init(this);
		this.initRound();
	}

	initRound() {

		const population = this.toUnits(this.evolver.population);

		this.simulator.init(population, this.food);
		this.start(this.options.speed);

	}

	evolve() {

		this.evolver.evolve(this.current.map(u => u.score));
		this.populationNum++;

	}

	draw() {

		this.drawer.drawFrame(this.current[ this.getViewebleUnitIndex() ]);

	}

	getViewebleUnitIndex() {

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

	start(t = 10) {

		this.status = 'started';
		clearInterval(this.interval);
		this.interval = setInterval(() => {
			this.step();
		}, t);

	}

	pause() {

		this.status = 'paused';
		clearInterval(this.interval);

	}

	step() {

		try {

			this.current = this.simulator.step();
			this.ui.update({
				units: this.current.map(u => u.units[0]),
				visible: this.options.visibleUnit,
				highlight: this.getViewebleUnitIndex(),
				populationNum: this.populationNum
			});
			if (this.current.map(u => u.end).indexOf(false) === -1) {

				this.pause();
				this.evolve();
				this.generateFood();
				this.initRound();

			} else {

				this.draw();

			}

		} catch (err) {

			this.pause();
			console.log(err);

		}

	}

}