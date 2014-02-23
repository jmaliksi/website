/**
 * Script for handling the dandelions thingy
 * Copyright Joe Maliksi 2013
 */

// TODO need underscore
// jquery would be a nice to have
var Dandelions = function() {
	var CELL_SIZE = 20;//px
	var NULL_CELL = new VectorCell(0, 0);
	var DEBUG_VECTOR_MAP = true;

	var MAX_PARTICLES = 100;
	var _particles = [];

	var _vectorMap1 = [];
	var _vectorMap2 = [];
	var _mapWidth;
	var _mapHeight;
	var _canvas;
	var _context;

	function init() {
		_canvas = document.getElementById("dandelions");
		if (!_canvas) {
			return;
		}
		_context = _canvas.getContext("2d");
		initVectorMap();

		render();
		run();

		_canvas.addEventListener("click", function() {
			for (var i = 0; i < 1; i++) {
				 bump(Math.random() * 10000 - 5000, Math.random() * 10000 - 5000);
			}
		}, false);

		/*window.setTimeout(function() {
			for (var i = 0; i < 10; i++) {
				 bump(Math.random() * 10000 - 5000, Math.random() * 10000 - 5000);
			}
		}, 1000);*/
	}

	function initParticles() {
	}

	function initVectorMap() {
		_mapWidth = parseInt(_canvas.width / CELL_SIZE);
		_mapHeight = parseInt(_canvas.height / CELL_SIZE);
		var len = _mapWidth * _mapHeight;
		for (; --len >= 0;) {
			_vectorMap1.push(new VectorCell(0, 0));
			_vectorMap2.push(new VectorCell(0, 0));
		}
	}

	// CLASS DEFS
	function particle(x, y, dx, dy) {
		this._x = x;
		this._y = y;
		this._dx = dx;
		this.dy = dy;
	}

	function VectorCell(dx, dy) {
		this._dx = dx;
		this._dy = dy;
	}
	// END CLASS DEFS

	function run() {
		tickVectorMap();
		render();
		window.setTimeout(run, 16);
	}

	function render() {
		_context.clearRect(0, 0, _canvas.width, _canvas.height);
		if (DEBUG_VECTOR_MAP) {
			_context.strokeStyle = "#00000";
			for (var i = 0; i < _vectorMap1.length; i++) {
				_context.beginPath();
				_context.arc(
						(i % _mapWidth) * CELL_SIZE + _vectorMap1[i]._dx,
						parseInt(i / _mapWidth) * CELL_SIZE + _vectorMap1[i]._dy,
						3,
						0,
						2 * Math.PI);
				_context.stroke();
			}
		}
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
					getCell(xPart, yPart + 1)
			]);
			// TODO dampening
		}
		// swap in buffer
		for (var i = 0; i < _vectorMap1.length; i++) {
			_vectorMap1[i] = _vectorMap2[i];
		}
	}

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

	function getCellZeroedBorders(i, j) {
		if (i < 0 || i >= _mapWidth || j < 0 || j >= _mapHeight) {
			return NULL_CELL;
		}
		return _vectorMap1[j * _mapWidth + i];
	}

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

	function getCellNoBorders(i, j) {
		if (i < 0 || i >= _mapWidth || j < 0 || j >= _mapHeight) {
			return null;
		}
		return _vectorMap1[j * _mapWidth + i];
	}

	function getCell(i, j) {
		return getCellWraparound(i, j);
	}

	function moveParticles() {
		for (var i = 0; i < particles.length; i++) {
			particles[i]._x += particles[i]._dy;
			particles[i]._y += particles[i]._dy;
		}
	}

	function bump(dx, dy) {
		var index = parseInt(Math.random() * _vectorMap1.length);
		_vectorMap1[index]._dx = dx;
		_vectorMap1[index]._dy = dy;
		render();
	}

	function addParticle(particle) {
		_particles.push(particle);
		// TODO length check
	}
	
	function removeParticle(index) {
		_particles[index] = _particles.pop();
	}

	return {
		init: init,
		bump: bump
	};
}();
