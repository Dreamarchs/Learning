function draw_grid(ctx, minor, major, stroke, fill) { //draws a grid with specified coordinates able to take input 
    minor = minor || 10;
    major = major || minor * 5;
    stroke = stroke || "#00FF00"; // these are the two colors for the lines
    fill = fill || "#009900";
    ctx.save();
    ctx.strokeStyle = stroke; 
    ctx.fillStyle = fill;
    let width = ctx.canvas.width, height = ctx.canvas.height // grabs the width and height from the html page

for(var x=0; x< width; x+=minor) { // for loop that draws the x or horizontal lines of the grid
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.lineWidth = (x % major == 0) ? 0.5 : 0.25;
    ctx.stroke();
    if(x % major == 0 ) {ctx.fillText(x, x, 10);}
}

for(var y=0; y< height; y+=minor) { // for loop that draws the y or vertical lines of the grid
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.lineWidth = (y % major == 0) ? 0.5 : 0.25;
    ctx.stroke();
    if(y % major == 0 ) {ctx.fillText(y, 0, y + 10);}
}
ctx.restore();
}

function draw_pacman(x, y, radius, openMouth, theRandom) { //function that draws a singular pacman from input or a default one when called

    x = x || 200;
    y = y || 200;
    radius = radius || 0.2; 
    theRandom = theRandom || Math.random();
    
 
    context.beginPath();
    
    context.arc(x, y, radius, openMouth * Math.PI, theRandom * Math.PI);
    context.lineTo(x, y);
    context.fillStyle = "#FFFF00";
    context.fill();
    context.closePath();
    context.stroke();

context.restore(); 
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
        while(Math.random() < 0.9);

    context.restore();
    }