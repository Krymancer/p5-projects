class Block{
    constructor(x,w,m,v){
        this.x = x;
        this.y = height - w;
        this.w = w;
        this.m = m;
        this.v = v;
    }

    reverse(){
        this.v = -this.v;  
    }

    hitWall(){
        return this.x <= 0;

    }

    collide(other){
        return !(this.x + this.w < other.x || this.x >  other.x + other.w);
    }

    bounce(other){
        return ((this.m - other.m)/(this.m + other.m)*this.v)+((2*other.m)/(this.m + other.m)*other.v);
    }

    show(){
        fill(255/this.m,255/this.y,200);
        square(this.x,this.y,this.w);
    }

    update(){
        this.x += this.v;
    }
}