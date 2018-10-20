
import * as PIXI from 'pixi.js'

var app = new PIXI.Application(window.innerWidth,
							   window.innerHeight,
							   {backgroundColor:0xFF6600});

document.body.appendChild(app.view);
document.body.style.margin = 0;


var container = new PIXI.Container();

var max = 1500;

var colors = [0xFF0000, 0x00FF00, 0x0000FF];
var index = 0;

class Particle extends PIXI.Graphics
{
    constructor()
    {
        super();

        this.home = {x:0,y:0,z:0};
       
        this.rotationSpeed = (Math.random()-0.5) * 0.3;
        this.speed = {x:0, y:0};
        this.scaleOffset = ( 1 + Math.random() ) * 0.2
      
        this
        .beginFill(colors[index++%colors.length])
        .drawRect(-30,-15,60, 30)
    }
}

const particles = [];

for (var i=0; i < max; i++)
{
    var particle = new Particle();

    particle.position.x = Math.random() * window.innerWidth
    particle.position.y = Math.random() * 110640;
    
    particle.speed.x = Math.random() -0.5;
    particle.speed.y = Math.random() + 2 ;
    
    particles.push(particle);

    container.addChild(particle);
 
};

app.stage.addChild(container);

var pos = {x:0, y:0};

app.ticker.add((dt)=>{

    var focalLength = 150;
    
    var w = window.innerWidth;
    var h = window.innerHeight;

    for (var i=0; i < particles.length; i++)
	{
		var particle =  particles[i];  
        
		particle.position.x += particle.speed.x;
		particle.position.y += particle.speed.y;
        
		particle.scale.x = particle.scaleOffset;
		particle.scale.y = particle.scaleOffset * Math.sin(particle.rotation*2);

		particle.position.x %= w;
		if(particle.position.x < 0)particle.position.x += w;

		particle.position.y %= h;
		if(particle.position.y < 0)particle.position.y +=h;

		particle.rotation += particle.rotationSpeed

	};
})

window.addEventListener('resize', ()=>{

    app.renderer.resize(window.innerWidth, window.innerHeight);
    
})