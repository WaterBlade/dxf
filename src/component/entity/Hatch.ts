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
        protected patternData: Array<Array<number>>,
        protected angle: number,
        protected scale: number=1,
        ...xyBulges: number[]
    ) {
        super(layer, handle, ownerHandle, spaceSign);
        if(xyBulges.length % 3 !== 0){
            throw Error('x y bulges does not match in hatch');
        }
        if(xyBulges[0] !== xyBulges[xyBulges.length-3] || 
            xyBulges[1] !== xyBulges[xyBulges.length-2]){
            throw Error('hatch boundary does not closed!')
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
            230, 1,
            2, this.patternName,
            70, 0,
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
                42, this.xyBulges[i+2]
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
            78, this.patternData.length
        )
        for(const row of this.patternData){
            const head = row.slice(0, 5);
            const tail = row.slice(5);

            head[0] += this.angle;
            const x = head[1];
            const y = head[2];
            const radian12 = this.angle * Math.PI / 180;
            head[1] = (x * Math.cos(radian12) - y * Math.sin(radian12)) * this.scale;
            head[2] = (y * Math.cos(radian12) + x * Math.sin(radian12)) * this.scale;

            const dx = head[3];
            const dy = head[4];
            const radian34 = head[0] * Math.PI / 180;
            head[3] = (dx * Math.cos(radian34) - dy * Math.sin(radian34)) * this.scale;
            head[4] = (dy * Math.cos(radian34) + dx * Math.sin(radian34)) * this.scale;

            root.push(
                53, head[0],
                43, head[1],
                44, head[2],
                45, head[3],
                46, head[4],
                79, tail.length
            )
            for(const t of tail){
                root.push(40, (this.scale * t).toFixed(3))
            }
        }
        root.push(
            47, 1,
            98, 1,
            10, this.xyBulges[0],
            20, this.xyBulges[1]
        )

    }
    
}