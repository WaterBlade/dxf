import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class Insert extends Entity{
    constructor(
        layer: string, 
        handle: string, 
        ownerHandle: string, 
        spaceSign: number = 0, 
        public blockName: string,
        public xInsert: number,
        public yInsert: number,
        public xScale: number,
        public yScale: number,
        public angle: number
    ){
        super(layer, handle, ownerHandle, spaceSign);
    }
    toGroupcode(root: Groupcode){
        root.push(
            0, 'INSERT',
            5, this.handle,
            330, this.ownerHandle,
            67, this.spaceSign,
            100, 'AcDbEntity',
            100, 'AcDbBlockReference',
            10, this.xInsert,
            20, this.yInsert,
            30, 0,
            2, this.blockName,
            41, this.xScale,
            42, this.yScale,
            43, 1,
            50, this.angle
        )
    }
}