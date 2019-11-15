import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class Line extends Entity {
    constructor(layer: string, handle: string, ownerHandle: string, spaceSign: number = 0, protected xStart: number, protected yStart: number, protected xEnd: number, protected yEnd: number, protected lineScale: number = 1) {
        super(layer, handle, ownerHandle, spaceSign);
    }
    toGroupcode(root: Groupcode) {
        root.push(0, 'LINE', 5, this.handle, 8, this.layer, 48, this.lineScale, 330, this.ownerHandle, 100, 'AcDbEntity', 100, 'AcDbLine', 67, this.spaceSign, 10, this.xStart, 20, this.yStart, 30, 0, 11, this.xEnd, 21, this.yEnd, 31, 0);
    }
}
