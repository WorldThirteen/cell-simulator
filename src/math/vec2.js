// import { Node } from 'quantizer/state';
// import { isMap } from '../types/types';

/**
 * Creates a new Vec2.
 * @class
 */

class Vec2 {

	constructor(x, y) {

		if ( typeof x === 'object' ) {

			this.set(x);

		} else {

			this.x = x || 0;
			this.y = y || 0;

		}



	}

	static From(obj) {

		return new Vec2().set(obj);

	}

	/**
	 * Summary two vectors.
	 *
	 * @static
	 * @param { Vec2 } vec1 - first vector
	 * @param { Vec2 } vec2 - second vector
	 * @returns { Vec2 }
	 */

	static Add(vec1, vec2) {

		return new Vec2(vec1.x + vec2.x, vec1.y + vec2.y);

	}

	/**
	 * Subvector two vectors.
	 *
	 * @static
	 * @param { Vec2 } vec1 - first vector
	 * @param { Vec2 } vec2 - second vector
	 * @returns { Vec2 }
	 */

	static Sub(vec1, vec2) {

		return new Vec2(vec1.x - vec2.x, vec1.y - vec2.y);

	}

	/**
	 * Multiply two vectors.
	 *
	 * @static
	 * @param { Vec2 } vec1 - first vector
	 * @param { Vec2 } vec2 - second vector
	 * @returns { Vec2 }
	 */

	static Multiply(vec1, vec2) {

		return new Vec2(vec1.x * vec2.x, vec1.y * vec2.y);

	}

	/**
	 * Divide 2 argument vectors.
	 *
	 * @static
	 * @param { Vec2 } vec1 - first vector
	 * @param { Vec2 } vec2 - second vector
	 * @returns { Vec2 }
	 */

	static Divide(vec1, vec2) {

		return new Vec2(vec1.x / vec2.x, vec1.y / vec2.y);

	}

	/**
	 * Distance between 2 argument vectors.
	 *
	 * @static
	 * @param { Vec2 } vec1 - first vector
	 * @param { Vec2 } vec2 - second vector
	 * @returns { Number }
	 */

	static Distance(vec1, vec2) {

		return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));

	}

	/**
	 * Dot product
	 *
	 * @param { Vec2 } vec1 - first vector
	 * @param { Vec2 } vec2 - second vector
	 * @returns {number}
	 */

	static DotProduct(vec1, vec2) {

		return vec1.x * vec2.x + vec1.y * vec2.y;

	}

	/**
	 * Projecting vector to vector
	 *
	 * @param { Vec2 } vec1 - first vector
	 * @param { Vec2 } vec2 - second vector
	 * @returns { Vec2 }
	 */

	static Project(vec1, vec2) {

		const d = vec2.dotProduct(vec2);

		if (d > 0) {

			const dp = vec1.dotProduct(vec2);
			const multiplier = dp / d;
			return vec2.multScalar(multiplier);

		}
		return new Vec2(0, 0);

	}

	/**
	 * Get angle between two vectors
	 *
	 * @param { Vec2 } vec1 - first vector
	 * @param { Vec2 } vec2 - second vector
	 * @returns {number}
	 */
	
	static Angle(vec1, vec2) {

		return vec1.dotProduct(vec2) / (vec1.length * vec2.length);
		
	}

	/**
	 * Get vector object.
	 *
	 * @returns { Object }
	 */

	get() {

		let result = {};

		if (arguments.length) {

			for (let name in arguments[ 0 ]) {

				result[ name ] = this[ name ];

			}

		} else {

			result = {
				x: this.x,
				y: this.y
			};

		}

		return result;

	}

	sub(vec2) {

		return Vec2.Sub(this, vec2);

	}

	add(vec2) {

		return Vec2.Add(this, vec2);

	}

	mult(vec2) {

		return Vec2.Multiply(this, vec2);

	}

	/**
	 * Set vector object.
	 *
	 * @param { Object } source - Source value.
	 * @returns { Vec2 }
	 */

	set() {

		for (let name in arguments[ 0 ]) {

			this[ name ] = arguments[ 0 ][ name ];

		}

		return this;

	}

	setX(value) {

		return new Vec2(value, this.y);

	}


	setY(value) {

		return new Vec2(this.x, value);

	}

	/**
	 *  Get vector length.
	 *
	 *  @returns { Number }
	 */

	get length() {

		return Math.sqrt(this.x * this.x + this.y * this.y);

	}

	/**
	 *  Get modified vector by multiply coords.
	 *
	 *  @returns { Vec2 }
	 */

	multScalar(scalar) {

		return new Vec2(this.x * scalar, this.y * scalar);

	}

	/**
	 *  Get inverted vector.
	 *
	 *  @returns { Vec2 }
	 */

	invert() {

		return new Vec2(-this.x, -this.y);

	}

	/**
	 *  Get vector by x coord.
	 *
	 *  @returns { Vec2 }
	 */

	invertX() {

		return new Vec2(-this.x, this.y);

	}

	/**
	 *  Get vector by y coord.
	 *
	 *  @returns { Vec2 }
	 */

	invertY() {

		return new Vec2(this.x, -this.y);

	}

	/**
	 *  Clone vector.
	 *
	 *  @returns { Vec2 }
	 */

	clone() {

		return new Vec2(this.x, this.y);

	}

	/**
	 *  Min vector.
	 *
	 * @param { Object } vec - min vector.
	 *  @returns { Vec2 }
	 */

	min(vec) {

		if (this.x < vec.x) {

			this.x = vec.x;

		}

		if (this.y < vec.y) {

			this.y = vec.y;

		}

		return this;

	}

	/**
	 *  Normalize vector.
	 *
	 *  @returns { Vec2 }
	 */

	normal() {

		return new Vec2(Math.abs(this.x), Math.abs(this.y));

	}

	/**
	 *  Max vector.
	 *
	 * @param { Object } vec - max vector.
	 * @returns { Vec2 }
	 */

	max(vec) {

		if (this.x > vec.x) {

			this.x = vec.x;

		}

		if (this.y > vec.y) {

			this.y = vec.y;

		}

		return this;

	}

	fromSize(size) {

		this.set({
			x: size.w,
			y: size.h
		});

	}

	toSize() {

		return {
			w: this.x,
			h: this.y
		};

	}

	dotProduct(vec) {

		return Vec2.DotProduct(this, vec);

	}

	project(vec) {

		return Vec2.Project(this, vec);

	}

	angle(vec) {

		return Vec2.Angle(this, vec);

	}

}

export default Vec2;
