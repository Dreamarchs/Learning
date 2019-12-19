function draw_grid(ctx, minor, major, stroke, fill) { //draws a grid with specified coordinates able to take input 
    minor = minor || 10;
    major = major || minor * 5;
    stroke = stroke || "#00FF00"; // these are the two colors for the lines
    fill = fill || "#009900";
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    let width = ctx.canvas.width,
        height = ctx.canvas.height // grabs the width and height from the html page

    for (var x = 0; x < width; x += minor) { // for loop that draws the x or horizontal lines of the grid
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.lineWidth = (x % major == 0) ? 0.5 : 0.25;
        ctx.stroke();
        if (x % major == 0) { ctx.fillText(x, x, 10); }
    }

    for (var y = 0; y < height; y += minor) { // for loop that draws the y or vertical lines of the grid
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.lineWidth = (y % major == 0) ? 0.5 : 0.25;
        ctx.stroke();
        if (y % major == 0) { ctx.fillText(y, 0, y + 10); }
    }
    ctx.restore();
}

function draw_pacman(ctx, radius, mouth) { //function that draws a singular pacman from input or a default one when called

    angle = 0.2 * Math.PI * mouth;
    ctx.save();
    ctx.fillStyle = "yellow"
    ctx.strokeStyle ="black";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, angle, -angle);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    
}

function multiple_pacman() { // draws multiple pacman with different mouth "openness" doesn't take input
    var min_radius = 5;
    var max_radius = 50;

    do {
        let x = context.canvas.width * Math.random();
        let y = context.canvas.height * Math.random();
        openMouth = Math.random() * (0.2 - 0.0) + 0.0;
        closeMouth = Math.random() * (2.0 - 1.8) + 1.8;
        let radius = min_radius + (max_radius - min_radius) * Math.random();
        draw_pacman(x, y, radius, openMouth, closeMouth);


    }
    while (Math.random() < 0.9);

    context.restore();
}

function draw_ship(ctx, radius, options) {
    options = options || {};
    let angle = (options.angle || 0.5 * Math.PI) / 2 // angle is set by this line
    let curve1 = options.curve1 || 0.25;
    let curve2 = options.curve2 || 0.75;
    ctx.save();

    if(options.thruster) {
        ctx.save();
        ctx.strokeStyle = "yellow";
        ctx.fillStyle = "red";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(
            Math.cos(Math.PI + angle * 0.8) * radius / 2,
            Math.sin(Math.PI + angle * 0.8) * radius / 2
        );
        ctx.quadraticCurveTo(-radius * 2, 0,
         Math.cos(Math.PI - angle * 0.8) * radius / 2,
         Math.sin(Math.PI - angle * 0.8) * radius / 2
         )
         ctx.fill();
         ctx.stroke();
         ctx.restore();
    }
    //optionally draw a guide showing the collision radius
    if (options.guide) {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
    // setting default values
    ctx.lineWidth = options.lineWidth || 2;
    ctx.strokeStyle = options.stroke || "white";
    ctx.fillStyle = options.fill || "black";

    // draw the ship in three lines
    ctx.beginPath();
    ctx.moveTo(radius, 0); //positions front of the ship *which is to the right of the circle*
    ctx.quadraticCurveTo(
        Math.cos(angle) * radius * curve2,
        Math.sin(angle) * radius * curve2,
        Math.cos(Math.PI - angle) * radius, //these lines draw rear corners of the ship
        Math.sin(Math.PI - angle) * radius
    );
    // added a control point based on the curve variable
    ctx.quadraticCurveTo(-radius * curve1, 0,
        Math.cos(Math.PI + angle) * radius,
        Math.sin(Math.PI + angle) * radius
    );
    ctx.quadraticCurveTo(
        Math.cos(-angle) * radius * curve2,
        Math.sin(-angle) * radius * curve2,
        radius, 0
    );

    ctx.fill();
    ctx.stroke();
    // a new guide line and circle to show the control point
    if (options.guide) {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(
            Math.cos(-angle) * radius,
            Math.sin(-angle) * radius
        );
        ctx.lineTo(0, 0);
        ctx.lineTo(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius
        );
        ctx.moveTo(-radius, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(
            Math.cos(angle) * radius * curve2,
            Math.sin(angle) * radius * curve2,
            radius / 40, 0, 2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
            radius * curve1 - radius, 0,
            radius / 50, 0, 2 * Math.PI);
        ctx.fill();

    }
    ctx.restore();
}

function draw_asteroid(ctx, radius, shape, options) {
    options = options || {};
    ctx.strokeStyle = options.stroke || "white";
    ctx.fillStyle = options.fill || "black";
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < shape.length; i++) {
        ctx.rotate(2 * Math.PI / shape.length);
        ctx.lineTo(radius + radius * options.noise * shape[i], 0);
    }
    options.noise = asteroids.noise || 0.5;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if (options.guide) {
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 0.2;
        ctx.arc(0, 0, radius + radius * options.noise, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius - radius * options.noise, 0, 2 * Math.PI);
        ctx.stroke();

    }
    ctx.restore();
}

function draw_ghost(ctx, radius, options) {
    options = options || {}
    var feet = options.feet || 4;
    var head_radius = radius  * 0.8;
    var foot_radius = head_radius / feet;
    ctx.save();
    ctx.strokeStyle = options.stroke || "white";
    ctx.fillStyle = options.fill || "red";
    ctx.lineWidth = options.lineWidth || radius * 0.05;
    ctx.beginPath();
    for(foot = 0; foot < feet; foot++) {
        ctx.arc(
            (2 * foot_radius * (feet - foot)) - head_radius - foot_radius,
            radius - foot_radius,
            foot_radius, 0, Math.PI
            );
    }
    ctx.lineTo(-head_radius, radius - foot_radius);
    ctx.arc(0, head_radius - radius, head_radius, Math.PI, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(-head_radius/2.5, -head_radius/2, head_radius/3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(head_radius/3.5, -head_radius/2, head_radius/3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(-head_radius/2, -head_radius/2.2, head_radius/8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(head_radius/4, -head_radius/2.2, head_radius/8, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
    
    
}

