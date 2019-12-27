import { IHandlerVisitor } from "./iHandlerVisitor";
import { Vector } from "../vector";
import { Point } from "../point";

export abstract class DrawElement{
    abstract accept(visitor: IHandlerVisitor);
    abstract move(vector: Vector);
    abstract scale(factor: number, origin: Point);
}
