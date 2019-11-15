import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class Circle extends Entity {
    constructor(layer: string, handle: string, ownerHandle: string, spaceSign: number = 0, protected x: number, protected y: number, protected radius: number) {
        super(layer, handle, ownerHandle, spaceSign);
    }
    toGroupcode(root: Groupcode) {
        root.push(0, 'CIRCLE', 5, this.handle, 8, this.layer, 330, this.ownerHandle, 100, 'AcDbEntity', 100, 'AcDbCircle', 67, this.spaceSign, 10, this.x, 20, this.y, 30, 0, 40, this.radius);
    }
}
