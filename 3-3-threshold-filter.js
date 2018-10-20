// / budo index.js --  -t babelify

import * as PIXI from 'pixi.js';

import ThresholdFilter from './src/ThresholdFilter';

const app = new PIXI.Application(window.innerWidth,
    window.innerHeight,
    { backgroundColor: 0xFF6600 });

document.body.style.margin = 0;
document.body.appendChild(app.view);

app.stage.interactive = true;
app.stage.hitArea = new PIXI.Rectangle(0, 0, 10000, 10000);

let isDown = false;
const ratio = 0;

app.stage.mousedown = (e) =>
{
    isDown = true;
};

app.stage.mouseup = (e) =>
{
    isDown = false;
};

app.stage.mousemove = (e) =>
{
    filter.offset = e.data.global.x / window.innerWidth;
};

const scene2 = PIXI.Sprite.from('assets/other-background.jpg');

scene2.width = window.innerWidth;
scene2.height = window.innerHeight;

const scene = PIXI.Sprite.from('assets/nice-background.png');

const map = PIXI.Sprite.from('assets/spidymask.jpg');

map.width = window.innerWidth;
map.height = window.innerHeight;

const filter = new ThresholdFilter(map);

scene.filters = [filter];

app.stage.addChild(scene2);
app.stage.addChild(scene);
app.stage.addChild(map);

app.ticker.add(() =>
{

});

window.onResize = () =>
{
    app.resize(window.innerWidth, window.innerHeight);
};
