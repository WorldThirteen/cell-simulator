import Vec2 from '../math/vec2';

export default class CanvasDrawer {

	constructor(canvas) {

		this.params = {
			width: canvas.width,
			height: canvas.height,
		}

		this.ctx = canvas.getContext('2d');
		this.foodItems = new Array(Math.round(Math.random() * 100))
			.fill(null)
			.map(() => {

				return new Vec2(
					Math.random() * 800,
					Math.random() * 400,
				);

			});

		// canvas.addEventListener('mousemove', ::this.drawvse);

	}

	drawvse(e) {

		this.clear();

		this.ctx.fillStyle = 'green';
		this.foodItems.map(i => {
			this.drawFoodItem(i);
		});
		this.drawUnit(new Vec2(e.layerX, e.layerY));

	}

	drawSmallPoint(coords, radius, color) {

		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(coords.x, coords.y, radius, 0, Math.PI * 2, false);
		this.ctx.fill();

	}

	drawCanvasLine(source, end, color) {

		this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo(source.x,source.y);
		this.ctx.lineTo(end.x,end.y);
		this.ctx.stroke();

	}

	drawFrame(frameData) {

		this.clear();

		this.ctx.strokeStyle = '#40484f';
		this.ctx.fillStyle = '#0abe55';

		frameData
			.units
			.map(::this.drawUnit);

		frameData
			.food
			.map(::this.drawFoodItem);


	}

	findCollisions(source, end) {

		return this.foodItems.map(circlePoint => {

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

	drawLine(start, end) {

		const endPoints = [end].concat(this.findCollisions(start, end));
		let min = end.sub(start).length;
		let res = end;
		let finded = false;
		endPoints.map(p => {

			if (p) {
				const length = p.sub(start).length;
				if (length < min) {
					finded = true;
					min = p.sub(start).length;
					res = p;
				}
			}
			return p;

		});

		this.drawCanvasLine(
			start,
			res,
			finded ? 'green' : 'black'
		);

	}

	drawLines(unit) {

		const full = Math.PI * 2;
		const part = full / PARTS_NUM;
		let curDeg = -part;

		for (let i = 0; i < PARTS_NUM; i++) {

			curDeg += part;
			const vec = new Vec2(
				Math.cos(curDeg),
				Math.sin(curDeg),
			);

			this.drawLine(
				new Vec2(unit).add(vec.multScalar(UNIT_RAD)),
				new Vec2(unit).add(vec.multScalar(UNIT_RAD))
					.add(vec.multScalar(LINE_LENGTH)),
			);

		}

	}

	drawUnit(unit) {

		const { x, y, score, lines } = unit;

		this.ctx.beginPath();
		const radius = UNIT_RAD;

		this.ctx.font = "24px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.strokeStyle = 'black';
		this.ctx.fillText(score, unit.x, unit.y);
		this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
		this.ctx.stroke();

		lines.map(line =>
			this.drawCanvasLine(line.from, line.to, line.active ? 'green' : 'black'));

	}

	drawFoodItem(item) {

		const { x, y } = item;

		this.ctx.beginPath();
		const radius = FOOD_RAD;

		this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
		this.ctx.fill();

	}

	clear() {

		this.ctx.clearRect(0, 0, this.params.width, this.params.height);

	}

}
