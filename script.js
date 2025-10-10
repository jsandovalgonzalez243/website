const canvas = document.getElementById("canvas");
const header = document.getElementsByTagName("header");
const footer = document.getElementsByTagName("footer");

setInterval(clock);

function clock() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 237.333;

    let radius;
    
    const ctx = canvas.getContext("2d");

    if (canvas.width > canvas.height) {
        radius = canvas.height / 2;
        centerx = (canvas.width / 2) - radius;
        centery = 0;
        }
    else {
        radius = canvas.width / 2;
        centerx = 0;
        centery = (canvas.height / 2) - radius;

    }
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    drawClock(ctx, radius);
}

function drawClock(ctx, radius) {
    ctx.arc(centerx, centery, radius, 0 , 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    drawNumbers(ctx, radius, 10);

    const now = new Date();
    let hour = now.getHours()-7;
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let millisecond = now.getMilliseconds();

    a=(hour*Math.PI/12)+(minute*Math.PI/720)+(second*Math.PI/43200)+(millisecond*Math.PI/43200000);
    drawHands (ctx, radius, a, 0.035, 0.8)

    b=((hour*Math.PI/12)+(minute*Math.PI/720)+(second*Math.PI/43200)+(millisecond*Math.PI/43200000))*10;
    drawHands (ctx, radius, b, 0.03, 0.75)

    c=((hour*Math.PI/12)+(minute*Math.PI/720)+(second*Math.PI/43200)+(millisecond*Math.PI/43200000))*1000;
    drawHands (ctx, radius, c, 0.02, 0.65)

    d=((hour*Math.PI/12)+(minute*Math.PI/720)+(second*Math.PI/43200)+(millisecond*Math.PI/43200000))*100000;
    drawHands (ctx, radius, d, 0.01, 0.55)

    ctx.beginPath();
    ctx.arc(centerx, centery, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function drawNumbers(ctx, radius, count) {
    ctx.font = radius * 1.8/count + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = 'blue';

    for(let num = 1; num <= count; num++){
        let ang = num * Math.PI / (count / 2);
        ctx.rotate(ang);
        ctx.translate(0, -radius * (1-(1/count)));
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), centerx, centery);
        ctx.rotate(ang);
        ctx.translate(0, radius * (1-(1/count)));
        ctx.rotate(-ang);
    }
}

function drawHands(ctx, radius, time, handwidth, handlength) {
    ctx.beginPath();
    ctx.lineWidth = radius * handwidth;
    ctx.lineCap = "round";
    ctx.moveTo(centerx, centery);
    ctx.translate(centerx, centery)
    ctx.rotate(time);
    ctx.translate(-centerx, -centery)
    ctx.lineTo(centerx, -radius * handlength + centery);
    ctx.stroke();
    ctx.translate(centerx, centery)
    ctx.rotate(-time);
    ctx.translate(-centerx, -centery)
    ctx.closePath();
}

clock();

window.addEventListener("resize", () => {
    clock();
}
);