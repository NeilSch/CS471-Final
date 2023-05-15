class Boid
{
	//default constructor
	constructor()
	{
		this.position = createVector(random(width),random(height));
		this.velocity = p5.Vector.random2D();
		this.velocity.setMag(random(2,4));
		this.acceleration = createVector();
		this.maxForce = .05;
		this.maxSpeed = 4;

	}

	//checks if boids are out bounds; loops back around if so
	checker()
	{
		if(this.position.x > width)
		{
			this.position.x = 0;
		}
		else if (this.position.x < 0)
		{
			this.position.x = width;
		}
		if(this.position.y > height)
                {
                        this.position.y = 0;
                }
                else if (this.position.y < 0)
                {
                        this.position.y = height;
                }
	}

	align(boids)
	{
		//determines 'radius' that boid detects other boids
		let perception = 20;
		let avg = createVector();
		let total = 0;
		for(let other of boids)
		{
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			//checks distance to other boids, obviously excluding itself
			if(d<perception && other != this)
			{
				//if boid in range, add its velocity to the average
				avg.add(other.velocity);
				total++;
			}
		}
		if (total > 0)
		{
			avg.div(total);
			avg.setMag(this.maxSpeed);
			avg.sub(this.velocity);
			avg.limit(this.maxForce);
		}
		//WILL RETURN ZERO VECTOR IF NO BOIDS IN RANGE
		return avg;
	}

	cohede(boids)
 	{
                //determines 'radius' that boid detects other boids
                let perception = 20;
                let avg = createVector();
                let total = 0;
                for(let other of boids)
                {
                        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
                        //checks distance to other boids, obviously excluding itself
                        if(d<perception && other != this)
                        {
                                //if boid in range, add its velocity to the average
                                avg.add(other.position);
                                total++;
                        }
                }
                if (total > 0)
                {
                        avg.div(total);
                        avg.sub(this.position);
			avg.setMag(this.maxSpeed);
			avg.sub(this.velocity);
			avg.limit(this.maxForce);
                }
                //WILL RETURN ZERO VECTOR IF NO BOIDS IN RANGE
                return avg;
        }

	seper(boids)
	{
		let perception = 20;
		let avg = createVector();
		let total = 0;
		for ( let other of boids)
		{
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			 //checks distance to other boids, obviously excluding itself
                        if(d<perception && other != this)
                        {
                       		let neg = p5.Vector.sub(this.position, other.position);
				neg.div(d*d);
				avg.add(neg);
				total++;
                        }
		}
		if(total >0)
		{
			avg.div(total);
			avg.setMag(this.maxSpeed);
			avg.sub(this.velocity);
			avg.limit(this.maxForce);
		}
		return avg;
	}

	flock(boids)
	{
		let cohesion = this.cohede(boids);
		let alignment = this.align(boids);
		let seperation = this.seper(boids);
		this.acceleration.add(seperation);
		this.acceleration.add(alignment);
		this.acceleration.add(cohesion);
	}

	update()
	{
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.acceleration.mult(0);
	}

	show()
	{
		//img = loadImage('bird.png');
		strokeWeight(8);
		stroke(255);
		point(this.position.x, this.position.y);
		//image(img, this.position.x, this.position.y, 8, 8);
	}
}
