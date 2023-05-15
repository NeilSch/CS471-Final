const flock = [];
function setup()
{
	createCanvas(640,360);
	for(let i = 0; i < 100; i++)
	{
		flock.push(new Boid());
	}
}

function draw()
{
	let r = map(sin(frameCount * 0.01), -1, 1, 0, 255); // Varying red component
	let g = map(cos(frameCount * 0.02), -1, 1, 0, 255); // Varying green component
	let b = map(sin(frameCount * 0.03), -1, 1, 0, 255); // Varying blue component
	background(r, g, b);

	for(let boid of flock)
	{
		boid.checker();
		boid.flock(flock);
		boid.update();
		boid.show();
	}

}

