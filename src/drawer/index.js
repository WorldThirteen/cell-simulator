export default class CanvasDrawer {

	constructor(canvas) {

		this.params = {
			width: canvas.width,
			height: canvas.height,
		}

		this.ctx = canvas.getContext('2d');

	}

	// drawSmallPoint(coords, radius, color) {
	//
	// 	this.ctx.fillStyle = color;
	// 	this.ctx.beginPath();
	// 	this.ctx.arc(coords.x, coords.y, radius, 0, Math.PI * 2, false);
	// 	this.ctx.fill();
	//
	// }

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
