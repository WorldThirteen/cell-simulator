export default {

	'threshold': (min, max, t, s) => {

		return s > t ? max : min;

	},
	'gisterezis': (min, max, p1, p2, s) => {

		return s <= p1
			? min
			: s >= p2
			? max
			: min + ((max - min) * ((s - p1) / (p2 - p1)));

	},
	'sigmoid': (min, max, A, s) => {

		return 1 / (1 + Math.exp(-A * (s - (max - min) / 2)))

	}

};
