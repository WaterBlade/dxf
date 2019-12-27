import { Vector } from "./vector";

export class Point{
    constructor(public x: number, public y: number){}
    sub(point: Point){
        return new Vector(this.x - point.x, this.y - point.y);
    }
    add(vector: Vector){
        return new Point(this.x + vector.x, this.y + vector.y);
    }
    scale(factor: number, origin: Point){
        const v = this.sub(origin).scale(factor);
        return origin.add(v);
    }
    toVector(){
        return new Vector(this.x, this.y);
    }
}