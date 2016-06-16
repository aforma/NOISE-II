var noise = require("@giuliandrimba/noise");

function Particle(x, y, radius) {
  this.DEAD = false;
  this.radius = radius
  this.x = x - this.radius;
  this.y = y - this.radius;
  this.noise = {x:this.x, y:this.y};
  this.speed = Math.random() * 0.01
} 

Particle.prototype.setup = function(){
  var self = this;
  this.LIFESPAN = Math.random() * 15000;
  setTimeout(function(){
    self.DEAD = true;
  }, this.LIFESPAN)
}

Particle.prototype.draw = function(ctx){

  if(this.DEAD)
    return;

  this.noise.x += 0.003 + this.speed;
  this.noise.y += 0.003 + this.speed;
  this.x = noise(this.noise.x, 0) * ctx.canvas.width
  this.y = noise(0, this.noise.y) * ctx.canvas.height
  this.radius = noise(this.noise.x) * 200;
  ctx.fillStyle = "#FFF";
  ctx.strokeStyle = "#000"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
}

module.exports = Particle;