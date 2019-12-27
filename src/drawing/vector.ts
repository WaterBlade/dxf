export class Vector{
    constructor(public x: number, public y: number){}

    add(vector: Vector){
        return new Vector(this.x + vector.x, this.y + vector.y);
    }
    sub(vector: Vector){
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    scale(factor: number){
        return new Vector(this.x * factor, this.y * factor);
    }
}