import { Vec4 } from './vec2';
import { Node } from 'quantizer/state';


class Color {

	constructor({ r, g, b, a }) {

		this.r = r || 0;
		this.g = g || 0;
		this.b = b || 0;
		this.a = a || 1;

	}

	hex(_hex) {

		let $hex = Math.floor(_hex);

		this.r = ($hex >> 16 & 255) / 255;
		this.g = ($hex >> 8 & 255) / 255;
		this.b = ($hex & 255) / 255;

		return this;

	}

	rgba() {

		return {
			r: this.r,
			g: this.g,
			b: this.b,
			a: this.a
		};

	}

	html() {

		return `rgba(${255 * this.r},${255 * this.g},${255 * this.b},${this.a})`;

	}

	set() {

		let value = arguments[ 0 ];

		for (let name in value) {

			this[ name ] = arguments[ 0 ][ name ];

		}

	}

	get() {

		return this.rgba();

	}

}

export default Color;
