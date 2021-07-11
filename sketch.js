const flock = []
const boidsNumber = 200

let alignSlider,cohesionSlider,separationSlider , perceptionRadiusSlider;


function setup() {
  createCanvas(1200, 600);
  alignSlider = createSlider(0,5,1,0.1);
  cohesionSlider = createSlider(0,5,1,0.1);
  separationSlider = createSlider(0,5,1,0.1);
  perceptionRadiusSlider = createSlider(0,100,50,0.1);
  for (let i = 0 ; i<boidsNumber;i++){
    flock.push(new Boid());
  }
}

function draw() {
  background(51);

  for (let boid of flock){
    boid.boundaries();
    boid.flock(flock);
    boid.update()
    boid.show();
  }
}
