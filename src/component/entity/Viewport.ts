import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class Viewport extends Entity{
    constructor(
        layer: string, 
        handle: string, 
        ownerHandle: string, 
        spaceSign: number = 0, 
        public portId: string,
        public xModelCenter: number,
        public yModelCenter: number,
        public xPaperCenter: number,
        public yPaperCenter: number,
        public widthPaper: number,
        public heightPaper: number,
        public scale: number,
        public angle: number
    ){
        super(layer, handle, ownerHandle, spaceSign);
    }
    toGroupcode(root: Groupcode){
        root.push(
            0, 'VIEWPORT',
            5, this.handle,
            100, 'AcDbEntity',
            8, this.layer,
            330, this.ownerHandle,
            67, this.spaceSign,
            100, 'AcDbViewport',
            67, 1,
            40, this.widthPaper,
            41, this.heightPaper,
            68, 2,
            69, this.portId,
            10, this.xModelCenter,
            20, this.yModelCenter,
            30, 0
        );
        if(this.angle === 0){
            root.push(
                12, this.xPaperCenter,
                22, this.yPaperCenter
            )
        }else{
            root.push(
                12, 0,
                22, 0,
                17, this.xPaperCenter,
                27, this.yPaperCenter,
                37, 0
            )
        }
        root.push(
            45, this.heightPaper * this.scale,
            51, this.angle,
            71, 1,
            90, 16384,
            110, 0,
            120, 0,
            130, 0,
            111, 1,
            121, 0,
            131, 0,
            112, 0,
            122, 1,
            132, 0
        );
    }
}