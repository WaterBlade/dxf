import { CompositeContent, Groupcode } from "./groupcode";
import { Entity } from "./entity";

export class Block extends CompositeContent<Entity>{
    constructor(
        protected name: string,
        protected layer: string,
        protected beginHandle: string,
        protected endHandle: string,
        protected xBase: number,
        protected yBase: number
    ){
        super();
    }
    toGroupcode(root: Groupcode){
        root.push(
            0, 'BLOCK',
            5, this.beginHandle,
            100, 'AcDbEntity',
            8, this.layer,
            100, 'AcDbBlockBegin',
            2, this.name,
            70, 0,
            10, this.xBase,
            20, this.yBase,
            30, 0,
            3, this.name,
        )
        super.toGroupcode(root);
        root.push(
            0, 'ENDBLK',
            5, this.endHandle,
            100, 'AcDbEntity',
            8, this.layer,
            100, 'AcDbBlockEnd'
        )
    }
}
export class Blocks extends CompositeContent<Block>{
    toGroupcode(root: Groupcode){
        root.push( 0, 'SECTION', 2, 'BLOCKS');
        super.toGroupcode(root);
        root.push(0, 'ENDSEC');
    }
}