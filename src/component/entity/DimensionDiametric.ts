import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class DimensionDiametric extends Entity {
    constructor(layer: string, handle: string, ownerHandle: string, spaceSign: number = 0, protected dimStyle: string, protected xStart: number, protected yStart: number, protected xEnd: number, protected yEnd: number) {
        super(layer, handle, ownerHandle, spaceSign);
    }
    toGroupcode(root: Groupcode) {
        root.push(0, 'DIMENSION', 5, this.handle, 8, this.layer, 330, this.ownerHandle, 100, 'AcDbEntity', 100, 'AcDbDimension', 67, this.spaceSign, 3, this.dimStyle, 10, this.xEnd, 20, this.yEnd, 30, 0, 70, 35, 100, 'AcDbDiametricDimension', 15, this.xStart, 25, this.yStart, 35, 0);
    }
}
