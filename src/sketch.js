var noise = require("@giuliandrimba/noise");
var Particle = require("./particle");

var ctx = undefined;
var env = undefined;
var particles = [];
var NUM_PARTICLES = 5;

exports.setup = function(_ctx, _env){
  ctx = _ctx;
  env = _env;

  NUM_PARTICLES *= ctx.canvas.width / 1024;

  background("#fff");
  addParticles();
}

exports.draw = function() {
  particles.map(function(p){
    p.draw(ctx);
  })

  for(var i = 0; i < NUM_PARTICLES; i++) {
    if(!particles[i].DEAD)
      return
  }

  env.done()
}

function addParticles(){
  for(var i = 0; i < NUM_PARTICLES; i++) {
    var x = Math.random() * ctx.canvas.width;
    var y = Math.random() * ctx.canvas.height;
    var radius = 10;
    var p = new Particle(x,y,radius);
    p.setup();
    particles.push(p);
  }
}

function placeholder() {
  ctx.fillStyle = "#000";
  var fontSize = ctx.canvas.width / 2.5;
  ctx.font = fontSize + "px serif";
  var textMeasure = ctx.measureText("Aquarela");
  var marginLeft = ctx.canvas.width * 0.01;
  ctx.fillText("Aquarela", marginLeft, ctx.canvas.height / 0.97);

  var radius = ctx.canvas.width / 30;
  ctx.beginPath();
  ctx.arc(marginLeft + radius * 2,marginLeft + radius * 2,radius,0,Math.PI*2,true); // Outer circle
  ctx.fill()
}

function background(color){
  ctx.fillStyle = color;
  ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
}