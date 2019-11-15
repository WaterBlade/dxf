import { Entity } from "./Entity";
import { Groupcode } from "../groupcode";

export class Hatch extends Entity{
    protected xyBulges: number[]
    constructor(
        layer: string, 
        handle: string, 
        ownerHandle: string, 
        spaceSign: number = 0, 
        protected patternName: string,
        protected patternData: number[],
        protected angle: number,
        protected scale: number=1,
        protected fillType: number = 0,
        ...xyBulges: number[]
    ) {
        super(layer, handle, ownerHandle, spaceSign);
        if(xyBulges.length % 3 !== 0){
            throw Error('x y bulges dones not match in hatch');
        }
        this.xyBulges = xyBulges;
    }
    toGroupcode(root: Groupcode){
        root.push(
            0, 'HATCH',
            5, this.handle,
            8, this.layer,
            330, this.ownerHandle,
            100, 'AcDbEntity',
            100, 'AcDbHatch',
            10, 0,
            20, 0,
            30, 0,
            210, 0,
            220, 0,
            240, 1,
            2, this.patternName,
            70, this.fillType,
            71, 1,
            91, 1,
            92, 7,
            72, 1,
            73, 1,
            93, this.xyBulges.length / 3
        )
        for(let i = 0; i < this.xyBulges.length; i+= 3){
            root.push(
                10, this.xyBulges[i],
                20, this.xyBulges[i+1],
                30, this.xyBulges[i+2]
            )
        }
        root.push(
            97, 1,
            330, this.handle,
            75, 0,
            76, 1,
            52, this.angle,
            41, this.scale,
            77, 0,
        )
        // TODO: finish the hatch;

    }
    
}