class Sprite
{
constructor()
	{
		this.images= loop_imgs;
		this.canvas= canvas;
		this.context = canvas.getContext('2d');
		this.x = Math.random() * (canvas.width - 134);
		this.y = Math.random() * (canvas.height - 142);
		this.velocityX = (Math.random() - 0.5) *8;
		this.velocityY = (Math.random() - 0.5) *8;
		this.loopIndex = 0;
		this.last_animation_time =  new Date().getTime();
		this.time_delta = 4;
		this.bk_img = null;
	}
	draw()
	{
		if((this.time_delta + this.last_animation_time) > new Date().getTime())
		{
			return;
		}
		this.last_animation_time =  new Date().getTime();
		if(this.bk_img != null)
		{
			this.context.putImageData(this.bk_img, this.x, this.y);
		}
		this.x = this.x + this.velocityX;
		this.y = this.y + this.velocityY;
		if (this.x<10 || this.x > this.canvas.width-134)
		{
			this.velocityX = -this.velocityX;
		}
		if (this.y < 10 || this.y > this.canvas.height-142)
		{
			this.velocityY = -this.velocityY;
		}
		this.bk_img = this.context.getImageData(this.x, this.y, 134, 142);
		this.loopIndex++;
		if(this.loopIndex > 3)
		{
        		this.loopIndex = 0;
		}
		this.context.drawImage(this.images[this.loopIndex], this.x, this.y, 134, 142)
	}
	ramEffect(otherSprite)
	{
		const bounds =
			{
				left: this.x,
				right: this.x + 134,
				up: this.y,
				bottom: this.y + 142,
			};
		const otherbounds =
			{
				left: otherSprite.x,
				right: otherSprite.x +134,
				up: otherSprite.y,
				bottom: otherSprite.y+142,
			};
		if (bounds.left < otherbounds.right && bounds.right > otherbounds.left && bounds.up < otherbounds.bottom && bounds.bottom > otherbounds.up)
		{
			return true;
		}
		console.log("hi");
		return false;
	}

}

const iSuck  = new Sprite();
const iAlsoSuck = new Sprite();
function animate() {
  iSuck.draw();
  iAlsoSuck.draw();

  if (iSuck.ramEffect(iAlsoSuck)) 
	{
	iSuck.velocityX = -iSuck.velocityX;
	iAlsoSuck.velocityX = -iAlsoSuck.velocityX;
	iSuck.velocityY = -iSuck.velocityY;
        iAlsoSuck.velocityY = -iAlsoSuck.velocityY;	
	alert("Ouch!");
	}

  // Request the next animation frame
  window.requestAnimationFrame(animate);
}

// Call the animate function to start the animation loop
animate();
