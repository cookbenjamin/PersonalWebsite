"use strict";

// fun options!

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PARTICLES_PER_FIREWORK = 300; // 100 - 400 or try 1000
var PARTICLES_PER_GOLDEN_FIREWORK = 1000; // 100 - 400 or try 1000
var FIREWORK_CHANCE = 0.005; // percentage, set to 0 and click instead
var BASE_PARTICLE_SPEED = 2; // between 0-4, controls the size of the overall fireworks
var FIREWORK_LIFESPAN = 1000; // ms
var PARTICLE_INITIAL_SPEED = 2; // 2-8

// not so fun options =\
var GRAVITY = 17;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');

var particles = [];
var disableAutoFireworks = false;
var resetDisable = 0;


var timesince = 0;
var first = true;
var loop = function loop() {

    if (!disableAutoFireworks) {
        if (timesince === 0) {
            if (first) {
                createGoldenFirework(.5 * canvas.width, .5 * canvas.height + 50);
            }
            createFirework(.5 * canvas.width, .5 * canvas.height + 50, 250, 230, 200);
        } else if (timesince === 10) {
            // createGoldenFirework(.5 * canvas.width, .5 * canvas.height, 255, 42, 104);
        } else if (timesince === 20) {
            createFirework(.5*canvas.width, .5*canvas.height, 255, 42, 104);
        } else if (timesince === 30) {
            createFirework(.5*canvas.width + 100, .5*canvas.height + 100, 198, 68, 252);
        } else if (timesince === 40) {
            createFirework(.5*canvas.width - 100, .5*canvas.height + 100, 0, 136, 255);
        } else if (timesince === 50) {
            if (first) {
                createGoldenFirework(.5 * canvas.width, .5 * canvas.height + 50);
                first = false;
            }
            createFirework(.5 * canvas.width, .5 * canvas.height + 50, 250, 230, 200);
            timesince = -700
        } else if (timesince === 45) {
            createFirework(.5*canvas.width, .5*canvas.height - 50, 255, 42, 104);
        } else if (timesince === 25) {
            createFirework(.5*canvas.width - 100, .5*canvas.height - 100, 198, 68, 252);
        } else if (timesince === 35) {
            createFirework(.5 * canvas.width + 100, .5 * canvas.height - 100, 0, 136, 255);
        }
        timesince += 1



    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.globalCompositeOperation = 'source-over';
    ctx2.fillStyle = "rgba(0,0,0,0.03)";
    ctx2.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (particle, i) {
        particle.animate();
        particle.render();
        if (particle.y > canvas.height || particle.x < 0 || particle.x > canvas.width || particle.alpha <= 0) {
            particles.splice(i, 1);
        }
    });

    requestAnimationFrame(loop);
};

var createFirework = function createFirework() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.random() * canvas.width;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.random() * canvas.height;


    var speed = Math.random() * 2 + BASE_PARTICLE_SPEED;
    var maxSpeed = speed;

    var red = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;
    var green = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var blue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    // // use brighter colours
    // red = red < 150 ? red + 150 : red;
    // green = green < 150 ? green + 150 : green;
    // blue = blue < 150 ? blue + 150 : blue;

    // inner firework
    for (var i = 0; i < PARTICLES_PER_FIREWORK; i++) {
        var particle = new Particle(x, y, red, green, blue, speed);
        particles.push(particle);

        maxSpeed = speed > maxSpeed ? speed : maxSpeed;
    }

    // outer edge particles to make the firework appear more full
    for (var _i = 0; _i < 40; _i++) {
        var _particle = new Particle(x, y, red, green, blue, maxSpeed, true);
        particles.push(_particle);
    }
};

var Particle = function () {
    function Particle() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var red = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ~~(Math.random() * 255);
        var green = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ~~(Math.random() * 255);
        var blue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ~~(Math.random() * 255);
        var speed = arguments[5];
        var isFixedSpeed = arguments[6];

        _classCallCheck(this, Particle);

        this.x = x;
        this.y = y;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = 0.05;
        this.radius = 1.5 + Math.random();
        this.angle = Math.random() * 360;
        this.speed = Math.random() * speed + 0.1;
        this.velocityX = Math.cos(this.angle) * this.speed;
        this.velocityY = Math.sin(this.angle) * this.speed;
        this.startTime = new Date().getTime();
        this.duration = Math.random() * 300 + FIREWORK_LIFESPAN;
        this.currentDiration = 0;
        this.dampening = 15; // slowing factor at the end

        this.colour = this.getColour();

        if (isFixedSpeed) {
            this.speed = speed;
            this.velocityY = Math.sin(this.angle) * this.speed;
            this.velocityX = Math.cos(this.angle) * this.speed;
        }

        this.initialVelocityX = this.velocityX;
        this.initialVelocityY = this.velocityY;
    }

    _createClass(Particle, [{
        key: 'animate',
        value: function animate() {

            this.currentDuration = new Date().getTime() - this.startTime;

            // initial speed kick
            if (this.currentDuration <= 200) {

                this.x += this.initialVelocityX * PARTICLE_INITIAL_SPEED;
                this.y += this.initialVelocityY * PARTICLE_INITIAL_SPEED;
                this.alpha += 0.01;

                this.colour = this.getColour();
            } else {

                // normal expansion
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.colour = this.getColour(this.red, this.green, this.blue, 0.4 + Math.random() * 0.3);
            }

            this.velocityY += GRAVITY / 1000;

            // slow down particles at the end
            if (this.currentDuration >= this.duration) {
                this.velocityX -= this.velocityX / this.dampening;
                this.velocityY -= this.velocityY / this.dampening;
            }

            if (this.currentDuration >= this.duration + this.duration / 1.1) {

                // sparkle out at the end
                if (Math.random() > .5) {
                    this.alpha -= 0.1;
                } else {
                    this.alpha += 0.06;
                }

                this.colour = this.getColour();
            } else {

                // fade in during expansion
                if (this.alpha < 1) {
                    this.alpha += 0.03;
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.lineWidth = this.lineWidth;
            ctx.fillStyle = this.colour;
            // ctx.shadowBlur = 8;
            // ctx.shadowColor = this.getColour(this.red + 150, this.green + 150, this.blue + 150, 1);
            ctx.fill();
        }
    }, {
        key: 'getColour',
        value: function getColour(red, green, blue, alpha) {

            return 'rgba(' + (red || this.red) + ', ' + (green || this.green) + ', ' + (blue || this.blue) + ', ' + (alpha || this.alpha) + ')';
        }
    }]);

    return Particle;
}();


var createGoldenFirework = function createGoldenFirework() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.random() * canvas.width;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.random() * canvas.height;


    var speed = Math.random() * 0.3 + BASE_PARTICLE_SPEED +2;
    if (speed < 1) {
        speed += 0.8;
    }
    var maxSpeed = speed;

    var red = 250;
    var green = 230;
    var blue = 200;

    // use brighter colours
    red = red < 150 ? red + 150 : red;
    green = green < 150 ? green + 150 : green;
    blue = blue < 150 ? blue + 150 : blue;

    // inner firework
    for (var i = 0; i < PARTICLES_PER_GOLDEN_FIREWORK; i++) {
        var particle = new GoldenParticle(x, y, red, green, blue, speed);
        particles.push(particle);

        maxSpeed = speed > maxSpeed ? speed : maxSpeed;
    }

    // outer edge particles to make the firework appear more full
    for (var _i = 0; _i < 60; _i++) {
        var _particle = new GoldenParticle(x, y, red, green, blue, maxSpeed, true);
        particles.push(_particle);
    }
};

var GoldenParticle = function () {
    function GoldenParticle() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var red = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ~~(Math.random() * 255);
        var green = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ~~(Math.random() * 255);
        var blue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ~~(Math.random() * 255);
        var speed = arguments[5];
        var isFixedSpeed = arguments[6];

        _classCallCheck(this, GoldenParticle);

        this.x = x;
        this.y = y;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = 0.05;
        this.radius = 2 + Math.random();
        this.angle = Math.random() * 360;
        this.speed = Math.random() * speed + 0.1;

        this.velocityX = Math.cos(this.angle) * this.speed;
        this.velocityY = Math.sin(this.angle) * this.speed;
        this.startTime = new Date().getTime();
        this.duration = Math.random() * 300 + FIREWORK_LIFESPAN;
        this.currentDiration = 0;
        this.dampening = 15; // slowing factor at the end
        this.colour = this.getColour();

        if (isFixedSpeed) {
            this.speed = speed;
            this.velocityY = Math.sin(this.angle) * this.speed;
            this.velocityX = Math.cos(this.angle) * this.speed;
        }

        this.initialVelocityX = this.velocityX;
        this.initialVelocityY = this.velocityY;
    }

    _createClass(GoldenParticle, [{
        key: 'animate',
        value: function animate() {

            this.currentDuration = new Date().getTime() - this.startTime;

            // initial speed kick
            if (this.currentDuration <= 400) {

                this.x += this.initialVelocityX * PARTICLE_INITIAL_SPEED;
                this.y += this.initialVelocityY * PARTICLE_INITIAL_SPEED;
                this.alpha += 0.01;

                this.colour = this.getColour(250, 250, 250, 0.8);
            } else {

                // normal expansion
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.colour = this.getColour(this.red, this.green, this.blue, 0.4 + Math.random() * 0.3);
            }

            this.velocityY += GRAVITY / 1000;

            // slow down particles at the end
            if (this.currentDuration >= this.duration - 700 && this.currentDuration < this.duration) {
                this.velocityX -= this.velocityX / this.dampening / 10;
                this.velocityY -= this.velocityY / this.dampening / 10;
            }
            if (this.currentDuration >= this.duration) {
                this.velocityX -= this.velocityX / this.dampening;
                this.velocityY -= this.velocityY / this.dampening;
            }

            if (this.currentDuration >= this.duration + this.duration / 1.1) {

                // fade out at the end
                this.alpha -= 0.05;
                this.colour = this.getColour();
            } else {

                // fade in during expansion
                if (this.alpha < 1) {
                    this.alpha += 0.03;
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {

            ctx2.beginPath();
            ctx2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx2.lineWidth = this.lineWidth;
            ctx2.fillStyle = this.colour;
            ctx2.fill();
        }
    }, {
        key: 'getColour',
        value: function getColour(red, green, blue, alpha) {

            return 'rgba(' + (red || this.red) + ', ' + (green || this.green) + ', ' + (blue || this.blue) + ', ' + (alpha || this.alpha) + ')';
        }
    }]);

    return GoldenParticle;
}();

var updateCanvasSize = function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
};

// run it!

updateCanvasSize();
$(window).resize(updateCanvasSize);
$("body").on('click', function (e) {
    // alert("clicked");
    // createFirework(e.clientX, e.clientY);
    createFirework(e.clientX, e.clientY, 250, 230, 200);
    createGoldenFirework(e.clientX, e.clientY);
    // stop fireworks when clicked, re-enable after short time
    disableAutoFireworks = true;
    clearTimeout(resetDisable);
    resetDisable = setTimeout(function () {
        disableAutoFireworks = false;
    }, 5000);
});

loop();