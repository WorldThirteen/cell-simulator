/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _simulator = __webpack_require__(1);
	
	var _simulator2 = _interopRequireDefault(_simulator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SimulatorWorker = function () {
		function SimulatorWorker() {
			_classCallCheck(this, SimulatorWorker);
	
			this.simulator = new _simulator2.default();
			self.addEventListener('message', this.onMessage.bind(this));
			this.delay = 10;
		}
	
		_createClass(SimulatorWorker, [{
			key: 'init',
			value: function init(population, food) {
	
				this.simulator.init(population, food);
			}
		}, {
			key: 'start',
			value: function start() {
				var _this = this;
	
				clearInterval(this.interval);
				this.interval = setInterval(function () {
					_this.step();
				}, this.delay);
			}
		}, {
			key: 'pause',
			value: function pause() {
	
				clearInterval(this.interval);
			}
		}, {
			key: 'step',
			value: function step() {
	
				try {
	
					var res = this.simulator.step()[0];
					if (res.end) {
	
						this.pause();
					}
	
					postMessage({ type: 'STEP_SUCCESS', unit: res });
				} catch (err) {
	
					this.pause();
					console.warn(err);
					postMessage({ type: 'STEP_ERROR', err: err.message });
				}
			}
		}, {
			key: 'onMessage',
			value: function onMessage(e) {
				var _e$data = e.data,
				    type = _e$data.type,
				    population = _e$data.population,
				    food = _e$data.food,
				    delay = _e$data.delay,
				    state = _e$data.state;
	
	
				switch (type) {
	
					case 'INIT':
	
						this.init(population, food);
						if (typeof delay !== 'undefined') {
							this.delay = delay;
						}
						this.start();
						break;
	
					case 'CHANGE_DELAY':
	
						this.delay = delay;
						this.pause();
						this.start();
						break;
	
					case 'CHANGE_STATE':
	
						if (state === 'paused') {
							this.pause();
						} else {
							this.start();
						}
						break;
	
					default:
						return false;
	
				}
				return true;
			}
		}]);
	
		return SimulatorWorker;
	}();
	
	exports.default = new SimulatorWorker();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _network = __webpack_require__(2);
	
	var _network2 = _interopRequireDefault(_network);
	
	var _vec2 = __webpack_require__(7);
	
	var _vec3 = _interopRequireDefault(_vec2);
	
	var _world = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NETWORK_PARAMS = function NETWORK_PARAMS(weights) {
		return {
			layers: [{
				weights: weights[0],
				length: weights[0].length,
				activateFunction: 'sigmoid'
			}, {
				weights: weights[1],
				length: weights[1].length,
				activateFunction: 'sigmoid'
			}]
		};
	};
	
	var Simulator = function () {
		function Simulator() {
			_classCallCheck(this, Simulator);
	
			this.rooms = [{
				units: [],
				foods: []
			}];
		}
	
		_createClass(Simulator, [{
			key: 'init',
			value: function init(units, foods) {
	
				this.rooms = units.map(function (u) {
					return {
						unit: _extends({}, u, {
							score: 0,
							mind: new _network2.default(NETWORK_PARAMS(u.weights)),
							life: 100,
							fine: 0,
							prevMovement: new _vec3.default(0, 0)
						}),
						foods: foods.map(function (food) {
							return new _vec3.default(food);
						})
					};
				});
			}
		}, {
			key: 'findCollisions',
			value: function findCollisions(source, end, key) {
	
				return this.rooms[key].foods.map(function (circlePoint) {
	
					var main_vector = end.sub(source);
	
					var point = circlePoint.sub(source).project(main_vector);
					var _vec = point.add(source).sub(circlePoint);
	
					var radius = _world.FOOD_RAD;
					var vec_length = _vec.length;
					var begintInter = source.sub(circlePoint).length < radius;
					var endInter = end.sub(circlePoint).length < radius;
	
					var isInterruct = vec_length < radius && _vec3.default.DotProduct(point, main_vector) >= 0 && main_vector.length >= point.length;
					var interSect = isInterruct || begintInter || endInter;
	
					if (interSect) {
	
						var projectedPoint = point.add(source);
						var ort = main_vector.multScalar(1 / main_vector.length);
						var l = Math.sqrt(radius * radius - vec_length * vec_length) * 2;
	
						var p1 = projectedPoint.sub(ort.multScalar(l / 2));
						var p2 = projectedPoint.add(ort.multScalar(l / 2));
	
						var filtered = [p1, p2].filter(function (p) {
							return (p.x >= source.x && p.x <= end.x || p.x <= source.x && p.x >= end.x) && (p.y >= source.y && p.y <= end.y || p.y <= source.y && p.y >= end.y);
						}).sort(function (a, b) {
	
							var _a = _vec3.default.Sub(a, source).length;
							var _b = _vec3.default.Sub(b, source).length;
	
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
		}, {
			key: 'processLine',
			value: function processLine(start, end, key) {
	
				var endPoints = [end].concat(this.findCollisions(start, end, key));
				var min = end.sub(start).length;
				var res = end;
				var active = false;
				endPoints.map(function (p) {
	
					if (p) {
						var length = p.sub(start).length;
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
					active: active
				};
			}
		}, {
			key: 'getUnitLines',
			value: function getUnitLines(unit, key) {
	
				var full = Math.PI * 2;
				var part = full / _world.PARTS_NUM;
				var curDeg = -part;
				var res = [];
	
				for (var i = 0; i < _world.PARTS_NUM; i++) {
	
					curDeg += part;
					var vec = new _vec3.default(Math.cos(curDeg), Math.sin(curDeg));
	
					res.push(this.processLine(new _vec3.default(unit).add(vec.multScalar(_world.UNIT_RAD)), new _vec3.default(unit).add(vec.multScalar(_world.UNIT_RAD)).add(vec.multScalar(_world.LINE_LENGTH)), key));
				}
	
				return res;
			}
		}, {
			key: 'getUnitSignals',
			value: function getUnitSignals(lines) {
	
				return lines.map(function (line) {
					return Math.round((_world.LINE_LENGTH - Math.min(line.to.sub(line.from).length, 25)) * 1000) / 1000 / _world.LINE_LENGTH;
				});
			}
		}, {
			key: 'moveUnit',
			value: function moveUnit(movement, key) {
	
				var full = Math.PI * 2;
				var part = full / _world.PARTS_NUM;
				var curDeg = -part;
				var x = 0;
				var y = 0;
	
				for (var i = 0; i < _world.PARTS_NUM; i++) {
	
					curDeg += part;
					x += movement[i] * Math.cos(curDeg) * 2;
					y += movement[i] * Math.sin(curDeg) * 2;
				}
	
				var coords = new _vec3.default(this.rooms[key].unit.x + x, this.rooms[key].unit.y + y).max(new _vec3.default(800 - _world.UNIT_RAD, 400 - _world.UNIT_RAD)).min(new _vec3.default(0 + _world.UNIT_RAD, 0 + _world.UNIT_RAD));
	
				this.rooms[key].unit = this.checkMovement(this.rooms[key].unit, x, y, coords);
	
				this.rooms[key].unit.prevMovement = new _vec3.default(x, y);
				this.rooms[key].unit.x = coords.x;
				this.rooms[key].unit.y = coords.y;
	
				return this.rooms[key].unit;
			}
		}, {
			key: 'checkMovement',
			value: function checkMovement(unit, x, y, coords) {
				var diff = Math.abs(unit.x - coords.x) + Math.abs(unit.y - coords.y);
	
				if (new _vec3.default(x, y).add(unit.prevMovement).length <= 0.05) {
					unit.fine += 1;
				} else {
					if (diff < 0.1 && diff > 0.001) {
						unit.life -= 0.5 - diff;
					}
					if (diff < 0.001) {
						if (unit.fine === 50) {
							unit.life = 0;
						} else {
							unit.fine += 1;
							unit.life -= 1;
						}
					} else {
						unit.fine = 0;
					}
				}
	
				return unit;
			}
		}, {
			key: 'checkEat',
			value: function checkEat(unit, key) {
				var _this = this;
	
				this.rooms[key].foods.map(function (food, _key) {
	
					if (_vec3.default.Sub(food, unit).length < _world.UNIT_RAD + _world.FOOD_RAD) {
	
						_this.rooms[key].foods.splice(_key, 1);
						_this.rooms[key].unit.score += 1;
						_this.rooms[key].unit.life += 40;
					}
				});
	
				return this.rooms[key].unit.score;
			}
		}, {
			key: 'step',
			value: function step() {
				var _this2 = this;
	
				return this.rooms.map(function (room, key) {
	
					var lines = _this2.getUnitLines(room.unit, key);
					var score = _this2.rooms[key].unit.score;
					if (room.unit.life > 0) {
						var signals = _this2.getUnitSignals(lines);
						var movement = room.unit.mind.process(signals);
						var movedUnit = _this2.moveUnit(movement, key);
						score = _this2.checkEat(movedUnit, key);
						_this2.rooms[key].unit.life += -0.1;
					}
	
					return {
						units: [{
							x: _this2.rooms[key].unit.x,
							y: _this2.rooms[key].unit.y,
							radius: _world.UNIT_RAD,
							lines: lines,
							score: score,
							life: _this2.rooms[key].unit.life
						}],
						food: _this2.rooms[key].foods,
						end: _this2.rooms[key].unit.life <= 0
					};
				});
			}
		}]);
	
		return Simulator;
	}();
	
	exports.default = Simulator;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _layer = __webpack_require__(3);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _activate_functions = __webpack_require__(6);
	
	var _activate_functions2 = _interopRequireDefault(_activate_functions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Network = (_temp = _class = function () {
		function Network(params) {
			_classCallCheck(this, Network);
	
			this.params = _extends({}, Network.defaultParams, params);
	
			this.layers = this.params.layers.map(function (p) {
				return new _layer2.default(p);
			});
		}
	
		_createClass(Network, [{
			key: 'addLayer',
			value: function addLayer(params) {
	
				this.layers.push(new _layer2.default(params));
			}
		}, {
			key: 'process',
			value: function process(input) {
	
				if (!this.layers.length) {
	
					// return Promise.resolve(null);
					return null;
				}
	
				// return new Promise((resolve, reject) => {
	
				for (var i = 0; i < this.layers.length; i++) {
	
					var _in = i == 0 ? input : this.layers[i - 1].signals;
					this.layers[i].process(_in);
				}
	
				return this.layers[this.layers.length - 1].signals;
	
				// });
			}
		}]);
	
		return Network;
	}(), _class.defaultParams = {
		layers: []
	}, _class.ACTIVATE_FUNCTIONS = _activate_functions2.default, _temp);
	exports.default = Network;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _neuron = __webpack_require__(4);
	
	var _neuron2 = _interopRequireDefault(_neuron);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Layer = (_temp = _class = function () {
		function Layer(params) {
			var _this = this;
	
			_classCallCheck(this, Layer);
	
			this.params = _extends({}, Layer.defaultParams, params);
	
			this.neurons = new Array(this.params.length).fill(null).map(function (n, key) {
				return new _neuron2.default({
					weights: _this.params.weights[key] || [],
					domain: _this.params.domain,
					defaultOut: _this.params.defaultOut,
					activateFunction: _this.params.activateFunction
				});
			});
	
			this.out = this.params.defaultOut;
		}
	
		_createClass(Layer, [{
			key: 'addNeuron',
			value: function addNeuron(params) {
	
				this.neurons.push(new _neuron2.default(_extends({
					weights: [],
					domain: this.params.domain,
					defaultOut: this.params.defaultOut,
					activateFunction: this.params.activateFunction
				}, params)));
			}
		}, {
			key: 'process',
			value: function process(signals) {
	
				this.out = this.neurons.map(function (neuron) {
					return neuron.process(signals);
				});
				return this.out;
			}
		}, {
			key: 'signals',
			get: function get() {
	
				return this.out;
			}
		}]);
	
		return Layer;
	}(), _class.defaultParams = {
		weights: [],
		domain: [0, 1],
		defaultOut: 0,
		activateFunction: 'threshold',
		length: 0
	}, _temp);
	exports.default = Layer;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _ready_functions = __webpack_require__(5);
	
	var _ready_functions2 = _interopRequireDefault(_ready_functions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Neuron = (_temp = _class = function () {
		function Neuron(params) {
			_classCallCheck(this, Neuron);
	
			this.params = _extends({}, Neuron.defaultParams, params);
	
			this.activationFunc = Neuron.GetActivationFunc(this.params.activateFunction);
			this.out = this.params.defaultOut;
		}
	
		_createClass(Neuron, [{
			key: 'process',
			value: function process(signals) {
	
				this.out = this.activationFunc(this.sum(signals));
				return this.out;
			}
		}, {
			key: 'sum',
			value: function sum(signals) {
	
				var sum = 0;
	
				for (var i = 0; i < signals.length; i++) {
	
					var weight = this.params.weights[i];
	
					if (!Number.isFinite(weight) || !Number.isFinite(signals[i])) {
	
						throw new Error('Signal or weight is not finite: weight ' + weight + ', signal ' + signals[i]);
					}
	
					sum += signals[i] * weight;
				}
	
				return sum;
			}
		}, {
			key: 'signal',
			get: function get() {
	
				return this.out;
			}
		}], [{
			key: 'GetActivationFunc',
			value: function GetActivationFunc(func) {
	
				switch (typeof func === 'undefined' ? 'undefined' : _typeof(func)) {
	
					case 'function':
	
						return func;
	
					case 'string':
	
						return _ready_functions2.default[func];
	
					default:
	
						throw new Error('Neuron\'s \'activateFunction\' param must be a string of function');
	
				}
			}
		}]);
	
		return Neuron;
	}(), _class.defaultParams = {
		weights: [],
		domain: [0, 1],
		defaultOut: 0,
		activateFunction: 'threshold'
	}, _temp);
	exports.default = Neuron;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _activate_functions = __webpack_require__(6);
	
	var _activate_functions2 = _interopRequireDefault(_activate_functions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var functions = {};
	
	Object.keys(_activate_functions2.default).map(function (key) {
	
		var func = function func() {};
	
		switch (key) {
	
			case 'threshold':
	
				func = _activate_functions2.default[key].bind(null, 0, 1, 0.5);
	
			case 'gisterezis':
	
				func = _activate_functions2.default[key].bind(null, 0, 1, 0.35, 0.65);
	
			case 'sigmoid':
	
				func = _activate_functions2.default[key].bind(null, 0, 1, 1);
	
		}
	
		functions[key] = func;
	});
	
	exports.default = functions;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
	
		'threshold': function threshold(min, max, t, s) {
	
			return s > t ? max : min;
		},
		'gisterezis': function gisterezis(min, max, p1, p2, s) {
	
			return s <= p1 ? min : s >= p2 ? max : min + (max - min) * ((s - p1) / (p2 - p1));
		},
		'sigmoid': function sigmoid(min, max, A, s) {
	
			return 1 / (1 + Math.exp(-A * (s - (max - min) / 2)));
		}
	
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// import { Node } from 'quantizer/state';
	// import { isMap } from '../types/types';
	
	/**
	 * Creates a new Vec2.
	 * @class
	 */
	
	var Vec2 = function () {
		function Vec2(x, y) {
			_classCallCheck(this, Vec2);
	
			if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
	
				this.set(x);
			} else {
	
				this.x = x || 0;
				this.y = y || 0;
			}
		}
	
		_createClass(Vec2, [{
			key: 'get',
	
	
			/**
	   * Get vector object.
	   *
	   * @returns { Object }
	   */
	
			value: function get() {
	
				var result = {};
	
				if (arguments.length) {
	
					for (var name in arguments[0]) {
	
						result[name] = this[name];
					}
				} else {
	
					result = {
						x: this.x,
						y: this.y
					};
				}
	
				return result;
			}
		}, {
			key: 'sub',
			value: function sub(vec2) {
	
				return Vec2.Sub(this, vec2);
			}
		}, {
			key: 'add',
			value: function add(vec2) {
	
				return Vec2.Add(this, vec2);
			}
		}, {
			key: 'mult',
			value: function mult(vec2) {
	
				return Vec2.Multiply(this, vec2);
			}
	
			/**
	   * Set vector object.
	   *
	   * @param { Object } source - Source value.
	   * @returns { Vec2 }
	   */
	
		}, {
			key: 'set',
			value: function set() {
	
				for (var name in arguments[0]) {
	
					this[name] = arguments[0][name];
				}
	
				return this;
			}
		}, {
			key: 'setX',
			value: function setX(value) {
	
				return new Vec2(value, this.y);
			}
		}, {
			key: 'setY',
			value: function setY(value) {
	
				return new Vec2(this.x, value);
			}
	
			/**
	   *  Get vector length.
	   *
	   *  @returns { Number }
	   */
	
		}, {
			key: 'multScalar',
	
	
			/**
	   *  Get modified vector by multiply coords.
	   *
	   *  @returns { Vec2 }
	   */
	
			value: function multScalar(scalar) {
	
				return new Vec2(this.x * scalar, this.y * scalar);
			}
	
			/**
	   *  Get inverted vector.
	   *
	   *  @returns { Vec2 }
	   */
	
		}, {
			key: 'invert',
			value: function invert() {
	
				return new Vec2(-this.x, -this.y);
			}
	
			/**
	   *  Get vector by x coord.
	   *
	   *  @returns { Vec2 }
	   */
	
		}, {
			key: 'invertX',
			value: function invertX() {
	
				return new Vec2(-this.x, this.y);
			}
	
			/**
	   *  Get vector by y coord.
	   *
	   *  @returns { Vec2 }
	   */
	
		}, {
			key: 'invertY',
			value: function invertY() {
	
				return new Vec2(this.x, -this.y);
			}
	
			/**
	   *  Clone vector.
	   *
	   *  @returns { Vec2 }
	   */
	
		}, {
			key: 'clone',
			value: function clone() {
	
				return new Vec2(this.x, this.y);
			}
	
			/**
	   *  Min vector.
	   *
	   * @param { Object } vec - min vector.
	   *  @returns { Vec2 }
	   */
	
		}, {
			key: 'min',
			value: function min(vec) {
	
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
	
		}, {
			key: 'normal',
			value: function normal() {
	
				return new Vec2(Math.abs(this.x), Math.abs(this.y));
			}
	
			/**
	   *  Max vector.
	   *
	   * @param { Object } vec - max vector.
	   * @returns { Vec2 }
	   */
	
		}, {
			key: 'max',
			value: function max(vec) {
	
				if (this.x > vec.x) {
	
					this.x = vec.x;
				}
	
				if (this.y > vec.y) {
	
					this.y = vec.y;
				}
	
				return this;
			}
		}, {
			key: 'fromSize',
			value: function fromSize(size) {
	
				this.set({
					x: size.w,
					y: size.h
				});
			}
		}, {
			key: 'toSize',
			value: function toSize() {
	
				return {
					w: this.x,
					h: this.y
				};
			}
		}, {
			key: 'dotProduct',
			value: function dotProduct(vec) {
	
				return Vec2.DotProduct(this, vec);
			}
		}, {
			key: 'project',
			value: function project(vec) {
	
				return Vec2.Project(this, vec);
			}
		}, {
			key: 'angle',
			value: function angle(vec) {
	
				return Vec2.Angle(this, vec);
			}
		}, {
			key: 'length',
			get: function get() {
	
				return Math.sqrt(this.x * this.x + this.y * this.y);
			}
		}], [{
			key: 'From',
			value: function From(obj) {
	
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
	
		}, {
			key: 'Add',
			value: function Add(vec1, vec2) {
	
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
	
		}, {
			key: 'Sub',
			value: function Sub(vec1, vec2) {
	
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
	
		}, {
			key: 'Multiply',
			value: function Multiply(vec1, vec2) {
	
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
	
		}, {
			key: 'Divide',
			value: function Divide(vec1, vec2) {
	
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
	
		}, {
			key: 'Distance',
			value: function Distance(vec1, vec2) {
	
				return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
			}
	
			/**
	   * Dot product
	   *
	   * @param { Vec2 } vec1 - first vector
	   * @param { Vec2 } vec2 - second vector
	   * @returns {number}
	   */
	
		}, {
			key: 'DotProduct',
			value: function DotProduct(vec1, vec2) {
	
				return vec1.x * vec2.x + vec1.y * vec2.y;
			}
	
			/**
	   * Projecting vector to vector
	   *
	   * @param { Vec2 } vec1 - first vector
	   * @param { Vec2 } vec2 - second vector
	   * @returns { Vec2 }
	   */
	
		}, {
			key: 'Project',
			value: function Project(vec1, vec2) {
	
				var d = vec2.dotProduct(vec2);
	
				if (d > 0) {
	
					var dp = vec1.dotProduct(vec2);
					var multiplier = dp / d;
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
	
		}, {
			key: 'Angle',
			value: function Angle(vec1, vec2) {
	
				return vec1.dotProduct(vec2) / (vec1.length * vec2.length);
			}
		}]);
	
		return Vec2;
	}();
	
	exports.default = Vec2;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PARTS_NUM = exports.PARTS_NUM = 15;
	var UNIT_RAD = exports.UNIT_RAD = 30;
	var FOOD_RAD = exports.FOOD_RAD = 8;
	var LINE_LENGTH = exports.LINE_LENGTH = 25;

/***/ }
/******/ ]);
//# sourceMappingURL=a4e38c1823aba5df02bc.worker.js.map