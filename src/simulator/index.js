import Net from '../neuro_net/network';
import Vec2 from '../math/vec2';

const NETWORK_PARAMS = (weights) => {
	return {
		layers: [
			{
				weights: weights[ 0 ],
				length: weights[ 0 ].length,
				activateFunction: 'sigmoid'
			},
			{
				weights: weights[ 1 ],
				length: weights[ 1 ].length,
				activateFunction: 'sigmoid'
			}
		]
	}
}

export default class Simulator {

	constructor() {

		this.rooms = [{
			units: [],
			foods: []
		}];

	}

	init(units, foods) {

		this.rooms = units.map(u => {
			return {
				unit: {
					...u,
					score: 0,
					mind: new Net(NETWORK_PARAMS(u.weights)),
					life: 100
				},
				foods: foods.map(food => food)
			}
		});

	}

	findCollisions(source, end, key) {

		return this.rooms[ key ].foods.map(circlePoint => {

			const main_vector = end.sub(source);

			const point = circlePoint.sub(source).project(main_vector);
			const _vec = point.add(source).sub(circlePoint);

			const radius = FOOD_RAD;
			const vec_length = _vec.length;
			const begintInter = source.sub(circlePoint).length < radius;
			const endInter = end.sub(circlePoint).length < radius;

			const isInterruct = vec_length < radius
				&& Vec2.DotProduct(point, main_vector) >= 0
				&& main_vector.length >= point.length;
			const interSect = isInterruct || (begintInter || endInter);

			if (interSect) {

				const projectedPoint = point.add(source);
				const ort = main_vector.multScalar(1/main_vector.length);
				const l = Math.sqrt(radius*radius - vec_length*vec_length) * 2;

				const p1 = projectedPoint.sub(ort.multScalar((l / 2)));
				const p2 = projectedPoint.add(ort.multScalar((l / 2)));

				const filtered = [p1, p2].filter(p => {
					return ((p.x >= source.x && p.x <= end.x) || (p.x <= source.x && p.x >= end.x))
						&& ((p.y >= source.y && p.y <= end.y) || (p.y <= source.y && p.y >= end.y))
				}).sort((a, b) => {

					const _a = Vec2.Sub(a, source).length;
					const _b = Vec2.Sub(b, source).length;

					if (_a > _b) {
						return 1;
					}

					if (_a > _b) {
						return -1;
					}

					return 0;

				})[0];

				if (filtered) {

					return filtered;

				}

			}

			return false;

		});

	}

	processLine(start, end, key) {

		const endPoints = [end].concat(this.findCollisions(start, end, key));
		let min = end.sub(start).length;
		let res = end;
		let active = false;
		endPoints.map(p => {

			if (p) {
				const length = p.sub(start).length;
				if (length < min) {
					active = true;
					min = length;
					res = p;
				}
			}
			return p;

		});
		return {
			from: start,
			to: res,
			active
		};

	}

	getUnitLines(unit, key) {

		const full = Math.PI * 2;
		const part = full / PARTS_NUM;
		let curDeg = -part;
		let res = [];

		for (let i = 0; i < PARTS_NUM; i++) {

			curDeg += part;
			const vec = new Vec2(
				Math.cos(curDeg),
				Math.sin(curDeg),
			);

			res.push(this.processLine(
				new Vec2(unit).add(vec.multScalar(UNIT_RAD)),
				new Vec2(unit).add(vec.multScalar(UNIT_RAD))
					.add(vec.multScalar(LINE_LENGTH)),
				key
			));

		}

		return res;

	}

	getUnitSignals(lines) {

		return lines.map(line =>
		(
			Math.round(
				(LINE_LENGTH - Math.min(line.to.sub(line.from).length, 25)) * 1000
			) / 1000) / LINE_LENGTH
		);

	}

	moveUnit(movement, key) {

		const full = Math.PI * 2;
		const part = full / PARTS_NUM;
		let curDeg = -part;
		let x = 0;
		let y = 0;

		for (let i = 0; i < PARTS_NUM; i++) {

			curDeg += part;
			x += movement[ i ] * Math.cos(curDeg) * 2;
			y += movement[ i ] * Math.sin(curDeg) * 2;

		}

		const coords = new Vec2(
			this.rooms[ key ].unit.x + x,
			this.rooms[ key ].unit.y + y
		)
			.max(new Vec2(800 - UNIT_RAD, 400 - UNIT_RAD))
			.min(new Vec2(0 + UNIT_RAD, 0 + UNIT_RAD));

		const diff = Math.abs(this.rooms[ key ].unit.x - coords.x)
			+ Math.abs(this.rooms[ key ].unit.y - coords.y);

		if (diff < 0.1 && diff > 0) {
			this.rooms[ key ].unit.life -= 0.5 - diff;
		} else if (diff < 0.001) {
			this.rooms[ key ].unit.life -= 1;
		}

		this.rooms[ key ].unit.x = coords.x;
		this.rooms[ key ].unit.y = coords.y;

		return this.rooms[ key ].unit;

	}

	checkEat(unit, key) {

		this.rooms[ key ].foods.map((food, _key) => {
			
			if (Vec2.Sub(food, unit).length < UNIT_RAD + FOOD_RAD ) {
				
				this.rooms[ key ].foods.splice(_key, 1);
				this.rooms[ key ].unit.score += 1;
				this.rooms[ key ].unit.life += 40;
				
			}
			
		});

		return this.rooms[ key ].unit.score;

	}

	step() {

		return this.rooms.map((room, key) => {

			let lines = this.getUnitLines(room.unit, key);
			let score = this.rooms[ key ].unit.score;
			if (room.unit.life > 0) {
				const signals = this.getUnitSignals(lines);
				const movement = room.unit.mind.process(signals);
				const movedUnit = this.moveUnit(movement, key);
				score = this.checkEat(movedUnit, key);
				this.rooms[ key ].unit.life += -0.1;
			}

			return {
				units: [{
					x: this.rooms[ key ].unit.x,
					y: this.rooms[ key ].unit.y,
					radius: UNIT_RAD,
					lines,
					score,
					life: this.rooms[ key ].unit.life
				}],
				food: this.rooms[ key ].foods,
				end: this.rooms[ key ].unit.life <= 0
			}

		});

	}

}