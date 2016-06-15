var noise = require("@giuliandrimba/noise");

function Particle(x, y, radius) {
  this.DEAD = false;
  this.x = x;
  this.y = y;
  this.noise = {x:this.x, y:this.y};
  this.radius = radius
} 

Particle.prototype.setup = function(){
  var self = this;
  this.LIFESPAN = Math.random() * 60000;
  setTimeout(function(){
    self.DEAD = true;
  }, this.LIFESPAN)
}

Particle.prototype.draw = function(ctx){

  if(this.DEAD)
    return;

  this.noise.x += 0.05 / (ctx.canvas.width / 1024);
  this.noise.y += 0.05 / (ctx.canvas.height / 1024);
  this.x = noise(this.noise.x, 0) * ctx.canvas.width
  this.y = noise(0, this.noise.y) * ctx.canvas.width
  this.radius = noise(this.noise.x) * (50 * (ctx.canvas.width / 1024));
  ctx.fillStyle = "#FFF";
  ctx.strokeStyle = "#000"
  ctx.lineWidth = 0.5 * (ctx.canvas.width / 1024)
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
}

module.exports = Particle;