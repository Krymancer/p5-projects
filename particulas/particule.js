class Particle{
    constructor(x,y){
        this.position = createVector(x,y);
        this.velocity = 0.5;
        this.repell = 20;
    }

    run(){
        this.move();
        this.display(); 
    }

    display(){
        stroke(32,204,152);
        strokeWeight(15);
        point(this.position.x,this.position.y);
    }

    move(){
        const variance = 5;
        const x = random(-variance,variance);
        const y = random(-variance,variance);
        let newx = this.position.x + x;
        let newy = this.position.y + y;

        if(newx > width || newx < 0){
            newx = this.position.x - x * 10;
        }
        if(newy > height || newy < 0){
            newy = this.position.y - y * 10;
        }

        this.position.x = newx;
        this.position.y = newy;
    }

    repulse(particle){
        const distance = this.getDistance(particle);
        if(distance < 20){
            if(particle.position.x > this.position.x){
                particle.position.x += 10;
            }else{
                particle.position.x -= 10;
            }
            if(particle.position.y > this.position.y){
                particle.position.y += 10;
            }else{
                particle.position.y -= 10;
            }
        }
    }

    atract(particle){
        if(particle.position.x > this.position.x){
            particle.position.x -= 5;
        }else{
            particle.position.x += 5;
        }
        if(particle.position.y > this.position.y){
            particle.position.y -= 5;
        }else{
            particle.position.y += 5;
        }
    }

    getDistance(particle){
        return sqrt((particle.position.x - this.position.x)**2 + (particle.position.y - this.position.y)**2);
    }
    
}