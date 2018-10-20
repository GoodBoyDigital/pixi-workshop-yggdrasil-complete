import * as PIXI from 'pixi.js';

const app = new PIXI.Application(window.innerWidth,
    window.innerHeight,
    { backgroundColor: 0xFF6600 });

document.body.style.margin = 0;
document.body.appendChild(app.view);
/*
 * Key Points
 * - issues not adding mask to the scense causes weirdness (it does not transform)
 * - rotating mask rect turns it back to regular masking
 */

// normal
const mask = new PIXI.Graphics()
    .beginFill(0x000000)
    .drawCircle(0, 0, 400);

const item = new PIXI.Sprite.from('assets/nice-background.png');

mask.x = window.innerWidth / 2;
mask.y = window.innerHeight / 2;

app.stage.addChild(item);
app.stage.addChild(mask);

item.mask = mask;

let tick = 0;

app.ticker.add(() =>
{
    tick += 0.1;
    mask.scale.x = 1 + Math.sin(tick) * 0.2;
    mask.scale.y = 1 + Math.cos(tick) * 0.2;
});

window.onResize = () =>
{
    app.resize(window.innerWidth, window.innerHeight);
};
