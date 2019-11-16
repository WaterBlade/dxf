import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class Ellipse extends Entity {
    constructor(
        layer: string, 
        handle: string, 
        ownerHandle: string, 
        spaceSign: number = 0, 
        protected x: number, 
        protected y: number, 
        protected xVector: number, 
        protected yVector: number, 
        protected ratio: number, 
        protected startAngle: number, 
        protected endAngle: number) {
        super(layer, handle, ownerHandle, spaceSign);
    }
    private calcFocusRadian(angle: number): number {
        if (angle === 90) {
            return 0.5 * Math.PI;
        }
        else if (angle === 270) {
            return 1.5 * Math.PI;
        }
        else {
            const r = Math.atan(Math.tan(angle * Math.PI / 180 / this.ratio));
            if (angle < 90) {
                return r;
            }
            else if (angle > 90 && angle < 270) {
                return Math.PI + r;
            }
            else {
                return 2 * Math.PI + r;
            }
        }
    }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'ELLIPSE', 
            5, this.handle, 
            8, this.layer, 
            330, this.ownerHandle, 
            100, 'AcDbEntity', 
            100, 'AcDbEllipse', 
            67, this.spaceSign, 
            10, this.x, 
            20, this.y, 
            30, 0, 
            11, this.xVector, 
            21, this.yVector, 
            31, 0, 
            40, this.ratio, 
            41, this.calcFocusRadian(this.startAngle), 
            42, this.calcFocusRadian(this.endAngle));
    }
}
