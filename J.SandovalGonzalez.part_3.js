const canvas = document.querySelector('canvas');

const footer = document.getElementById('footer');

const ctx = canvas.getContext('2d');

canvasWidth = window.innerWidth;
canvas.width = canvasWidth;
canvasHeight = window.innerHeight - 25;
canvas.height = canvasHeight;

const array = [];
const mouse = {x:-500, y:-500};

const arrayLength = 200;

for (let i = 0; i < arrayLength; i++) {
    setRadius = Math.floor(Math.random() * 11) + 5;
    
    let particle = {
        x: Math.floor(Math.random() * (canvas.width - 30)) + 15,
        y: Math.floor(Math.random() * (canvas.height - 30)) + 15,
        color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
        radiusmin: setRadius,
        radius: setRadius,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1
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

    if (array[i].x + array[i].radius > canvas.width || array[i].x - array[i].radius < 0) {
        array[i].dx *= -1;
    }

    if (array[i].y + array[i].radius > canvas.height || array[i].y - array[i].radius < 0) {
        array[i].dy *= -1;
    }

    distance = Math.sqrt(Math.pow(array[i].x - mouse.x, 2) + Math.pow(array[i].y - mouse.y, 2));
    if (distance < 50 && array[i].radius < array[i].radiusmin * 2.5) {
        array[i].radius += 1;
    }
    else if (distance < 50) {
        array[i].radius = array[i].radiusmin * 2.5;
        moveParticles();
    }
    else if (array[i].radius > array[i].radiusmin) {
        array[i].radius -= 1;
    }
    else {
        array[i].radius = array[i].radiusmin;
    }

    //also moves particles in a resize event so i don't have to add this to resizeCanvas
    moveParticles();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
}

function trackMouse(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function moveParticles() {
    for (let i = 0; i < array.length; i++) {
        if (array[i].x - array[i].radius < 0) {
            array[i].x = array[i].radius;
        }
        else if (array[i].x + array[i].radius > canvas.width) {
            array[i].x = canvas.width - array[i].radius;
        }
        if (array[i].y - array[i].radius < 0) {
            array[i].y = array[i].radius;
        }
        else if (array[i].y + array[i].radius > canvas.height) {
            array[i].y = canvas.height - array[i].radius;
        }
    }
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', trackMouse);

animate();