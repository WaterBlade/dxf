import { Entity } from "./Entity";
import { Groupcode } from "../groupcode";

export class DimensionRotated extends Entity{
    constructor(
        layer: string, 
        handle: string, 
        ownerHandle: string, 
        spaceSign: number = 0, 
        protected dimStyle: string, 
        protected xStart: number,
        protected yStart: number,
        protected xEnd: number, 
        protected yEnd: number, 
        protected xInsert: number,
        protected yInsert: number,
        protected angle = 0
    ) {
        super(layer, handle, ownerHandle, spaceSign);
    }
    toGroupcode(root: Groupcode){
        root.push(
            0, 'DIMENSION',
            5, this.handle,
            8, this.layer,
            330, this.ownerHandle,
            100, 'AcDbEntity',
            100, 'AcDbDimension',
            70, 32,
            67, this.spaceSign,
            3, this.dimStyle,
            10, this.xInsert,
            20, this.yInsert,
            30, 0,
            100, 'AcDbAlignedDimension',
            50, this.angle,
            13, this.xStart,
            23, this.yStart,
            33, 0,
            14, this.xEnd,
            24, this.yEnd,
            34, 0,
            100, 'AcDbRotatedDimension'
        );
    }
}