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
	
	var _ui_controller = __webpack_require__(7);
	
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
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vec = __webpack_require__(4);
	
	var _vec2 = _interopRequireDefault(_vec);
	
	var _evolve = __webpack_require__(5);
	
	var _evolve2 = _interopRequireDefault(_evolve);
	
	var _simulator_worker = __webpack_require__(6);
	
	var _simulator_worker2 = _interopRequireDefault(_simulator_worker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MainController = function () {
		function MainController(opts) {
			_classCallCheck(this, MainController);
	
			this.drawer = opts.drawer;
			this.ui = opts.ui;
			this.ui.setCallback(this.actionHandler.bind(this));
	
			this.generateFood();
	
			this.options = {
				visibleUnit: 'HS',
				populationSize: 10,
				speed: 10,
				FPS: 60
			};
	
			this.evolver = new _evolve2.default({
				populationSize: this.options.populationSize,
				numberOfGenes: 450,
				numberOfWinners: 3,
				genesToMutate: 200,
				mutationRate: 0.25
			});
	
			this.current = [];
			this.workers = [];
			this.status = 'paused';
			this.populationNum = 0;
			this.prevFrame = 0;
	
			this.init();
		}
	
		_createClass(MainController, [{
			key: 'actionHandler',
			value: function actionHandler(type, value) {
	
				switch (type) {
	
					case 'options':
	
						this.options = Object.assign(this.options, value);
						if (typeof value.speed !== 'undefined') {
	
							this.setSpeed();
						}
						break;
	
					case 'play':
	
						this.setState(this.status === 'started' ? 'paused' : 'started');
						break;
	
					case 'form_options':
	
						if (value.populationSize) {
							this.options.populationSize = value.populationSize;
						}
						this.evolver.params = Object.assign(this.evolver.params, value);
						break;
	
				}
			}
		}, {
			key: 'generateFood',
			value: function generateFood() {
	
				this.food = new Array(Math.round(Math.random() * 100)).fill(null).map(function () {
	
					return new _vec2.default(Math.random() * 800, Math.random() * 400);
				});
			}
		}, {
			key: 'toMatrix',
			value: function toMatrix(data, row) {
	
				var matrix = [];
				for (var i = 0; i < data.length; i += row) {
					matrix.push(data.slice(i, i + row));
				}
				return matrix;
			}
		}, {
			key: 'toUnits',
			value: function toUnits(population) {
				var _this = this;
	
				return population.map(function (u) {
	
					return {
						x: 400,
						y: 200,
						weights: [_this.toMatrix(u.slice(0, u.length / 2), 15), _this.toMatrix(u.slice(u.length / 2, u.length), 15)]
					};
				});
			}
		}, {
			key: 'init',
			value: function init() {
	
				this.evolver.initRandomPopulation();
				this.ui.init(this);
				this.initRound();
	
				requestAnimationFrame(this.frameHandler.bind(this));
			}
		}, {
			key: 'initRound',
			value: function initRound() {
	
				var population = this.toUnits(this.evolver.population);
				this.generateFood();
	
				this.initWorkers(population, this.food);
			}
		}, {
			key: 'evolve',
			value: function evolve() {
	
				this.evolver.evolve(this.current.map(function (u) {
					return u.score;
				}));
				this.populationNum++;
			}
		}, {
			key: 'draw',
			value: function draw() {
	
				var u = this.current[this.getViewebleUnitIndex()];
				if (u) {
					this.drawer.drawFrame(u);
				}
			}
		}, {
			key: 'initWorkers',
			value: function initWorkers(units, food) {
				var _this2 = this;
	
				this.current = units.map(function (u) {
					return {
						units: [_extends({}, u, { life: 100, lines: [], score: 0 })],
						food: _this2.food
					};
				});
	
				if (units.length < this.workers.length) {
					this.workers.map(function (w, key) {
						if (key >= units.length) {
							w.terminate();
						}
					});
				}
	
				units.map(function (u, i) {
	
					if (!_this2.workers[i]) {
	
						_this2.workers[i] = new _simulator_worker2.default();
						_this2.workers[i].addEventListener('message', function (e) {
							if (e.data.type === 'STEP_SUCCESS') {
								_this2.current[i] = e.data.unit;
							}
							_this2.checkEnd();
						});
					}
	
					_this2.workers[i].postMessage({
						type: 'INIT',
						population: [u],
						food: food,
						delay: _this2.options.speed
					});
				});
			}
		}, {
			key: 'checkEnd',
			value: function checkEnd() {
	
				if (this.current.map(function (u) {
					return u.end;
				}).indexOf(false) === -1) {
	
					this.evolve();
					if (this.options.FPS === 0) {
						this.updateUI();
					}
					this.initRound();
				}
			}
		}, {
			key: 'updateUI',
			value: function updateUI() {
	
				this.ui.update({
					units: this.current.map(function (u) {
						return u.units[0];
					}),
					visible: this.options.visibleUnit,
					highlight: this.getViewebleUnitIndex(),
					populationNum: this.populationNum
				});
			}
		}, {
			key: 'frameHandler',
			value: function frameHandler() {
	
				requestAnimationFrame(this.frameHandler.bind(this));
	
				if (Date.now() - this.prevFrame > 1000 / this.options.FPS) {
	
					try {
	
						if (Date.now() % 2 === 0) {
	
							this.updateUI();
						}
						this.draw();
					} catch (err) {
	
						console.log(err);
					}
	
					this.prevFrame = Date.now();
				}
			}
		}, {
			key: 'setSpeed',
			value: function setSpeed() {
				var _this3 = this;
	
				this.workers.map(function (w) {
	
					w.postMessage({ type: 'CHANGE_DELAY', delay: _this3.options.speed });
				});
			}
		}, {
			key: 'setState',
			value: function setState(status) {
				var _this4 = this;
	
				this.status = status;
	
				this.workers.map(function (w) {
	
					w.postMessage({ type: 'CHANGE_STATE', state: _this4.status });
				});
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
		}]);
	
		return MainController;
	}();
	
	exports.default = MainController;

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Evolver = (_temp = _class = function () {
		function Evolver(params) {
			_classCallCheck(this, Evolver);
	
			this.params = _extends({}, Evolver.DEFAULT_CONFIG, params);
	
			this.population = null;
		}
	
		_createClass(Evolver, [{
			key: "initRandomPopulation",
			value: function initRandomPopulation() {
	
				var population = [];
				var _params = this.params,
				    populationSize = _params.populationSize,
				    numberOfGenes = _params.numberOfGenes;
	
	
				for (var unit = 0; unit < populationSize; unit++) {
	
					var genes = [];
	
					for (var gen = 0; gen < numberOfGenes; gen++) {
	
						genes.push(Math.random());
					}
	
					population.push(genes);
				}
	
				this.population = population;
			}
		}, {
			key: "cross",
			value: function cross(genome1, genome2) {
	
				var genomes = [genome1, genome2];
				var child = [];
	
				for (var i = 0; i < this.params.numberOfGenes; i++) {
					child.push(genomes[Math.round(Math.random())][i]);
				}
				return child;
			}
		}, {
			key: "select",
			value: function select(marks) {
	
				var marked = this.population.map(function (unit, key) {
					return { unit: unit, mark: marks[key] };
				});
				marked.sort(function (a, b) {
	
					if (a.mark > b.mark) {
						return -1;
					}
					if (a.mark < b.mark) {
						return 1;
					}
	
					return 0;
				});
	
				return marked.slice(0, this.params.numberOfWinners);
			}
		}, {
			key: "crossing",
			value: function crossing(parents) {
	
				parents = parents.map(function (obj) {
					return obj.unit;
				});
				var res = parents;
				var counter = 1;
				var _l = parents.length;
				while (res.length < this.params.populationSize) {
	
					var parent1 = parents[_l - counter % _l - 1];
					var parent2 = parents[_l - (counter + 1) % _l - 1];
					var child = this.cross(parent1, parent2);
					res.push(child);
					counter++;
				}
				return res;
			}
		}, {
			key: "mutate",
			value: function mutate(prepopulation) {
				var _this = this;
	
				return prepopulation.map(function (genome) {
	
					for (var i = 0; i < _this.params.genesToMutate; i++) {
	
						var at = Math.round(Math.random() * genome.length - 1);
						genome[at] += _this.params.mutationRate * (Math.random() > 0.5 ? 1 : -1);
					}
	
					return genome;
				});
			}
		}, {
			key: "evolve",
			value: function evolve(marks) {
	
				this.population = this.mutate(this.crossing(this.select(marks)));
	
				return this.population;
			}
		}]);
	
		return Evolver;
	}(), _class.DEFAULT_CONFIG = {
		populationSize: 10,
		numberOfGenes: 10,
		numberOfWinners: 2,
		genesToMutate: 1,
		mutationRate: 0.05
	}, _temp);
	exports.default = Evolver;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		return new Worker(__webpack_require__.p + "a4e38c1823aba5df02bc.worker.js");
	};

/***/ },
/* 7 */
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
				this.setPopulationNum(obj.populationNum);
				this.putOptions(obj.evolver.params, obj.options);
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
			value: function update(_ref) {
				var _this = this;
	
				var units = _ref.units,
				    visible = _ref.visible,
				    highlight = _ref.highlight,
				    populationNum = _ref.populationNum;
	
	
				var cont = document.querySelector('#buttons_cont');
				if (cont) {
					units.map(function (o, key) {
						var c = cont.children[key];
						if (!c || key === cont.children.length - 1) {
							c = _this.createElement(key + 1, visible === key);
							cont.insertBefore(c, cont.children[cont.children.length - 1]);
						}
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
					if (units.length < cont.children.length - 1) {
						for (var i = units.length; i < cont.children.length - 1; i++) {
							cont.children[i].remove();
						}
					}
				}
				this.setPopulationNum(populationNum);
			}
		}, {
			key: 'createElement',
			value: function createElement(i, selected) {
				var _this2 = this;
	
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
					_this2.callback('options', { visibleUnit: i });
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
				var _this3 = this;
	
				var cont = document.createElement('div');
				cont.id = 'buttons_cont';
	
				this.setStyle(cont, { textAlign: 'center' });
	
				var arr = new Array(num).fill(null).map(function (a, key) {
					return key + 1;
				});
				arr.push('HS');
				arr.map(function (i) {
	
					var el = _this3.createElement(i, selected);
					cont.appendChild(el);
				});
				document.querySelector('#interactive_container').appendChild(cont);
			}
		}, {
			key: 'putPlayPause',
			value: function putPlayPause() {
				var _this4 = this;
	
				document.querySelector('#play_btn').onclick = function () {
					_this4.callback('play');
				};
			}
		}, {
			key: 'setPopulationNum',
			value: function setPopulationNum(num) {
	
				document.querySelector('#population_num').innerHTML = 'Population: ' + num;
			}
		}, {
			key: 'putOptions',
			value: function putOptions(options, root_opt) {
				var _this5 = this;
	
				var pop_size = document.querySelector('#pop_size');
				var num_win = document.querySelector('#num_win');
				var mut_num = document.querySelector('#mut_num');
				var mut_rate = document.querySelector('#mut_rate');
				var select_fps = document.querySelector('#select_fps');
				var speed = document.querySelector('#speed');
				pop_size.value = options.populationSize;
				num_win.value = options.numberOfWinners;
				mut_num.value = options.genesToMutate;
				mut_rate.value = options.mutationRate * 100;
				select_fps.value = root_opt.FPS;
				speed.value = root_opt.speed;
				speed.onchange = function (e) {
					_this5.callback('options', { speed: parseInt(e.target.value) });
				};
				select_fps.onchange = function (e) {
					_this5.callback('options', { FPS: parseInt(e.target.value) });
				};
				pop_size.onchange = function (e) {
					num_win.max = e.target.value;
					if (num_win.value > e.target.value) {
						num_win.value = e.target.value;
					}
					_this5.callback('form_options', { populationSize: e.target.value });
				};
				num_win.onchange = function (e) {
					_this5.callback('form_options', { numberOfWinners: e.target.value });
				};
				mut_num.onchange = function (e) {
					_this5.callback('form_options', { genesToMutate: e.target.value });
				};
				mut_rate.onchange = function (e) {
					_this5.callback('form_options', { mutationRate: e.target.value / 100 });
				};
			}
		}]);
	
		return UIController;
	}();
	
	exports.default = new UIController();

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map