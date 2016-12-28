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
	
	var _ui_controller = __webpack_require__(8);
	
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
		return __webpack_require__(7)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\texports: {},\n/******/ \t\t\tid: moduleId,\n/******/ \t\t\tloaded: false\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.loaded = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"/\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t'use strict';\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t\tvalue: true\n\t});\n\t\n\tvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\t\n\tvar _simulator = __webpack_require__(1);\n\t\n\tvar _simulator2 = _interopRequireDefault(_simulator);\n\t\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\t\n\tfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\t\n\tvar SimulatorWorker = function () {\n\t\tfunction SimulatorWorker() {\n\t\t\t_classCallCheck(this, SimulatorWorker);\n\t\n\t\t\tthis.simulator = new _simulator2.default();\n\t\t\tself.addEventListener('message', this.onMessage.bind(this));\n\t\t\tthis.delay = 10;\n\t\t}\n\t\n\t\t_createClass(SimulatorWorker, [{\n\t\t\tkey: 'init',\n\t\t\tvalue: function init(population, food) {\n\t\n\t\t\t\tthis.simulator.init(population, food);\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'start',\n\t\t\tvalue: function start() {\n\t\t\t\tvar _this = this;\n\t\n\t\t\t\tclearInterval(this.interval);\n\t\t\t\tthis.interval = setInterval(function () {\n\t\t\t\t\t_this.step();\n\t\t\t\t}, this.delay);\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'pause',\n\t\t\tvalue: function pause() {\n\t\n\t\t\t\tclearInterval(this.interval);\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'step',\n\t\t\tvalue: function step() {\n\t\n\t\t\t\ttry {\n\t\n\t\t\t\t\tvar res = this.simulator.step()[0];\n\t\t\t\t\tif (res.end) {\n\t\n\t\t\t\t\t\tthis.pause();\n\t\t\t\t\t}\n\t\n\t\t\t\t\tpostMessage({ type: 'STEP_SUCCESS', unit: res });\n\t\t\t\t} catch (err) {\n\t\n\t\t\t\t\tthis.pause();\n\t\t\t\t\tconsole.warn(err);\n\t\t\t\t\tpostMessage({ type: 'STEP_ERROR', err: err.message });\n\t\t\t\t}\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'onMessage',\n\t\t\tvalue: function onMessage(e) {\n\t\t\t\tvar _e$data = e.data,\n\t\t\t\t    type = _e$data.type,\n\t\t\t\t    population = _e$data.population,\n\t\t\t\t    food = _e$data.food,\n\t\t\t\t    delay = _e$data.delay,\n\t\t\t\t    state = _e$data.state;\n\t\n\t\n\t\t\t\tswitch (type) {\n\t\n\t\t\t\t\tcase 'INIT':\n\t\n\t\t\t\t\t\tthis.init(population, food);\n\t\t\t\t\t\tif (typeof delay !== 'undefined') {\n\t\t\t\t\t\t\tthis.delay = delay;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tthis.start();\n\t\t\t\t\t\tbreak;\n\t\n\t\t\t\t\tcase 'CHANGE_DELAY':\n\t\n\t\t\t\t\t\tthis.delay = delay;\n\t\t\t\t\t\tthis.pause();\n\t\t\t\t\t\tthis.start();\n\t\t\t\t\t\tbreak;\n\t\n\t\t\t\t\tcase 'CHANGE_STATE':\n\t\n\t\t\t\t\t\tif (state === 'paused') {\n\t\t\t\t\t\t\tthis.pause();\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tthis.start();\n\t\t\t\t\t\t}\n\t\t\t\t\t\tbreak;\n\t\n\t\t\t\t\tdefault:\n\t\t\t\t\t\treturn false;\n\t\n\t\t\t\t}\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}]);\n\t\n\t\treturn SimulatorWorker;\n\t}();\n\t\n\texports.default = new SimulatorWorker();\n\n/***/ },\n/* 1 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t'use strict';\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t\tvalue: true\n\t});\n\texports.default = undefined;\n\t\n\tvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\t\n\tvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\t\n\tvar _network = __webpack_require__(2);\n\t\n\tvar _network2 = _interopRequireDefault(_network);\n\t\n\tvar _vec2 = __webpack_require__(7);\n\t\n\tvar _vec3 = _interopRequireDefault(_vec2);\n\t\n\tvar _world = __webpack_require__(8);\n\t\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\t\n\tfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\t\n\tvar NETWORK_PARAMS = function NETWORK_PARAMS(weights) {\n\t\treturn {\n\t\t\tlayers: [{\n\t\t\t\tweights: weights[0],\n\t\t\t\tlength: weights[0].length,\n\t\t\t\tactivateFunction: 'sigmoid'\n\t\t\t}, {\n\t\t\t\tweights: weights[1],\n\t\t\t\tlength: weights[1].length,\n\t\t\t\tactivateFunction: 'sigmoid'\n\t\t\t}]\n\t\t};\n\t};\n\t\n\tvar Simulator = function () {\n\t\tfunction Simulator() {\n\t\t\t_classCallCheck(this, Simulator);\n\t\n\t\t\tthis.rooms = [{\n\t\t\t\tunits: [],\n\t\t\t\tfoods: []\n\t\t\t}];\n\t\t}\n\t\n\t\t_createClass(Simulator, [{\n\t\t\tkey: 'init',\n\t\t\tvalue: function init(units, foods) {\n\t\n\t\t\t\tthis.rooms = units.map(function (u) {\n\t\t\t\t\treturn {\n\t\t\t\t\t\tunit: _extends({}, u, {\n\t\t\t\t\t\t\tscore: 0,\n\t\t\t\t\t\t\tmind: new _network2.default(NETWORK_PARAMS(u.weights)),\n\t\t\t\t\t\t\tlife: 100,\n\t\t\t\t\t\t\tfine: 0,\n\t\t\t\t\t\t\tprevMovement: new _vec3.default(0, 0)\n\t\t\t\t\t\t}),\n\t\t\t\t\t\tfoods: foods.map(function (food) {\n\t\t\t\t\t\t\treturn new _vec3.default(food);\n\t\t\t\t\t\t})\n\t\t\t\t\t};\n\t\t\t\t});\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'findCollisions',\n\t\t\tvalue: function findCollisions(source, end, key) {\n\t\n\t\t\t\treturn this.rooms[key].foods.map(function (circlePoint) {\n\t\n\t\t\t\t\tvar main_vector = end.sub(source);\n\t\n\t\t\t\t\tvar point = circlePoint.sub(source).project(main_vector);\n\t\t\t\t\tvar _vec = point.add(source).sub(circlePoint);\n\t\n\t\t\t\t\tvar radius = _world.FOOD_RAD;\n\t\t\t\t\tvar vec_length = _vec.length;\n\t\t\t\t\tvar begintInter = source.sub(circlePoint).length < radius;\n\t\t\t\t\tvar endInter = end.sub(circlePoint).length < radius;\n\t\n\t\t\t\t\tvar isInterruct = vec_length < radius && _vec3.default.DotProduct(point, main_vector) >= 0 && main_vector.length >= point.length;\n\t\t\t\t\tvar interSect = isInterruct || begintInter || endInter;\n\t\n\t\t\t\t\tif (interSect) {\n\t\n\t\t\t\t\t\tvar projectedPoint = point.add(source);\n\t\t\t\t\t\tvar ort = main_vector.multScalar(1 / main_vector.length);\n\t\t\t\t\t\tvar l = Math.sqrt(radius * radius - vec_length * vec_length) * 2;\n\t\n\t\t\t\t\t\tvar p1 = projectedPoint.sub(ort.multScalar(l / 2));\n\t\t\t\t\t\tvar p2 = projectedPoint.add(ort.multScalar(l / 2));\n\t\n\t\t\t\t\t\tvar filtered = [p1, p2].filter(function (p) {\n\t\t\t\t\t\t\treturn (p.x >= source.x && p.x <= end.x || p.x <= source.x && p.x >= end.x) && (p.y >= source.y && p.y <= end.y || p.y <= source.y && p.y >= end.y);\n\t\t\t\t\t\t}).sort(function (a, b) {\n\t\n\t\t\t\t\t\t\tvar _a = _vec3.default.Sub(a, source).length;\n\t\t\t\t\t\t\tvar _b = _vec3.default.Sub(b, source).length;\n\t\n\t\t\t\t\t\t\tif (_a > _b) {\n\t\t\t\t\t\t\t\treturn 1;\n\t\t\t\t\t\t\t}\n\t\n\t\t\t\t\t\t\tif (_a > _b) {\n\t\t\t\t\t\t\t\treturn -1;\n\t\t\t\t\t\t\t}\n\t\n\t\t\t\t\t\t\treturn 0;\n\t\t\t\t\t\t})[0];\n\t\n\t\t\t\t\t\tif (filtered) {\n\t\n\t\t\t\t\t\t\treturn filtered;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\n\t\t\t\t\treturn false;\n\t\t\t\t});\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'processLine',\n\t\t\tvalue: function processLine(start, end, key) {\n\t\n\t\t\t\tvar endPoints = [end].concat(this.findCollisions(start, end, key));\n\t\t\t\tvar min = end.sub(start).length;\n\t\t\t\tvar res = end;\n\t\t\t\tvar active = false;\n\t\t\t\tendPoints.map(function (p) {\n\t\n\t\t\t\t\tif (p) {\n\t\t\t\t\t\tvar length = p.sub(start).length;\n\t\t\t\t\t\tif (length < min) {\n\t\t\t\t\t\t\tactive = true;\n\t\t\t\t\t\t\tmin = length;\n\t\t\t\t\t\t\tres = p;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\treturn p;\n\t\t\t\t});\n\t\t\t\treturn {\n\t\t\t\t\tfrom: start,\n\t\t\t\t\tto: res,\n\t\t\t\t\tactive: active\n\t\t\t\t};\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'getUnitLines',\n\t\t\tvalue: function getUnitLines(unit, key) {\n\t\n\t\t\t\tvar full = Math.PI * 2;\n\t\t\t\tvar part = full / _world.PARTS_NUM;\n\t\t\t\tvar curDeg = -part;\n\t\t\t\tvar res = [];\n\t\n\t\t\t\tfor (var i = 0; i < _world.PARTS_NUM; i++) {\n\t\n\t\t\t\t\tcurDeg += part;\n\t\t\t\t\tvar vec = new _vec3.default(Math.cos(curDeg), Math.sin(curDeg));\n\t\n\t\t\t\t\tres.push(this.processLine(new _vec3.default(unit).add(vec.multScalar(_world.UNIT_RAD)), new _vec3.default(unit).add(vec.multScalar(_world.UNIT_RAD)).add(vec.multScalar(_world.LINE_LENGTH)), key));\n\t\t\t\t}\n\t\n\t\t\t\treturn res;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'getUnitSignals',\n\t\t\tvalue: function getUnitSignals(lines) {\n\t\n\t\t\t\treturn lines.map(function (line) {\n\t\t\t\t\treturn Math.round((_world.LINE_LENGTH - Math.min(line.to.sub(line.from).length, 25)) * 1000) / 1000 / _world.LINE_LENGTH;\n\t\t\t\t});\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'moveUnit',\n\t\t\tvalue: function moveUnit(movement, key) {\n\t\n\t\t\t\tvar full = Math.PI * 2;\n\t\t\t\tvar part = full / _world.PARTS_NUM;\n\t\t\t\tvar curDeg = -part;\n\t\t\t\tvar x = 0;\n\t\t\t\tvar y = 0;\n\t\n\t\t\t\tfor (var i = 0; i < _world.PARTS_NUM; i++) {\n\t\n\t\t\t\t\tcurDeg += part;\n\t\t\t\t\tx += movement[i] * Math.cos(curDeg) * 2;\n\t\t\t\t\ty += movement[i] * Math.sin(curDeg) * 2;\n\t\t\t\t}\n\t\n\t\t\t\tvar coords = new _vec3.default(this.rooms[key].unit.x + x, this.rooms[key].unit.y + y).max(new _vec3.default(800 - _world.UNIT_RAD, 400 - _world.UNIT_RAD)).min(new _vec3.default(0 + _world.UNIT_RAD, 0 + _world.UNIT_RAD));\n\t\n\t\t\t\tthis.rooms[key].unit = this.checkMovement(this.rooms[key].unit, x, y, coords);\n\t\n\t\t\t\tthis.rooms[key].unit.prevMovement = new _vec3.default(x, y);\n\t\t\t\tthis.rooms[key].unit.x = coords.x;\n\t\t\t\tthis.rooms[key].unit.y = coords.y;\n\t\n\t\t\t\treturn this.rooms[key].unit;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'checkMovement',\n\t\t\tvalue: function checkMovement(unit, x, y, coords) {\n\t\t\t\tvar diff = Math.abs(unit.x - coords.x) + Math.abs(unit.y - coords.y);\n\t\n\t\t\t\tif (new _vec3.default(x, y).add(unit.prevMovement).length <= 0.05) {\n\t\t\t\t\tunit.fine += 1;\n\t\t\t\t} else {\n\t\t\t\t\tif (diff < 0.1 && diff > 0.001) {\n\t\t\t\t\t\tunit.life -= 0.5 - diff;\n\t\t\t\t\t}\n\t\t\t\t\tif (diff < 0.001) {\n\t\t\t\t\t\tif (unit.fine === 50) {\n\t\t\t\t\t\t\tunit.life = 0;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tunit.fine += 1;\n\t\t\t\t\t\t\tunit.life -= 1;\n\t\t\t\t\t\t}\n\t\t\t\t\t} else {\n\t\t\t\t\t\tunit.fine = 0;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\n\t\t\t\treturn unit;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'checkEat',\n\t\t\tvalue: function checkEat(unit, key) {\n\t\t\t\tvar _this = this;\n\t\n\t\t\t\tthis.rooms[key].foods.map(function (food, _key) {\n\t\n\t\t\t\t\tif (_vec3.default.Sub(food, unit).length < _world.UNIT_RAD + _world.FOOD_RAD) {\n\t\n\t\t\t\t\t\t_this.rooms[key].foods.splice(_key, 1);\n\t\t\t\t\t\t_this.rooms[key].unit.score += 1;\n\t\t\t\t\t\t_this.rooms[key].unit.life += 40;\n\t\t\t\t\t}\n\t\t\t\t});\n\t\n\t\t\t\treturn this.rooms[key].unit.score;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'step',\n\t\t\tvalue: function step() {\n\t\t\t\tvar _this2 = this;\n\t\n\t\t\t\treturn this.rooms.map(function (room, key) {\n\t\n\t\t\t\t\tvar lines = _this2.getUnitLines(room.unit, key);\n\t\t\t\t\tvar score = _this2.rooms[key].unit.score;\n\t\t\t\t\tif (room.unit.life > 0) {\n\t\t\t\t\t\tvar signals = _this2.getUnitSignals(lines);\n\t\t\t\t\t\tvar movement = room.unit.mind.process(signals);\n\t\t\t\t\t\tvar movedUnit = _this2.moveUnit(movement, key);\n\t\t\t\t\t\tscore = _this2.checkEat(movedUnit, key);\n\t\t\t\t\t\t_this2.rooms[key].unit.life += -0.1;\n\t\t\t\t\t}\n\t\n\t\t\t\t\treturn {\n\t\t\t\t\t\tunits: [{\n\t\t\t\t\t\t\tx: _this2.rooms[key].unit.x,\n\t\t\t\t\t\t\ty: _this2.rooms[key].unit.y,\n\t\t\t\t\t\t\tradius: _world.UNIT_RAD,\n\t\t\t\t\t\t\tlines: lines,\n\t\t\t\t\t\t\tscore: score,\n\t\t\t\t\t\t\tlife: _this2.rooms[key].unit.life\n\t\t\t\t\t\t}],\n\t\t\t\t\t\tfood: _this2.rooms[key].foods,\n\t\t\t\t\t\tend: _this2.rooms[key].unit.life <= 0\n\t\t\t\t\t};\n\t\t\t\t});\n\t\t\t}\n\t\t}]);\n\t\n\t\treturn Simulator;\n\t}();\n\t\n\texports.default = Simulator;\n\n/***/ },\n/* 2 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t'use strict';\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t\tvalue: true\n\t});\n\texports.default = undefined;\n\t\n\tvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\t\n\tvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\t\n\tvar _class, _temp;\n\t\n\tvar _layer = __webpack_require__(3);\n\t\n\tvar _layer2 = _interopRequireDefault(_layer);\n\t\n\tvar _activate_functions = __webpack_require__(6);\n\t\n\tvar _activate_functions2 = _interopRequireDefault(_activate_functions);\n\t\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\t\n\tfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\t\n\tvar Network = (_temp = _class = function () {\n\t\tfunction Network(params) {\n\t\t\t_classCallCheck(this, Network);\n\t\n\t\t\tthis.params = _extends({}, Network.defaultParams, params);\n\t\n\t\t\tthis.layers = this.params.layers.map(function (p) {\n\t\t\t\treturn new _layer2.default(p);\n\t\t\t});\n\t\t}\n\t\n\t\t_createClass(Network, [{\n\t\t\tkey: 'addLayer',\n\t\t\tvalue: function addLayer(params) {\n\t\n\t\t\t\tthis.layers.push(new _layer2.default(params));\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'process',\n\t\t\tvalue: function process(input) {\n\t\n\t\t\t\tif (!this.layers.length) {\n\t\n\t\t\t\t\t// return Promise.resolve(null);\n\t\t\t\t\treturn null;\n\t\t\t\t}\n\t\n\t\t\t\t// return new Promise((resolve, reject) => {\n\t\n\t\t\t\tfor (var i = 0; i < this.layers.length; i++) {\n\t\n\t\t\t\t\tvar _in = i == 0 ? input : this.layers[i - 1].signals;\n\t\t\t\t\tthis.layers[i].process(_in);\n\t\t\t\t}\n\t\n\t\t\t\treturn this.layers[this.layers.length - 1].signals;\n\t\n\t\t\t\t// });\n\t\t\t}\n\t\t}]);\n\t\n\t\treturn Network;\n\t}(), _class.defaultParams = {\n\t\tlayers: []\n\t}, _class.ACTIVATE_FUNCTIONS = _activate_functions2.default, _temp);\n\texports.default = Network;\n\n/***/ },\n/* 3 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t'use strict';\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t\tvalue: true\n\t});\n\texports.default = undefined;\n\t\n\tvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\t\n\tvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\t\n\tvar _class, _temp;\n\t\n\tvar _neuron = __webpack_require__(4);\n\t\n\tvar _neuron2 = _interopRequireDefault(_neuron);\n\t\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\t\n\tfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\t\n\tvar Layer = (_temp = _class = function () {\n\t\tfunction Layer(params) {\n\t\t\tvar _this = this;\n\t\n\t\t\t_classCallCheck(this, Layer);\n\t\n\t\t\tthis.params = _extends({}, Layer.defaultParams, params);\n\t\n\t\t\tthis.neurons = new Array(this.params.length).fill(null).map(function (n, key) {\n\t\t\t\treturn new _neuron2.default({\n\t\t\t\t\tweights: _this.params.weights[key] || [],\n\t\t\t\t\tdomain: _this.params.domain,\n\t\t\t\t\tdefaultOut: _this.params.defaultOut,\n\t\t\t\t\tactivateFunction: _this.params.activateFunction\n\t\t\t\t});\n\t\t\t});\n\t\n\t\t\tthis.out = this.params.defaultOut;\n\t\t}\n\t\n\t\t_createClass(Layer, [{\n\t\t\tkey: 'addNeuron',\n\t\t\tvalue: function addNeuron(params) {\n\t\n\t\t\t\tthis.neurons.push(new _neuron2.default(_extends({\n\t\t\t\t\tweights: [],\n\t\t\t\t\tdomain: this.params.domain,\n\t\t\t\t\tdefaultOut: this.params.defaultOut,\n\t\t\t\t\tactivateFunction: this.params.activateFunction\n\t\t\t\t}, params)));\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'process',\n\t\t\tvalue: function process(signals) {\n\t\n\t\t\t\tthis.out = this.neurons.map(function (neuron) {\n\t\t\t\t\treturn neuron.process(signals);\n\t\t\t\t});\n\t\t\t\treturn this.out;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'signals',\n\t\t\tget: function get() {\n\t\n\t\t\t\treturn this.out;\n\t\t\t}\n\t\t}]);\n\t\n\t\treturn Layer;\n\t}(), _class.defaultParams = {\n\t\tweights: [],\n\t\tdomain: [0, 1],\n\t\tdefaultOut: 0,\n\t\tactivateFunction: 'threshold',\n\t\tlength: 0\n\t}, _temp);\n\texports.default = Layer;\n\n/***/ },\n/* 4 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t'use strict';\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t\tvalue: true\n\t});\n\texports.default = undefined;\n\t\n\tvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\t\n\tvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\t\n\tvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\t\n\tvar _class, _temp;\n\t\n\tvar _ready_functions = __webpack_require__(5);\n\t\n\tvar _ready_functions2 = _interopRequireDefault(_ready_functions);\n\t\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\t\n\tfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\t\n\tvar Neuron = (_temp = _class = function () {\n\t\tfunction Neuron(params) {\n\t\t\t_classCallCheck(this, Neuron);\n\t\n\t\t\tthis.params = _extends({}, Neuron.defaultParams, params);\n\t\n\t\t\tthis.activationFunc = Neuron.GetActivationFunc(this.params.activateFunction);\n\t\t\tthis.out = this.params.defaultOut;\n\t\t}\n\t\n\t\t_createClass(Neuron, [{\n\t\t\tkey: 'process',\n\t\t\tvalue: function process(signals) {\n\t\n\t\t\t\tthis.out = this.activationFunc(this.sum(signals));\n\t\t\t\treturn this.out;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'sum',\n\t\t\tvalue: function sum(signals) {\n\t\n\t\t\t\tvar sum = 0;\n\t\n\t\t\t\tfor (var i = 0; i < signals.length; i++) {\n\t\n\t\t\t\t\tvar weight = this.params.weights[i];\n\t\n\t\t\t\t\tif (!Number.isFinite(weight) || !Number.isFinite(signals[i])) {\n\t\n\t\t\t\t\t\tthrow new Error('Signal or weight is not finite: weight ' + weight + ', signal ' + signals[i]);\n\t\t\t\t\t}\n\t\n\t\t\t\t\tsum += signals[i] * weight;\n\t\t\t\t}\n\t\n\t\t\t\treturn sum;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'signal',\n\t\t\tget: function get() {\n\t\n\t\t\t\treturn this.out;\n\t\t\t}\n\t\t}], [{\n\t\t\tkey: 'GetActivationFunc',\n\t\t\tvalue: function GetActivationFunc(func) {\n\t\n\t\t\t\tswitch (typeof func === 'undefined' ? 'undefined' : _typeof(func)) {\n\t\n\t\t\t\t\tcase 'function':\n\t\n\t\t\t\t\t\treturn func;\n\t\n\t\t\t\t\tcase 'string':\n\t\n\t\t\t\t\t\treturn _ready_functions2.default[func];\n\t\n\t\t\t\t\tdefault:\n\t\n\t\t\t\t\t\tthrow new Error('Neuron\\'s \\'activateFunction\\' param must be a string of function');\n\t\n\t\t\t\t}\n\t\t\t}\n\t\t}]);\n\t\n\t\treturn Neuron;\n\t}(), _class.defaultParams = {\n\t\tweights: [],\n\t\tdomain: [0, 1],\n\t\tdefaultOut: 0,\n\t\tactivateFunction: 'threshold'\n\t}, _temp);\n\texports.default = Neuron;\n\n/***/ },\n/* 5 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t'use strict';\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t\tvalue: true\n\t});\n\t\n\tvar _activate_functions = __webpack_require__(6);\n\t\n\tvar _activate_functions2 = _interopRequireDefault(_activate_functions);\n\t\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\t\n\tvar functions = {};\n\t\n\tObject.keys(_activate_functions2.default).map(function (key) {\n\t\n\t\tvar func = function func() {};\n\t\n\t\tswitch (key) {\n\t\n\t\t\tcase 'threshold':\n\t\n\t\t\t\tfunc = _activate_functions2.default[key].bind(null, 0, 1, 0.5);\n\t\n\t\t\tcase 'gisterezis':\n\t\n\t\t\t\tfunc = _activate_functions2.default[key].bind(null, 0, 1, 0.35, 0.65);\n\t\n\t\t\tcase 'sigmoid':\n\t\n\t\t\t\tfunc = _activate_functions2.default[key].bind(null, 0, 1, 1);\n\t\n\t\t}\n\t\n\t\tfunctions[key] = func;\n\t});\n\t\n\texports.default = functions;\n\n/***/ },\n/* 6 */\n/***/ function(module, exports) {\n\n\t'use strict';\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t\tvalue: true\n\t});\n\texports.default = {\n\t\n\t\t'threshold': function threshold(min, max, t, s) {\n\t\n\t\t\treturn s > t ? max : min;\n\t\t},\n\t\t'gisterezis': function gisterezis(min, max, p1, p2, s) {\n\t\n\t\t\treturn s <= p1 ? min : s >= p2 ? max : min + (max - min) * ((s - p1) / (p2 - p1));\n\t\t},\n\t\t'sigmoid': function sigmoid(min, max, A, s) {\n\t\n\t\t\treturn 1 / (1 + Math.exp(-A * (s - (max - min) / 2)));\n\t\t}\n\t\n\t};\n\n/***/ },\n/* 7 */\n/***/ function(module, exports) {\n\n\t'use strict';\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t\tvalue: true\n\t});\n\t\n\tvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\t\n\tvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\t\n\tfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\t\n\t// import { Node } from 'quantizer/state';\n\t// import { isMap } from '../types/types';\n\t\n\t/**\n\t * Creates a new Vec2.\n\t * @class\n\t */\n\t\n\tvar Vec2 = function () {\n\t\tfunction Vec2(x, y) {\n\t\t\t_classCallCheck(this, Vec2);\n\t\n\t\t\tif ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {\n\t\n\t\t\t\tthis.set(x);\n\t\t\t} else {\n\t\n\t\t\t\tthis.x = x || 0;\n\t\t\t\tthis.y = y || 0;\n\t\t\t}\n\t\t}\n\t\n\t\t_createClass(Vec2, [{\n\t\t\tkey: 'get',\n\t\n\t\n\t\t\t/**\n\t   * Get vector object.\n\t   *\n\t   * @returns { Object }\n\t   */\n\t\n\t\t\tvalue: function get() {\n\t\n\t\t\t\tvar result = {};\n\t\n\t\t\t\tif (arguments.length) {\n\t\n\t\t\t\t\tfor (var name in arguments[0]) {\n\t\n\t\t\t\t\t\tresult[name] = this[name];\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\n\t\t\t\t\tresult = {\n\t\t\t\t\t\tx: this.x,\n\t\t\t\t\t\ty: this.y\n\t\t\t\t\t};\n\t\t\t\t}\n\t\n\t\t\t\treturn result;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'sub',\n\t\t\tvalue: function sub(vec2) {\n\t\n\t\t\t\treturn Vec2.Sub(this, vec2);\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'add',\n\t\t\tvalue: function add(vec2) {\n\t\n\t\t\t\treturn Vec2.Add(this, vec2);\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'mult',\n\t\t\tvalue: function mult(vec2) {\n\t\n\t\t\t\treturn Vec2.Multiply(this, vec2);\n\t\t\t}\n\t\n\t\t\t/**\n\t   * Set vector object.\n\t   *\n\t   * @param { Object } source - Source value.\n\t   * @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'set',\n\t\t\tvalue: function set() {\n\t\n\t\t\t\tfor (var name in arguments[0]) {\n\t\n\t\t\t\t\tthis[name] = arguments[0][name];\n\t\t\t\t}\n\t\n\t\t\t\treturn this;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'setX',\n\t\t\tvalue: function setX(value) {\n\t\n\t\t\t\treturn new Vec2(value, this.y);\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'setY',\n\t\t\tvalue: function setY(value) {\n\t\n\t\t\t\treturn new Vec2(this.x, value);\n\t\t\t}\n\t\n\t\t\t/**\n\t   *  Get vector length.\n\t   *\n\t   *  @returns { Number }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'multScalar',\n\t\n\t\n\t\t\t/**\n\t   *  Get modified vector by multiply coords.\n\t   *\n\t   *  @returns { Vec2 }\n\t   */\n\t\n\t\t\tvalue: function multScalar(scalar) {\n\t\n\t\t\t\treturn new Vec2(this.x * scalar, this.y * scalar);\n\t\t\t}\n\t\n\t\t\t/**\n\t   *  Get inverted vector.\n\t   *\n\t   *  @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'invert',\n\t\t\tvalue: function invert() {\n\t\n\t\t\t\treturn new Vec2(-this.x, -this.y);\n\t\t\t}\n\t\n\t\t\t/**\n\t   *  Get vector by x coord.\n\t   *\n\t   *  @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'invertX',\n\t\t\tvalue: function invertX() {\n\t\n\t\t\t\treturn new Vec2(-this.x, this.y);\n\t\t\t}\n\t\n\t\t\t/**\n\t   *  Get vector by y coord.\n\t   *\n\t   *  @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'invertY',\n\t\t\tvalue: function invertY() {\n\t\n\t\t\t\treturn new Vec2(this.x, -this.y);\n\t\t\t}\n\t\n\t\t\t/**\n\t   *  Clone vector.\n\t   *\n\t   *  @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'clone',\n\t\t\tvalue: function clone() {\n\t\n\t\t\t\treturn new Vec2(this.x, this.y);\n\t\t\t}\n\t\n\t\t\t/**\n\t   *  Min vector.\n\t   *\n\t   * @param { Object } vec - min vector.\n\t   *  @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'min',\n\t\t\tvalue: function min(vec) {\n\t\n\t\t\t\tif (this.x < vec.x) {\n\t\n\t\t\t\t\tthis.x = vec.x;\n\t\t\t\t}\n\t\n\t\t\t\tif (this.y < vec.y) {\n\t\n\t\t\t\t\tthis.y = vec.y;\n\t\t\t\t}\n\t\n\t\t\t\treturn this;\n\t\t\t}\n\t\n\t\t\t/**\n\t   *  Normalize vector.\n\t   *\n\t   *  @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'normal',\n\t\t\tvalue: function normal() {\n\t\n\t\t\t\treturn new Vec2(Math.abs(this.x), Math.abs(this.y));\n\t\t\t}\n\t\n\t\t\t/**\n\t   *  Max vector.\n\t   *\n\t   * @param { Object } vec - max vector.\n\t   * @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'max',\n\t\t\tvalue: function max(vec) {\n\t\n\t\t\t\tif (this.x > vec.x) {\n\t\n\t\t\t\t\tthis.x = vec.x;\n\t\t\t\t}\n\t\n\t\t\t\tif (this.y > vec.y) {\n\t\n\t\t\t\t\tthis.y = vec.y;\n\t\t\t\t}\n\t\n\t\t\t\treturn this;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'fromSize',\n\t\t\tvalue: function fromSize(size) {\n\t\n\t\t\t\tthis.set({\n\t\t\t\t\tx: size.w,\n\t\t\t\t\ty: size.h\n\t\t\t\t});\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'toSize',\n\t\t\tvalue: function toSize() {\n\t\n\t\t\t\treturn {\n\t\t\t\t\tw: this.x,\n\t\t\t\t\th: this.y\n\t\t\t\t};\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'dotProduct',\n\t\t\tvalue: function dotProduct(vec) {\n\t\n\t\t\t\treturn Vec2.DotProduct(this, vec);\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'project',\n\t\t\tvalue: function project(vec) {\n\t\n\t\t\t\treturn Vec2.Project(this, vec);\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'angle',\n\t\t\tvalue: function angle(vec) {\n\t\n\t\t\t\treturn Vec2.Angle(this, vec);\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'length',\n\t\t\tget: function get() {\n\t\n\t\t\t\treturn Math.sqrt(this.x * this.x + this.y * this.y);\n\t\t\t}\n\t\t}], [{\n\t\t\tkey: 'From',\n\t\t\tvalue: function From(obj) {\n\t\n\t\t\t\treturn new Vec2().set(obj);\n\t\t\t}\n\t\n\t\t\t/**\n\t   * Summary two vectors.\n\t   *\n\t   * @static\n\t   * @param { Vec2 } vec1 - first vector\n\t   * @param { Vec2 } vec2 - second vector\n\t   * @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'Add',\n\t\t\tvalue: function Add(vec1, vec2) {\n\t\n\t\t\t\treturn new Vec2(vec1.x + vec2.x, vec1.y + vec2.y);\n\t\t\t}\n\t\n\t\t\t/**\n\t   * Subvector two vectors.\n\t   *\n\t   * @static\n\t   * @param { Vec2 } vec1 - first vector\n\t   * @param { Vec2 } vec2 - second vector\n\t   * @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'Sub',\n\t\t\tvalue: function Sub(vec1, vec2) {\n\t\n\t\t\t\treturn new Vec2(vec1.x - vec2.x, vec1.y - vec2.y);\n\t\t\t}\n\t\n\t\t\t/**\n\t   * Multiply two vectors.\n\t   *\n\t   * @static\n\t   * @param { Vec2 } vec1 - first vector\n\t   * @param { Vec2 } vec2 - second vector\n\t   * @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'Multiply',\n\t\t\tvalue: function Multiply(vec1, vec2) {\n\t\n\t\t\t\treturn new Vec2(vec1.x * vec2.x, vec1.y * vec2.y);\n\t\t\t}\n\t\n\t\t\t/**\n\t   * Divide 2 argument vectors.\n\t   *\n\t   * @static\n\t   * @param { Vec2 } vec1 - first vector\n\t   * @param { Vec2 } vec2 - second vector\n\t   * @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'Divide',\n\t\t\tvalue: function Divide(vec1, vec2) {\n\t\n\t\t\t\treturn new Vec2(vec1.x / vec2.x, vec1.y / vec2.y);\n\t\t\t}\n\t\n\t\t\t/**\n\t   * Distance between 2 argument vectors.\n\t   *\n\t   * @static\n\t   * @param { Vec2 } vec1 - first vector\n\t   * @param { Vec2 } vec2 - second vector\n\t   * @returns { Number }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'Distance',\n\t\t\tvalue: function Distance(vec1, vec2) {\n\t\n\t\t\t\treturn Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));\n\t\t\t}\n\t\n\t\t\t/**\n\t   * Dot product\n\t   *\n\t   * @param { Vec2 } vec1 - first vector\n\t   * @param { Vec2 } vec2 - second vector\n\t   * @returns {number}\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'DotProduct',\n\t\t\tvalue: function DotProduct(vec1, vec2) {\n\t\n\t\t\t\treturn vec1.x * vec2.x + vec1.y * vec2.y;\n\t\t\t}\n\t\n\t\t\t/**\n\t   * Projecting vector to vector\n\t   *\n\t   * @param { Vec2 } vec1 - first vector\n\t   * @param { Vec2 } vec2 - second vector\n\t   * @returns { Vec2 }\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'Project',\n\t\t\tvalue: function Project(vec1, vec2) {\n\t\n\t\t\t\tvar d = vec2.dotProduct(vec2);\n\t\n\t\t\t\tif (d > 0) {\n\t\n\t\t\t\t\tvar dp = vec1.dotProduct(vec2);\n\t\t\t\t\tvar multiplier = dp / d;\n\t\t\t\t\treturn vec2.multScalar(multiplier);\n\t\t\t\t}\n\t\t\t\treturn new Vec2(0, 0);\n\t\t\t}\n\t\n\t\t\t/**\n\t   * Get angle between two vectors\n\t   *\n\t   * @param { Vec2 } vec1 - first vector\n\t   * @param { Vec2 } vec2 - second vector\n\t   * @returns {number}\n\t   */\n\t\n\t\t}, {\n\t\t\tkey: 'Angle',\n\t\t\tvalue: function Angle(vec1, vec2) {\n\t\n\t\t\t\treturn vec1.dotProduct(vec2) / (vec1.length * vec2.length);\n\t\t\t}\n\t\t}]);\n\t\n\t\treturn Vec2;\n\t}();\n\t\n\texports.default = Vec2;\n\n/***/ },\n/* 8 */\n/***/ function(module, exports) {\n\n\t\"use strict\";\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t  value: true\n\t});\n\tvar PARTS_NUM = exports.PARTS_NUM = 15;\n\tvar UNIT_RAD = exports.UNIT_RAD = 30;\n\tvar FOOD_RAD = exports.FOOD_RAD = 8;\n\tvar LINE_LENGTH = exports.LINE_LENGTH = 25;\n\n/***/ }\n/******/ ]);\n//# sourceMappingURL=a4e38c1823aba5df02bc.worker.js.map", __webpack_require__.p + "a4e38c1823aba5df02bc.worker.js");
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string
	
	var URL = window.URL || window.webkitURL;
	module.exports = function(content, url) {
		try {
			try {
				var blob;
				try { // BlobBuilder = Deprecated, but widely implemented
					var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
					blob = new BlobBuilder();
					blob.append(content);
					blob = blob.getBlob();
				} catch(e) { // The proposed API
					blob = new Blob([content]);
				}
				return new Worker(URL.createObjectURL(blob));
			} catch(e) {
				return new Worker('data:application/javascript,' + encodeURIComponent(content));
			}
		} catch(e) {
			return new Worker(url);
		}
	}

/***/ },
/* 8 */
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