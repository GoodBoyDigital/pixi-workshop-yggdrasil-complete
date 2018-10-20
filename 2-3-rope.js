
import * as PIXI from 'pixi.js'

var app = new PIXI.Application(window.innerWidth,
    window.innerHeight,
    {backgroundColor:0x000000});
document.body.appendChild(app.view);

var count = 0;

// build a rope!
var ropeLength = 918 / 20;

var points = [];

for (var i = 0; i < 20; i++) {
    points.push(new PIXI.Point(i * ropeLength, 0));
}

var strip = new PIXI.mesh.Rope(PIXI.Texture.from('assets/snake.png'), points);

strip.x = -459;

var snakeContainer = new PIXI.Container();
snakeContainer.x = window.innerWidth/2;
snakeContainer.y =  window.innerHeight/2;

app.stage.addChild(snakeContainer);

snakeContainer.addChild(strip);

app.ticker.add(function() {

    count += 0.1;

    // make the snake
    for (var i = 0; i < points.length; i++) {
        points[i].y = Math.sin((i * 0.5) + count) * 30;
        points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
    }
});
