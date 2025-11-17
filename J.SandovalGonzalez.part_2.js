
const canvas = document.querySelector('canvas');

const footer = document.getElementById('footer');

const ctx = canvas.getContext('2d');

canvasWidth = window.innerWidth;
canvas.width = canvasWidth;
canvasHeight = window.innerHeight - 25;
canvas.height = canvasHeight;

const array = [];

const arrayLength = 200;

for (let i = 0; i < arrayLength; i++) {
    let particle = {
        x: Math.floor(Math.random() * (canvas.width - 30)) + 15,
        y: Math.floor(Math.random() * (canvas.height - 30)) + 15,
        color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
        radius: Math.floor(Math.random() * 11) + 5,
        dx: Math.random() * 1 - 0.5,
        dy: Math.random() * 1 - 0.5
    };
    array.push(particle);
}

function draw(x, y, color, radius) {

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function update(i) {
    array[i].x += array[i].dx;
    array[i].y += array[i].dy;

    if (array[i].x + array[i].radius > canvasWidth) {
        array[i].dx *= -1;
    }

    if (array[i].x - array[i].radius < 0) {
        array[i].dx *= -1;
    }

    if (array[i].y + array[i].radius > canvasHeight || array[i].y - array[i].radius < 0) {
        array[i].dy *= -1;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < array.length; i++) {
        update(i);
        draw(array[i].x, array[i].y, array[i].color, array[i].radius);
    }

    requestAnimationFrame(animate);
}

function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvas.width = canvasWidth;
    canvasHeight = window.innerHeight - 25;
    canvas.height = canvasHeight;

    //IDK how to move particles outside of the screen back inside.
}

window.addEventListener('resize', resizeCanvas);

animate();