class Boid {
    constructor( ){
        this.position = createVector( random(width) , random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4))
        this.acceleration = createVector();
        this.maxForce = 1;
        this.maxSpeed = 4;
        this.perceptionRadius = 1
        this.timer = 0
        this.col = color(255,255,255)
    }

    align(boids){
        let steer = createVector();
        let total = 0;
        for(let boid of boids){
            let d = dist(this.position.x,this.position.y,boid.position.x,boid.position.y);
            if (boid != this && d < this.perceptionRadius)
            {
                steer.add(boid.velocity);
                total++;
            }
            
        }
        if (total > 0){
            steer.div(total);
            steer.setMag(this.maxSpeed)
            steer.sub(this.velocity)
            steer.limit(this.maxForce)
            
        }
        return steer;
    }

    cohesion(boids){
        let steer = createVector();
        let total = 0;
        for(let boid of boids){
            let d = dist(this.position.x,this.position.y,boid.position.x,boid.position.y);
            if (boid != this && d < this.perceptionRadius)
            {
                steer.add(boid.position);
                total++;
            }
            
        }
        if (total > 0){
            steer.div(total);
            steer.sub(this.position)
            steer.setMag(this.maxSpeed)
            steer.sub(this.velocity)
            steer.limit(this.maxForce)
            
        }
        return steer;
    }

    
    Separation(boids){
        let steer = createVector();
        let total = 0;
        for(let boid of boids){
            let d = dist(this.position.x,this.position.y,boid.position.x,boid.position.y);
            if (boid != this && d < this.perceptionRadius)
            {
                let diff = p5.Vector.sub(this.position , boid.position)
                diff.div(d);
                steer.add(diff);
                total++;
            }
            
        }
        if (total > 0){
            steer.div(total);
            steer.setMag(this.maxSpeed)
            steer.sub(this.velocity)
            steer.limit(this.maxForce)
            
        }
        return steer;
    }

    boundaries(){
        if(this.position.x > width){
            this.position.x = 0;
        } else if (this.position.x < 0){
            this.position.x = width;
        }
        if(this.position.y > height){
            this.position.y = 0;
        } else if (this.position.y < 0){
            this.position.y = height;
        }
    }

    flock(boids){
        this.acceleration.set(0,0)
        let groupDirection = this.align(boids)
        let cohesion = this.cohesion(boids)
        let separation = this.Separation(boids)

        groupDirection.mult(alignSlider.value())
        cohesion.mult(cohesionSlider.value())
        separation.mult(separationSlider.value())
        this.perceptionRadius = perceptionRadiusSlider.value()

        this.acceleration.add(groupDirection);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed)

    }

    show(){
        
        // if(this.timer < 10 ){
        //     this.timer++;
        // } else {
        //     this.col = color(random(0,255),random(0,255),random(0,255))
        //     this.timer = 0;
        // }
        strokeWeight(10)
        stroke(this.col)
        point(this.position.x , this.position.y)
    }
}