/// budo index.js --  -t babelify

var PIXI = require('pixi.js')

var app = new PIXI.Application(window.innerWidth,
							   window.innerHeight,
							   {backgroundColor : 0xFF6600});

document.body.style.margin = 0;
document.body.appendChild(app.view);

app.ticker.add( (delta) => {


});

window.onResize = () => {

	app.resize(window.innerWidth,window.innerHeight);

}