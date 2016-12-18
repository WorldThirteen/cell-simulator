import World from '../simulator';
import Vec2 from '../math/vec2';

export default class MainController {

	constructor(opts) {

		this.drawer = opts.drawer;
		this.ui = opts.ui;
		this.ui.setCallback(::this.actionHandler);

		this.population = [];
		this.simulator = new World();
		this.food = new Array(Math.round(Math.random() * 100))
			.fill(null)
			.map(() => {

				return new Vec2(
					Math.random() * 800,
					Math.random() * 400,
				);

			});

		this.options = {
			visibleUnit: 1,
			populationSize: 10
		}

		this.current = [];
		this.status = 'paused';

		this.init();

	}

	actionHandler(type, value) {

		switch (type) {

			case 'options':

				this.options = Object.assign(this.options, value);

				if (typeof value.visibleUnit != 'undefined') {

					this.draw();
					this.ui.update(this.current.map(u => u.units[0], this.options.visibleUnit));

				}
				break;

			case 'play':

				if (this.status == 'paused') {
					this.start();
				} else if (this.status == 'started') {
					this.pause();
				}
				break;

		}


	}

	init(t) {

		this.population = new Array(this.options.populationSize)
			.fill(null)
			.map(() => ({
				x: 400,
				y: 200,
				weights: [
					new Array(15)
						.fill(null)
						.map(() => new Array(15)
							.fill(null)
							.map(() => Math.random())
						)
					,
					new Array(15)
						.fill(null)
						.map(() => new Array(15)
							.fill(null)
							.map(() => Math.random())
						)
				]
			}));

		this.simulator.init(this.population, this.food);
		this.ui.init(this);
		this.start(t);
	}

	draw() {

		let toDraw;
		if (this.options.visibleUnit === 'HS') {
			toDraw = this.current
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
		} else {
			toDraw = this.current[ this.options.visibleUnit - 1 ]
		}
		this.drawer.drawFrame(toDraw);

	}

	start(t) {

		this.status = 'started';
		clearInterval(this.interval);
		this.interval = setInterval(() => {
			this.step();
		}, t || 10);

	}

	pause() {

		this.status = 'paused';
		clearInterval(this.interval);

	}

	step() {

		this.current = this.simulator.step();
		this.ui.update(this.current.map(u => u.units[0], this.options.visibleUnit));
		if (this.current.map(u => u.end).indexOf(false) === -1) {

			this.pause();

		} else {

			this.draw();

		}

	}

}