/**
 * Script for handling the dandelions thingy
 * Copyright Joe Maliksi 2013
 */

var Dandelions = function() {
	var CELL_SIZE = 12;//px
	var NULL_CELL = new VectorCell(0, 0);
	var DEBUG_VECTOR_MAP = true;

	var DAMPENING = 1.0;
	var GLOBAL_FORCE = {
		_dx: 0,
		_dy: 0
	};
	var MOUSE_SENSITIVITY = 10;

	var MAX_PARTICLES = 3000;
	var _particles = [];
	var MAX_SPEED = 250;

	var _vectorMap1 = [];
	var _vectorMap2 = [];
	var _mapWidth;
	var _mapHeight;
	var _canvas;
	var _context;

	var _isMouseDown = false;
	var _prevMouseX;
	var _prevMouseY;

	var _drawBuffer;
	var _bufferContext;

	var _pause = false;

	/**
	 * Initialize dandelions app in the #dandelions canvas element. If #dandelions
	 * does not exist or is not being displayed, then we're on mobile/tablet, so don't
	 * initialize and waste resources.
	 */
	function init() {
		_canvas = $('#dandelions');
		if (!_canvas || _canvas.css('display') == 'none') {
			return;
		}
		_canvas[0].onselectstart = function() {
			return false
		};
		_context = _canvas[0].getContext("2d");

		_drawBuffer = document.createElement('canvas');
		_drawBuffer.width = _canvas[0].width;
		_drawBuffer.height = _canvas[0].height;
		_bufferContext = _drawBuffer.getContext("2d");

		initVectorMap();

		render();
		window.setInterval(run, 16);

		_canvas.dblclick(function(ev) {
			// add particles on double click
			for (var i = 0; i < 100; i++) {
				//bump(Math.random() * 10000 - 5000, Math.random() * 10000 - 5000);

				var mag = Math.random() * 25;
				var ang = Math.random() * 2 * Math.PI;

				addParticle(new Particle(
						ev.offsetX,
						ev.offsetY,
						mag * Math.cos(ang),
						mag * Math.sin(ang),
						parseInt(Math.random() * 2 + 1)));
			}
		})
		.mousedown(function() {
			_isMouseDown = true;
		})
		.mouseup(function() {
			_isMouseDown = false;
		})
		.mousemove(function(ev) {
			// if dragging, apply the movement force to the cells passed over
			if (_isMouseDown) {
				var mx = ev.offsetX;
				var my = ev.offsetY;
				var cell = _vectorMap1[
						parseInt(mx / CELL_SIZE) + 
						parseInt(my / CELL_SIZE) * _mapWidth
				];
				cell._dx = (mx - _prevMouseX) * MOUSE_SENSITIVITY;
				cell._dy = (my - _prevMouseY) * MOUSE_SENSITIVITY;
			}
			_prevMouseX = ev.offsetX;
			_prevMouseY = ev.offsetY;
		});

		$(window).resize(function() {
			_pause = _canvas.css('display') == 'none';
		});

		/*window.setTimeout(function() {
			for (var i = 0; i < 10; i++) {
				 bump(Math.random() * 10000 - 5000, Math.random() * 10000 - 5000);
			}
		}, 1000);*/
	}

	function initVectorMap() {
		_mapWidth = parseInt(_canvas[0].width / CELL_SIZE);
		_mapHeight = parseInt(_canvas[0].height / CELL_SIZE);
		var len = _mapWidth * _mapHeight;
		for (; --len >= 0;) {
			_vectorMap1.push(new VectorCell(0, 0));
			_vectorMap2.push(new VectorCell(0, 0));
		}
	}

	// CLASS DEFS
	function Particle(x, y, dx, dy, r) {
		this._x = x;
		this._y = y;
		this._dx = dx;
		this._dy = dy;
		this._r = r;
	}

	function VectorCell(dx, dy) {
		this._dx = dx;
		this._dy = dy;
	}
	// END CLASS DEFS

	/**
	 * Call this every frame to run the sim. If the resolution is small, the
	 * canvas gets hidden so pause the sim to not waste resources.
	 */
	function run() {
		if (_pause) {
			return;
		}
		tickVectorMap();
		applyVectorsToParticles();
		moveParticles();
		render();
	}

	/**
	 * Render the vector map.
	 */
	function render() {
		_bufferContext.clearRect(0, 0, _canvas[0].width, _canvas[0].height);
		if (DEBUG_VECTOR_MAP) {
			_bufferContext.strokeStyle = "#cccccc";
			// draw in back buffer
			for (var i = 0; i < _vectorMap1.length; i++) {
				_bufferContext.beginPath();
				_bufferContext.arc(
						(i % _mapWidth) * CELL_SIZE + _vectorMap1[i]._dx * 25,
						parseInt(i / _mapWidth) * CELL_SIZE + _vectorMap1[i]._dy * 25,
						//Math.sqrt(_vectorMap1[i]._dx * _vectorMap1[i]._dx + _vectorMap1[i]._dy * _vectorMap1[i]._dy) + 1,
						3,
						0,
						2 * Math.PI);
				_bufferContext.stroke();
			}
		}

		renderParticles();

		// blit back buffer to screen
		_context.clearRect(0, 0, _canvas[0].width, _canvas[0].height);
		_context.drawImage(_drawBuffer, 0, 0);
	}

	/**
	 * Time tick forward. TODO get actual time.
	 */
	function tickVectorMap() {
		// do math in a buffer;
		for (var i = 0; i < _vectorMap2.length; i++) {
			var xPart = i % _mapWidth;
			var yPart = parseInt(i / _mapWidth);
			_vectorMap2[i] = averageCells([
					getCell(xPart, yPart),
					getCell(xPart - 1, yPart),
					getCell(xPart + 1, yPart), 
					getCell(xPart, yPart - 1), 
					getCell(xPart, yPart + 1),
			]);
			//dampening
			_vectorMap2[i]._dx *= DAMPENING;
			_vectorMap2[i]._dy *= DAMPENING;
		}
		// swap in buffer
		for (var i = 0; i < _vectorMap1.length; i++) {
			_vectorMap1[i] = _vectorMap2[i];
		}
	}

	/**
	 * Simulate fluids by iterating over all cells and averaging their vectors together
	 */
	function averageCells(cells) {
		var dxSum = 0;
		var dySum = 0;
		var total = 0;
		for (var i = 0; i < cells.length; i++) {
			if (!cells[i]) {
				continue;
			}
			dxSum += cells[i]._dx;
			dySum += cells[i]._dy;
			total++;
		}
		var averagedCell = new VectorCell(dxSum * 1.0 / total, dySum * 1.0 / total);
		return averagedCell;
	}

	/**
	 * Get cell. If it is outside the bounds, return cell with a 0 vector
	 */
	function getCellZeroedBorders(i, j) {
		if (i < 0 || i >= _mapWidth || j < 0 || j >= _mapHeight) {
			return NULL_CELL;
		}
		return _vectorMap1[j * _mapWidth + i];
	}

	/**
	 * Get cell. If outside the bounds, wrap to the other side.
	 */
	function getCellWraparound(i, j) {
		if (i < 0) {
			i = _mapWidth - 1;
		} else if (i >= _mapWidth) {
			i = 0;
		}
		if (j < 0) {
			j = _mapHeight - 1;
		} else if (j >= _mapHeight) {
			j = 0;
		}

		return _vectorMap1[j * _mapWidth + i];
	}

	/**
	 * Get cell. If outside the bounds, return null.
	 */
	function getCellNoBorders(i, j) {
		if (i < 0 || i >= _mapWidth || j < 0 || j >= _mapHeight) {
			return null;
		}
		return _vectorMap1[j * _mapWidth + i];
	}

	function getCell(i, j) {
		//return getCellZeroedBorders(i, j);
		//return getCellNoBorders(i, j);
		return getCellWraparound(i, j);
	}

	/**
	 * Apply force to a random cell
	 */
	function bump(dx, dy) {
		var index = parseInt(Math.random() * _vectorMap1.length);
		_vectorMap1[index]._dx = dx;
		_vectorMap1[index]._dy = dy;
		render();
	}
	
	/**
	 * Render floaty particles
	 */
	function renderParticles() {
		_bufferContext.fillStyle = "#000000";
		for (var i = 0; i < _particles.length; i++) {
			if (!_particles[i]) {
				continue;
			}
			_bufferContext.beginPath();
			_bufferContext.arc(
				_particles[i]._x,
				_particles[i]._y,
				_particles[i]._r,
				0,
				2 * Math.PI);
			_bufferContext.fill();
		}
	}

	/**
	 * Iterate over particles and apply the fluid sim movements to them
	 */
	function applyVectorsToParticles() {
		for (var i = 0; i < _particles.length; i++) {
			if (!_particles[i]) {
				continue;
			}
			var mx = parseInt(Math.round(_particles[i]._x) / CELL_SIZE);
			var my = parseInt(Math.round(_particles[i]._y) / CELL_SIZE);
			var index = mx + my * _mapWidth;
			if (index < 0 || index >= _vectorMap1.length) {
				continue;
			}
			var cell = _vectorMap1[mx + my * _mapWidth];
			var mag = Math.random() * (2 / _particles[i]._r);
			var ang = Math.random() * 2 * Math.PI;
			_particles[i]._dx +=
					cell._dx +
					//(Math.random() - .5) * (3 / _particles[i]._r) +
					mag * Math.cos(ang) +
					GLOBAL_FORCE._dx;
			_particles[i]._dy +=
					cell._dy +
					//(Math.random() - .5) * (3 / _particles[i]._r) +
					mag * Math.sin(ang) +
					GLOBAL_FORCE._dy;
			_particles[i]._dx /= 1.5;
			_particles[i]._dy /= 1.5;
		}
	}


	/**
	 * Call every frame to animate particles
	 */
	function moveParticles() {
		for (var i = 0; i < _particles.length; i++) {
			if (!_particles[i]) {
				continue;
			}
			var dx = _particles[i]._dx;
			var dy = _particles[i]._dy;
			if (dx * dx + dy * dy > MAX_SPEED * MAX_SPEED) {
				var mag = Math.sqrt(dx * dx + dy * dy);
				dx /= mag;
				dy /= mag;
			}
			_particles[i]._x += dx;
			_particles[i]._y += dy;
		}

		for (var i = 0; i < _particles.length; i++) {
			if (!_particles[i]) {
				continue;
			}
			/*if (_particles[i]._x < 0 || _particles[i]._x >= _canvas[0].width ||
					_particles[i]._y < 0 || _particles[i]._y >= _canvas[0].height) {
				removeParticle(i);

			}*/
			if (_particles[i]._x < 0) {
				_particles[i]._x = _canvas[0].width - 1;
			}
			if (_particles[i]._x >= _canvas[0].width) {
				_particles[i]._x = 0;
			}
			if (_particles[i]._y < 0) {
				_particles[i]._y = _canvas[0].height - 1;
			}
			if (_particles[i]._y >= _canvas[0].height) {
				_particles[i]._y = 0;
			}
		}
	}

	/**
	 * Add a new particle to the system. Inserts particle into first null spot, or at
	 * the end of the list if list is contiguous. If MAX_PARTICLES is reached, does not do
	 * anything
	 */
	function addParticle(particle) {
		for (var i = 0; i < _particles.length; i++) {
			if (i >= MAX_PARTICLES) {
				return;
			}
			if (_particles[i]) {
				continue;
			}
			_particles[i] = particle;
			return;
		}
		_particles.push(particle);
	}
	
	function removeParticle(index) {
		_particles[index] = null;
	}

	return {
		init: init,
		bump: bump
	};
}();
