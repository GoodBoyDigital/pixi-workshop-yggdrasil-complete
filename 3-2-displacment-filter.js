// / budo index.js --  -t babelify

import * as PIXI from 'pixi.js';

import BlobFilter from './src/BlobFilter';

const app = new PIXI.Application(window.innerWidth,
							   window.innerHeight,
							   { backgroundColor: 0xFF6600 });

document.body.style.margin = 0;
document.body.appendChild(app.view);

const blobContainer = new PIXI.Container();

app.stage.addChild(blobContainer);
app.stage.interactive = true;
app.stage.hitArea = new PIXI.Rectangle(0, 0, 10000, 10000);
const drops = [];
const dropPool = [];

const scene = PIXI.Sprite.from('assets/nice-background.png');

const displamentContainer = new PIXI.Container();

let isDown = false;

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
    if (!isDown) return;

    let drop = dropPool.pop();

    if (!drop)
    {
        drop = new PIXI.Sprite.from('assets/Can-1.png');
        drop.anchor.set(0.5);
    }

    drops.push(drop);

    displamentContainer.addChild(drop);

    drop.scale.set(1);
    drop.alpha = 1;
    drop.x = e.data.global.x;
    drop.y = e.data.global.y;
};

// app.stage.addChild(displamentContainer);

const texture = PIXI.RenderTexture.create(window.innerWidth, window.innerHeight);
const map = PIXI.Sprite.from(texture);

app.stage.addChild(scene);
app.stage.addChild(map);

const filter = new PIXI.filters.DisplacementFilter(map);

filter.scale.x = 1000;
filter.scale.y = 1000;
scene.filters = [filter];

const bg = new PIXI.Graphics()
    .beginFill(0x808080)
    .drawRect(0, 0, window.innerWidth, window.innerHeight);

displamentContainer.addChild(bg);
app.ticker.add(() =>
{
    app.renderer.render(displamentContainer, texture);
    for (let i = 0; i < drops.length; i++)
    {
        const drop = drops[i];

        drop.scale.x += 0.1;
        drop.scale.y += 0.1;

        drop.alpha *= 0.96;

        drop.rotation += 0.1;
        if (drop.alpha < 0.001)
        {
            drops.splice(i, 1);
            i--;
            dropPool.push(drop);

            displamentContainer.removeChild(drop);
        }
    }
});

window.onResize = () =>
{
    app.resize(window.innerWidth, window.innerHeight);
};
