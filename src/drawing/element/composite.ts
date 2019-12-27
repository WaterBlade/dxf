import { DrawElement } from "./element";
import { IHandlerVisitor } from "./iHandlerVisitor";
import { Point } from "../point";
import { Vector } from "../vector";

export class DrawComposite extends DrawElement{
    elements: DrawElement[] = [];
    insertPoint: Point = new Point(0, 0);
    accept(visitor: IHandlerVisitor){
        visitor.visitComposite(this);
    }
    move(vector: Vector){
        this.insertPoint = this.insertPoint.add(vector);
    }
    scale(factor: number, origin: Point){
        const locOrigin = new Point(0, 0);
        this.insertPoint = this.insertPoint.scale(factor, origin);
        for(const ele of this.elements){
            ele.scale(factor, locOrigin);
        }
    }
}