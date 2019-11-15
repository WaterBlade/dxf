import { Entity } from "./Entity";
import { Groupcode } from "../groupcode";

export class DimensionRadial extends Entity{
    constructor(
        layer: string, 
        handle: string, 
        ownerHandle: string, 
        spaceSign: number = 0, 
        protected dimStyle: string, 
        protected xCenter: number,
        protected yCenter: number,
        protected xStart: number, 
        protected yStart: number, 
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
            70, 36,
            67, this.spaceSign,
            3, this.dimStyle,
            10, this.xCenter,
            20, this.yCenter,
            30, 0,
            100, 'AcDbRadialDimension',
            15, this.xStart,
            25, this.yStart,
            35, 0
        );
    }
}