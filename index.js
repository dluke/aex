
class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	length() {
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}

	add(other) {
		return new Vector(this.x + other.x, this.y + other.y);
	}

	subtract(other) {
		return new Vector(this.x - other.x, this.y - other.y);
	}

	divide(value) {
		return new Vector(this.x / value, this.y / value);
	}

	multiply(value) {
		return new Vector(this.x * value, this.y * value);
	}

	dot(other) {
		return this.x * other.x + this.y * other.y;
	}

	cross(other) {
		return this.x * other.y - this.y * other.x;
	}

	unit() {
		return this.divide(this.length());
	}

	distance(other) {
		return this.subtract(other).length();
	}

	angle(other) {
		let u = this.unit();
		let v = other.unit();
		return Math.acos(u.dot(v));
	}

	signed_angle(other) {
		let u = this.unit();
		let v = other.unit();
		return Math.sign(u.cross(v)) * Math.acos(u.dot(v));
	}
}

// self-documenting constructors for Vector
function point(x, y) {
	return new Vector(x, y);
}

const img = document.getElementsByTagName('img')[0];
const cvs = document.querySelector('canvas');

cvs.width = img.clientWidth;
cvs.height = img.clientHeight;

const c = cvs.getContext('2d');

class Circle {
	constructor(position, r) {
		this.position = position;
		this.r = r;
		this.strokeStyle = null;
		this.fillStyle = 'rgba(255, 156, 156, 0.5)';
		this.lineWidth = 1;
	}

	setPosition(position) {
		this.position = position;
	}

	draw () {
		let pt = this.position;
		c.strokeStyle = this.strokeStyle;
		c.fillStyle = this.fillStyle;
		c.lineWidth = this.lineWidth;
		c.beginPath();
		c.arc(pt.x, pt.y, this.r, 0, 2 * Math.PI);
		if (this.fillStyle) {
			c.fill();
		}
		if (this.strokeStyle) {
			c.stroke();
		}
	}
}

let flag_update = true;

var brush_size = 65

const m_circle = new Circle(point(undefined, undefined), brush_size);
m_circle.fillStyle = null;
m_circle.strokeStyle = 'rgba(255, 255, 255, 1.0)';
m_circle.lineWidth = 2;

const brush = new Circle(point(undefined, undefined), brush_size);

let mouse = point(undefined, undefined);

// https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
function  getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect(), // abs. size of element
		scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
		scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

	return point(
		(evt.clientX - rect.left) * scaleX,
		(evt.clientY - rect.top) * scaleY
	);
}

cvs.addEventListener('mousemove', function (event) {
	mouse = getMousePos(cvs, event)
	console.log(mouse);

	flag_update = true;
});


var grid_size = Math.round(cvs.width/8);

function initialize() {
	c.fillStyle = "#5f5f5f";
	// c.fillStyle = "rgb(225, 225, 225, 255)";
	c.rect(0, 0, cvs.width, cvs.height);
	c.fill();


	c.strokeStyle = "#A1A1A1";
	// c.lineWidth = 1;

	let x = grid_size + 0.5;
	let y = grid_size + 0.5;
	while (x < cvs.width) {
		c.beginPath();
		c.moveTo(x,0);
		c.lineTo(x,cvs.height);
		c.stroke()
		x += grid_size;
	}

	while (y < cvs.height) {
		c.beginPath();
		c.moveTo(0,y);
		c.lineTo(cvs.width,y);
		c.stroke()
		y += grid_size;
	}

}

initialize();

function update() {
	c.globalCompositeOperation = "destination-out";
	brush.setPosition(mouse)
	brush.draw();
};

function animate() {
	requestAnimationFrame(animate);
	if (flag_update) {
		update();
		flag_update = false;
	}
};


animate();


// console.log('available screen', screen.availWidth, screen.availHeight);
// console.log(window.devicePixelRatio)
// console.log('available screen', screen.width, screen.height);


// window.addEventListener('resize', function () {
	// console.log('resize', screen.width, screen.height, window.devicePixelRatio);
	// img.style.height = screen.height + 'px';
	// img.style.width = screen.width + 'px';

	// img.style.height = screen.height + 'px';
	// img.style.width = screen.width + 'px';

	// img.style.height = screen.availHeight + 'px';
	// img.style.width = screen.availWidth + 'px';
	// cvs.width = window.innerWidth;
	// cvs.height = window.innerHeight;
// });

// var button = document.getElementById('fullscreen-button') 

