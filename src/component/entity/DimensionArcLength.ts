import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class DimensionArcLength extends Entity {
    constructor(
        layer: string, 
        handle: string, 
        ownerHandle: string, 
        spaceSign: number = 0, 
        protected dimStyle: string, 
        protected xCenter: number, 
        protected yCenter: number, 
        protected xInsert: number, 
        protected yInsert: number, 
        protected xStart: number, 
        protected yStart: number, 
        protected xEnd: number, 
        protected yEnd: number) {
        super(layer, handle, ownerHandle, spaceSign);
    }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'ARC_DIMENSION', 
            5, this.handle, 
            8, this.layer, 
            330, this.ownerHandle, 
            100, 'AcDbEntity', 
            100, 'AcDbDimension', 
            67, this.spaceSign, 
            3, this.dimStyle, 
            10, this.xInsert, 
            20, this.yInsert, 
            30, 0, 
            70, 37, 
            100, 'AcDbArcDimension', 
            15, this.xCenter, 
            25, this.yCenter, 
            35, 0, 
            13, this.xStart, 
            23, this.yStart, 
            33, 0, 
            16, this.xStart, 
            26, this.yStart, 
            36, 0, 
            14, this.xEnd, 
            24, this.yEnd, 
            34, 0, 
            17, this.xEnd, 
            27, this.yEnd, 
            37, 0);
    }
}
