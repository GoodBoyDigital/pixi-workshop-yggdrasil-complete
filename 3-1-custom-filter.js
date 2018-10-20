/// budo index.js --  -t babelify

import * as PIXI from 'pixi.js'

import BlobFilter from './src/BlobFilter'

var app = new PIXI.Application(window.innerWidth,
							   window.innerHeight,
							   {backgroundColor : 0xFF6600});

document.body.style.margin = 0;
document.body.appendChild(app.view);

var blobContainer = new PIXI.Container();
var blobs = [];

var target = new PIXI.Point();

app.stage.addChild(blobContainer);
app.stage.interactive = true;
app.stage.mousemove = (e) => {

	target.x = e.data.global.x
	target.y = e.data.global.y
}

for (var i = 0; i < 50; i++)
{
    const blob = new PIXI.Sprite.fromImage( 'assets/blob.png' );

    blobs.push(blob);

    blob.anchor.set(0.5);
    blob.count = Math.random() * Math.PI * 2;
    blobContainer.addChild(blob);
};

app.ticker.add( (delta) => {

	for (var i = 0; i < blobs.length; i++)
    {
        var blob = blobs[i];
        blob.count+=0.1;
        var s = Math.sin(blob.count * 0.5);

        blob.scale.set(s)
        blob.alpha = 0.9;

        if(blob.count > Math.PI * 2)
        {
            blob.count -= Math.PI * 2;

            var pos = Math.random() * Math.PI * 2;
            var rad = 100 + Math.random() * 100;

            blob.x = target.x + Math.sin(pos) * rad;
            blob.y = target.y + Math.cos(pos) * rad;
        }
    };
});

blobContainer.filters  = [new BlobFilter()];

window.onResize = () => {

	app.resize(window.innerWidth,window.innerHeight);

}