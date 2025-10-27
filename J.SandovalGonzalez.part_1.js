
const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let particle = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    color: '#F00',
    radius: 10,
    dx: 1,
    dy: 1
};

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    ctx.closePath();
}

function update() {
    particle.x += particle.dx;
    particle.y += particle.dy;

    if (particle.x + particle.radius > canvasWidth || particle.x - particle.radius < 0) {
        particle.dx *= -1;
    }
    if (particle.y + particle.radius > canvasHeight || particle.y - particle.radius < 0) {
        particle.dy *= -1;
    }
}

function animate() {
    update();
    draw();

    requestAnimationFrame(animate);
}

function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvas.width = canvasWidth;
    canvasHeight = window.innerHeight;
    canvas.height = canvasHeight;

    particle.x = canvasWidth / 2;
    particle.y = canvasHeight / 2;
}

window.addEventListener('resize', resizeCanvas);

animate();