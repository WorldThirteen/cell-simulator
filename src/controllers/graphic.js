export default class GraphicDrawer {

	constructor(node) {

		this.injectionNode = node;
		this.body = null;

	}

	setStyle(node, style) {

		for (let i in style) {

			node.style[ i ] = style[ i ];

		}

	}

	draw(type, data, size, minMax) {

		this.injectionNode.innerHTML = '';
		this.svg = this.injectionNode;

		switch (type) {

			case 'xy':

				this.drawXY(data, size, minMax);

		}

		this.svg.innerHTML = this.svg.innerHTML;

	}

	createBody(size) {

		this.svg = document.createElement('svg');
		this.svg.setAttribute('width', size.x);
		this.svg.setAttribute('height', size.y);
		this.setStyle(this.svg, { width: `${size.x}px`, height: `${size.y}px`, display: 'block' });
		this.svg.setAttribute('viewBox', `0 0 ${size.x} ${size.y}`);

	}

	createLine(p1, p2, style) {

		const line = document.createElement('line');

		if (style) {

			if (style.strokeWidth) {
				line.setAttribute('stroke-width', style.strokeWidth);
			}
			if (style.stroke) {
				line.setAttribute('stroke', style.stroke);
			}

		}

		line.setAttribute('x1', p1.x);
		line.setAttribute('y1', p1.y);
		line.setAttribute('x2', p2.x);
		line.setAttribute('y2', p2.y);

		return line;

	}

	createText(p, content, style) {

		const text = document.createElement('text');

		if (style && style.inline) {
			text.setAttribute('style', style.inline);
		}

		text.setAttribute('x', p.x);
		text.setAttribute('y', p.y);
		text.innerHTML = content;

		return text;

	}

	createPolyline(data, style) {

		const polyline = document.createElement('polyline');
		let points = '';
		data.map(p => {
			points += `${p.x},${p.y} `;
		});

		if (style) {

			if (style.strokeWidth) {
				polyline.setAttribute('stroke-width', style.strokeWidth);
			}
			if (style.fill) {
				polyline.setAttribute('fill', style.fill);
			}
			if (style.stroke) {
				polyline.setAttribute('stroke', style.stroke);
			}

		}

		polyline.setAttribute('points', points);

		return polyline;

	}

	drawXY(data, size, { min, max }) {

		if (typeof min === 'undefined' || typeof max === 'undefined') {
			if (typeof min === 'undefined') min = data[0][0];
			if (typeof max === 'undefined') max = data[0][0];

			data.map(lines => {
				lines.map(i => {
					if (i < min) {
						min = i;
					}
					if (i > max) {
						max = i;
					}
				});
			});
		}

		const margin = 20;

		const kX = (size.x - margin * 2) / data.length;
		const kY = (size.y - margin * 2) / Math.abs(max - min);

		const baseStyles = {
			stroke: 'black',
			strokeWidth: '1'
		};

		const baseY = min < 0 ? size.y + min - margin : size.y - margin;

		// append base lines
		this.svg.appendChild(this.createLine({ x: margin, y: margin }, { x: margin, y: baseY }, baseStyles));
		this.svg.appendChild(this.createLine({ x: margin, y: baseY }, { x: size.x - margin, y: baseY }, baseStyles));

		// append text
		this.svg.appendChild(this.createText({ x: size.x - margin - 10, y: baseY + 15 }, 'x'));
		this.svg.appendChild(this.createText({ x: 0, y: margin + 10 }, 'y'));
		this.svg.appendChild(this.createText({ x: 0, y: baseY + 15 }, '0'));

		// draw data
		data.map((d) => {
			const _d = d.map((i, key) => {
				console.log(i);
				return { x: key * kX, y: size.x - i * kY - margin * 2 };
			});
			this.svg.appendChild(this.createPolyline(_d, { fill: 'none', stroke: 'black', strokeWidth: '1' }));
		});

	}

}