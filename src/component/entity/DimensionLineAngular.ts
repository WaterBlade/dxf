import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class DimensionLineAngular extends Entity {
    constructor(
        layer: string, 
        handle: string, 
        ownerHandle: string, 
        spaceSign: number = 0, 
        protected dimStyle: string, 
        protected xLine: number, 
        protected yLine: number, 
        protected xLine1Start: number, 
        protected yLine1Start: number, 
        protected xLine1End: number, 
        protected yLine1End: number, 
        protected xLine2Start: number, 
        protected yLine2Start: number, 
        protected xLine2End: number, 
        protected yLine2End: number) {
        super(layer, handle, ownerHandle, spaceSign);
    }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'DIMENSION', 
            5, this.handle, 
            8, this.layer, 
            330, this.ownerHandle, 
            100, 'AcDbEntity', 
            100, 'AcDbDimension', 
            67, this.spaceSign, 
            3, this.dimStyle, 
            70, 34, 
            10, this.xLine2Start, 
            20, this.yLine2Start, 
            30, 0, 
            100, 'AcDb2LineAngularDimension', 
            13, this.xLine1End, 
            23, this.yLine1End, 
            33, 0, 
            14, this.xLine1Start, 
            24, this.yLine1Start, 
            34, 0, 
            15, this.xLine2End, 
            25, this.yLine2End, 
            35, 0, 
            16, this.xLine, 
            26, this.yLine, 
            36, 0);
    }
}
