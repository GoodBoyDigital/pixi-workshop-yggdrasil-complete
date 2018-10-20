
import * as PIXI from 'pixi.js'
import Chain from './src/Chain'

var app = new PIXI.Application(window.innerWidth,
							  window.innerHeight,
							  {backgroundColor:0xFF6600});

document.body.appendChild(app.view);
document.body.style.margin = 0;


var target = new PIXI.Point();

app.stage.interactive = true;
app.stage.mousemove = ( e )=>{

	target.x = e.data.global.x;
	target.y = e.data.global.y;
}

app.stage.hitArea = new PIXI.Rectangle(0,0,100000, 10000)

app.stage.click = ( e )=>{

	var canvas = app.renderer.extract.canvas(chains[0]);
	document.body.appendChild(canvas);
	//console.log('hello',image)
}

var container = new PIXI.Container();

app.stage.addChild(container);

var tick = 0;

var chains = [];
var total = 100;
for (var i = 0; i < total; i++)
{
	var chain = new Chain(200 + Math.random() * 300);
	app.stage.addChild(chain);
	chain.position.set((window.innerWidth/total)*i, -140);
	chain.tint = Math.random() * 0xFFFFFF;
	chains.push(chain);
}

var text = new PIXI.Text("HELLLOOOOOOO");
app.stage.addChild(text);

var localPosition = new PIXI.Point();

app.ticker.add((dt)=>{

	tick+= 0.01;

	for (var i = 0; i < total; i++)
	{
		var chain = chains[i];

		localPosition.x = target.x - chain.x;
		localPosition.y = target.y - chain.y;

		chain.verlet.detect(localPosition);
	}
})

window.addEventListener('resize', ()=>{

	app.renderer.resize(window.innerWidth, window.innerHeight)
})