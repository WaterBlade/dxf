import { DrawElement } from "./element";
import { IHandlerVisitor } from "./iHandlerVisitor";
import { Point } from "../point";
import { Vector } from "../vector";

export class Line extends DrawElement{
    constructor(public start: Point, public end: Point){super();}
    accept(visitor: IHandlerVisitor){
        visitor.visitLine(this);
    }
    move(vector: Vector){
        this.start = this.start.add(vector);
        this.end = this.end.add(vector);
    }
    scale(factor: number, origin: Point){
        this.start.scale(factor, origin);
        this.end.scale(factor, origin);
    }
}