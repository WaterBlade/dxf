import { Entity } from "./Entity";
import { Groupcode } from "../groupcode";

export class DimensionPointAngular extends Entity{
    constructor(
        layer: string, 
        handle: string, 
        ownerHandle: string, 
        spaceSign: number = 0, 
        protected dimStyle: string, 
        protected xLine: number, 
        protected yLine: number, 
        protected xCenter: number,
        protected yCenter: number,
        protected xLine1: number, 
        protected yLine1: number, 
        protected xLine2: number, 
        protected yLine2: number, 
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
            70, 37,
            67, this.spaceSign,
            3, this.dimStyle,
            10, this.xLine,
            20, this.yLine,
            30, 0,
            100, 'AcDb3PointAngularDimension',
            13, this.xLine1,
            23, this.yLine1,
            33, 0,
            14, this.xLine2,
            24, this.yLine2,
            34, 0,
            15, this.xCenter,
            25, this.yCenter,
            35, 0
        );
    }
}