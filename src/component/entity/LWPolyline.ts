import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class LWPolyline extends Entity {
    protected xyBulges: number[] = [];
    constructor(layer: string, handle: string, ownerHandle: string, spaceSign: number = 0, protected lineScale = 1, ...xyBulges: number[]) {
        super(layer, handle, ownerHandle, spaceSign);
        if (xyBulges.length % 3 !== 0) {
            throw Error('x y bulges does not match in lwpolyline');
        }
        this.xyBulges = xyBulges;
    }
    toGroupcode(root: Groupcode) {
        root.push(0, 'LWPOLYLINE', 5, this.handle, 8, this.layer, 48, this.lineScale, 330, this.ownerHandle, 100, 'AcDbEntity', 100, 'AcDbPolyline', 67, this.spaceSign, 90, this.xyBulges.length / 3);
        for (let i = 0; i < this.xyBulges.length; i += 3) {
            root.push(10, this.xyBulges[i], 20, this.xyBulges[i + 1], 42, this.xyBulges[i + 2]);
        }
    }
}
