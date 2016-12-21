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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _drawer = __webpack_require__(2);
	
	var _drawer2 = _interopRequireDefault(_drawer);
	
	var _main = __webpack_require__(3);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _ui_controller = __webpack_require__(11);
	
	var _ui_controller2 = _interopRequireDefault(_ui_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.PARTS_NUM = 15;
	window.UNIT_RAD = 30;
	window.FOOD_RAD = 8;
	window.LINE_LENGTH = 25;
	
	window.drawer = new _drawer2.default(document.getElementById('canvas'));;
	window.MainController = new _main2.default({ drawer: drawer, ui: _ui_controller2.default });

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CanvasDrawer = function () {
		function CanvasDrawer(canvas) {
			_classCallCheck(this, CanvasDrawer);
	
			this.params = {
				width: canvas.width,
				height: canvas.height
			};
	
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
	
		_createClass(CanvasDrawer, [{
			key: 'drawCanvasLine',
			value: function drawCanvasLine(source, end, color) {
	
				this.ctx.strokeStyle = color;
				this.ctx.beginPath();
				this.ctx.moveTo(source.x, source.y);
				this.ctx.lineTo(end.x, end.y);
				this.ctx.stroke();
			}
		}, {
			key: 'drawFrame',
			value: function drawFrame(frameData) {
	
				this.clear();
	
				this.ctx.strokeStyle = '#40484f';
				this.ctx.fillStyle = '#0abe55';
	
				frameData.units.map(this.drawUnit.bind(this));
	
				frameData.food.map(this.drawFoodItem.bind(this));
			}
		}, {
			key: 'drawUnit',
			value: function drawUnit(unit) {
				var _this = this;
	
				var x = unit.x,
				    y = unit.y,
				    score = unit.score,
				    lines = unit.lines;
	
	
				this.ctx.beginPath();
				var radius = UNIT_RAD;
	
				this.ctx.font = "24px Arial";
				this.ctx.textAlign = "center";
				this.ctx.textBaseline = "middle";
				this.ctx.strokeStyle = 'black';
				this.ctx.fillText(score, unit.x, unit.y);
				this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
				this.ctx.stroke();
	
				lines.map(function (line) {
					return _this.drawCanvasLine(line.from, line.to, line.active ? 'green' : 'black');
				});
			}
		}, {
			key: 'drawFoodItem',
			value: function drawFoodItem(item) {
				var x = item.x,
				    y = item.y;
	
	
				this.ctx.beginPath();
				var radius = FOOD_RAD;
	
				this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
				this.ctx.fill();
			}
		}, {
			key: 'clear',
			value: function clear() {
	
				this.ctx.clearRect(0, 0, this.params.width, this.params.height);
			}
		}]);
	
		return CanvasDrawer;
	}();
	
	exports.default = CanvasDrawer;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _simulator = __webpack_require__(4);
	
	var _simulator2 = _interopRequireDefault(_simulator);
	
	var _vec = __webpack_require__(10);
	
	var _vec2 = _interopRequireDefault(_vec);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MainController = function () {
		function MainController(opts) {
			_classCallCheck(this, MainController);
	
			this.drawer = opts.drawer;
			this.ui = opts.ui;
			this.ui.setCallback(this.actionHandler.bind(this));
	
			this.population = [];
			this.simulator = new _simulator2.default();
			this.food = new Array(Math.round(Math.random() * 100)).fill(null).map(function () {
	
				return new _vec2.default(Math.random() * 800, Math.random() * 400);
			});
	
			this.options = {
				visibleUnit: 'HS',
				populationSize: 10
			};
	
			this.current = [];
			this.status = 'paused';
	
			this.init();
		}
	
		_createClass(MainController, [{
			key: 'actionHandler',
			value: function actionHandler(type, value) {
	
				switch (type) {
	
					case 'options':
	
						this.options = Object.assign(this.options, value);
	
						if (typeof value.visibleUnit != 'undefined') {
	
							this.draw();
							this.ui.update(this.current.map(function (u) {
								return u.units[0];
							}, this.options.visibleUnit));
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
		}, {
			key: 'init',
			value: function init(t) {
	
				this.population = new Array(this.options.populationSize).fill(null).map(function () {
					return {
						x: 400,
						y: 200,
						weights: [new Array(15).fill(null).map(function () {
							return new Array(15).fill(null).map(function () {
								return Math.random();
							});
						}), new Array(15).fill(null).map(function () {
							return new Array(15).fill(null).map(function () {
								return Math.random();
							});
						})]
					};
				});
	
				this.simulator.init(this.population, this.food);
				this.ui.init(this);
				this.start(t);
			}
		}, {
			key: 'draw',
			value: function draw() {
	
				this.drawer.drawFrame(this.current[this.getViewebleUnitIndex()]);
			}
		}, {
			key: 'getViewebleUnitIndex',
			value: function getViewebleUnitIndex() {
	
				if (this.options.visibleUnit === 'HS') {
					var i = this.current.filter(function (u) {
						return u.units[0].life > 0;
					}).sort(function (a, b) {
	
						if (a.units[0].score > b.units[0].score) {
							return -1;
						}
						if (a.units[0].score < b.units[0].score) {
							return 1;
						}
						return 0;
					})[0];
					return this.current.indexOf(i);
				}
	
				return this.options.visibleUnit - 1;
			}
		}, {
			key: 'start',
			value: function start(t) {
				var _this = this;
	
				this.status = 'started';
				clearInterval(this.interval);
				this.interval = setInterval(function () {
					_this.step();
				}, t || 10);
			}
		}, {
			key: 'pause',
			value: function pause() {
	
				this.status = 'paused';
				clearInterval(this.interval);
			}
		}, {
			key: 'step',
			value: function step() {
	
				this.current = this.simulator.step();
				this.ui.update(this.current.map(function (u) {
					return u.units[0];
				}), this.options.visibleUnit, this.getViewebleUnitIndex());
				if (this.current.map(function (u) {
					return u.end;
				}).indexOf(false) === -1) {
	
					this.pause();
				} else {
	
					this.draw();
				}
			}
		}]);
	
		return MainController;
	}();
	
	exports.default = MainController;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _network = __webpack_require__(5);
	
	var _network2 = _interopRequireDefault(_network);
	
	var _vec2 = __webpack_require__(10);
	
	var _vec3 = _interopRequireDefault(_vec2);
	
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
							life: 100
						}),
						foods: foods.map(function (food) {
							return food;
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
	
					var radius = FOOD_RAD;
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
				var part = full / PARTS_NUM;
				var curDeg = -part;
				var res = [];
	
				for (var i = 0; i < PARTS_NUM; i++) {
	
					curDeg += part;
					var vec = new _vec3.default(Math.cos(curDeg), Math.sin(curDeg));
	
					res.push(this.processLine(new _vec3.default(unit).add(vec.multScalar(UNIT_RAD)), new _vec3.default(unit).add(vec.multScalar(UNIT_RAD)).add(vec.multScalar(LINE_LENGTH)), key));
				}
	
				return res;
			}
		}, {
			key: 'getUnitSignals',
			value: function getUnitSignals(lines) {
	
				return lines.map(function (line) {
					return Math.round((LINE_LENGTH - Math.min(line.to.sub(line.from).length, 25)) * 1000) / 1000 / LINE_LENGTH;
				});
			}
		}, {
			key: 'moveUnit',
			value: function moveUnit(movement, key) {
	
				var full = Math.PI * 2;
				var part = full / PARTS_NUM;
				var curDeg = -part;
				var x = 0;
				var y = 0;
	
				for (var i = 0; i < PARTS_NUM; i++) {
	
					curDeg += part;
					x += movement[i] * Math.cos(curDeg) * 2;
					y += movement[i] * Math.sin(curDeg) * 2;
				}
	
				var coords = new _vec3.default(this.rooms[key].unit.x + x, this.rooms[key].unit.y + y).max(new _vec3.default(800 - UNIT_RAD, 400 - UNIT_RAD)).min(new _vec3.default(0 + UNIT_RAD, 0 + UNIT_RAD));
	
				var diff = Math.abs(this.rooms[key].unit.x - coords.x) + Math.abs(this.rooms[key].unit.y - coords.y);
	
				if (diff < 0.1 && diff > 0) {
					this.rooms[key].unit.life -= 0.5 - diff;
				} else if (diff === 0) {
					this.rooms[key].unit.life -= 1;
				}
	
				this.rooms[key].unit.x = coords.x;
				this.rooms[key].unit.y = coords.y;
	
				return this.rooms[key].unit;
			}
		}, {
			key: 'checkEat',
			value: function checkEat(unit, key) {
				var _this = this;
	
				this.rooms[key].foods.map(function (food, _key) {
	
					if (_vec3.default.Sub(food, unit).length < UNIT_RAD + FOOD_RAD) {
	
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
							radius: UNIT_RAD,
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _layer = __webpack_require__(6);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _activate_functions = __webpack_require__(9);
	
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _neuron = __webpack_require__(7);
	
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
/* 7 */
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
	
	var _ready_functions = __webpack_require__(8);
	
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _activate_functions = __webpack_require__(9);
	
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
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var UIController = function () {
		function UIController() {
			_classCallCheck(this, UIController);
	
			this.callback = function () {};
		}
	
		_createClass(UIController, [{
			key: 'init',
			value: function init(obj) {
	
				this.putButtons(obj.options.visibleUnit, obj.options.populationSize, obj.current.map(function (u) {
					return u.unit;
				}));
				this.putPlayPause();
			}
		}, {
			key: 'setCallback',
			value: function setCallback(func) {
	
				this.callback = func;
			}
		}, {
			key: 'setStyle',
			value: function setStyle(node, style) {
	
				for (var i in style) {
	
					node.style[i] = style[i];
				}
			}
		}, {
			key: 'update',
			value: function update(obj, visible, highlight) {
	
				var cont = document.querySelector('#buttons_cont');
				if (cont) {
					obj.map(function (o, key) {
						var c = cont.children[key];
						var life = Math.max(Math.min(o.life, 100), 0);
						var btn = c.children[0];
						var graph = c.children[1];
						var color = 'rgb(' + Math.round(255 - life / 100 * 255) + ', ' + Math.round(life / 100 * 255) + ', 0)';
						btn.style.color = visible === key + 1 ? 'green' : 'black';
						btn.style.fontWeight = visible === key + 1 ? 'bold' : 'normal';
						btn.style.backgroundColor = highlight === key ? 'lightblue' : 'transparent';
						graph.style.height = life / 2 + 'px';
						graph.style.backgroundColor = color;
						graph.innerHTML = o.score;
					});
				}
			}
		}, {
			key: 'createElement',
			value: function createElement(i, selected) {
				var _this = this;
	
				var style = {
					border: '1px solid black',
					fontSize: '16px',
					width: '30px',
					height: '30px',
					color: 'black',
					lineHeight: '30px',
					cursor: 'pointer',
					fontWeight: 'normal'
				};
	
				var selStyle = {
					color: 'green',
					fontWeight: 'bold'
				};
	
				var cont = document.createElement('div');
				cont.id = i;
				this.setStyle(cont, {
					display: 'inline-block',
					marginLeft: '-1px'
				});
				var el = document.createElement('div');
				this.setStyle(el, Object.assign({}, style, selected === i ? selStyle : {}));
				el.innerText = i;
				el.onclick = function () {
					_this.callback('options', { visibleUnit: i });
				};
	
				cont.appendChild(el);
	
				var score = document.createElement('div');
				score.innerHTML = 0;
				this.setStyle(score, {
					height: '50px',
					width: '100%',
					backgroundColor: 'green'
				});
	
				cont.appendChild(score);
	
				return cont;
			}
		}, {
			key: 'putButtons',
			value: function putButtons(selected, num) {
				var _this2 = this;
	
				var cont = document.createElement('div');
				cont.id = 'buttons_cont';
				document.body.appendChild(cont);
	
				this.setStyle(cont, { textAlign: 'center' });
	
				var arr = new Array(num).fill(null).map(function (a, key) {
					return key + 1;
				});
				arr.push('HS');
				arr.map(function (i) {
	
					var el = _this2.createElement(i, selected);
					cont.appendChild(el);
				});
			}
		}, {
			key: 'putPlayPause',
			value: function putPlayPause() {
				var _this3 = this;
	
				var btn = document.createElement('div');
				btn.id = 'play';
				btn.innerHTML = 'Play/Pause';
				this.setStyle(btn, {
					width: '100px',
					margin: '20px auto',
					cursor: 'pointer'
				});
				btn.onclick = function () {
					_this3.callback('play');
				};
	
				document.body.appendChild(btn);
			}
		}]);
	
		return UIController;
	}();
	
	exports.default = new UIController();

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map