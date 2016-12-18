import Vec2 from './vec2';
import { Node } from 'quantizer/state';

export default class Rect {

	constructor(x, y, w, h) {

		this.type = 'Rect';

		if (typeof x === 'object') {

			this.set(x);

		} else {

			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;

		}

	}

	set size(vec2) {

		this.set(vec2.toSize());

	}

	set position(vec2) {

		this.set(vec2);

	}

	get size() {

		return new Vec2(this.w, this.h);

	}

	get position() {

		return new Vec2(this.x, this.y);

	}

	get() {

		return {
			x: this.x,
			y: this.y,
			w: this.w,
			h: this.h
		};

	}

	set() {

		for (let name in arguments[ 0 ]) {

			this[ name ] = arguments[ 0 ][ name ];

		}

	}

	static toRect(position, size) {

		return new Rect(position.x, position.y, size.x, size.y);

	}

	static isValidType() {

		return true;

	}

}
