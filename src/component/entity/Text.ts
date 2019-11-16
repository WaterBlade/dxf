import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class Text extends Entity {
    constructor(
        layer: string, 
        handle: string, 
        ownerHandle: string, 
        spaceSign: number = 0, 
        protected style: string, 
        protected text: string, 
        protected xInsert: number, 
        protected yInsert: number, 
        protected height: number, 
        protected hJustify = 0, 
        protected vJustify = 0, 
        protected widthFactor = 0.7, 
        protected angle = 0) {
        super(layer, handle, ownerHandle, spaceSign);
    }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'TEXT', 
            5, this.handle, 
            8, this.layer, 
            330, this.ownerHandle, 
            100, 'AcDbEntity', 
            100, 'AcDbText', 
            67, this.spaceSign, 
            1, this.text, 
            50, this.angle, 
            40, this.height, 
            41, this.widthFactor, 
            72, this.hJustify, 
            10, this.xInsert, 
            20, this.yInsert, 
            30, 0, 
            11, this.xInsert, 
            21, this.yInsert, 
            31, 0, 
            7, this.style, 
            100, 'AcDbText', 
            73, this.vJustify);
    }
}
