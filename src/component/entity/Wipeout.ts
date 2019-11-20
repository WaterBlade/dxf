import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class Wipeout extends Entity{
    xyList: number[];
    xInsert: number;
    yInsert: number;
    xU: number;
    yU: number;
    xV: number;
    yV: number;
    xyRels: number[] = [];
    constructor(
        layer: string, 
        handle: string, 
        ownerHandle: string, 
        spaceSign: number = 0, 
        ...xyList: number[]
    ){
        super(layer, handle, ownerHandle, spaceSign);
        if(xyList.length % 2 !== 0){
            throw Error('x y in wipeout does not match');
        }
        if(xyList[0] !== xyList[xyList.length-2] && xyList[1] !== xyList[xyList.length-1]){
            throw Error('x y in wipeout does not close');
        }
        this.xyList = xyList;
    }
    private xyProcess(){
        let [left, bottom] = this.xyList.slice(0, 2);
        let [right, top] = [left, bottom];
        for(let i = 2;i < this.xyList.length; i+= 2){
            const [x, y] = this.xyList.slice(i, i+2);
            left = Math.min(left, x);
            right = Math.max(right, x);
            bottom = Math.min(bottom, y);
            top = Math.max(top, y);
        }
        this.xInsert = left;
        this.yInsert = bottom;

        const width = right - left;
        const height = top - bottom;
        this.xU = width;
        this.yU = 0;
        this.xV = 0;
        this.yV = height;

        const x0 = (right+left)/2;
        const y0 = (top+bottom)/2;
        for(let i = 0; i<this.xyList.length; i+=2){
            const [x, y] = this.xyList.slice(i, i+2);
            this.xyRels.push(
                (x-x0)/width,
                (y0-y)/height
            )
        }
    }
    toGroupcode(root: Groupcode){
        this.xyProcess();
        root.push(
            0, 'WIPEOUT',
            5, this.handle,
            8, this.layer,
            330, this.ownerHandle,
            100, 'AcDbEntity',
            67, this.spaceSign,
            100, 'AcDbWipeout',
            90, 0,
            10, this.xInsert,
            20, this.yInsert,
            30, 0,
            11, this.xU,
            21, this.yU,
            31, 0,
            12, this.xV,
            22, this.yV,
            32, 0,
            13, 1,
            23, 1,
            340, 0,
            70, 7,
            280, 1,
            281, 50,
            282, 50,
            283, 0,
            360, 0,
            71, 2,
            91, this.xyRels.length/2
        );
        for(let i = 0; i< this.xyRels.length; i+=2){
            root.push(
                14, this.xyRels[i],
                24, this.xyRels[i+1]
            )
        }

    }
}