import { Groupcode } from "../groupcode";
import { Entity } from "./Entity";
export class MText extends Entity {
    constructor(layer: string, handle: string, ownerHandle: string, spaceSign: number = 0, protected style: string, protected text: string, protected xInsert: number, protected yInsert: number, protected height: number, protected width: number, protected attach = 1) {
        super(layer, handle, ownerHandle, spaceSign);
    }
    toGroupcode(root: Groupcode) {
        root.push(0, 'MTEXT', 5, this.handle, 8, this.layer, 7, this.style, 330, this.ownerHandle, 100, 'AcDbEntity', 100, 'AcDbMText', 40, this.height, 67, this.spaceSign, 10, this.xInsert, 20, this.yInsert, 30, 0, 41, this.width, 71, this.attach);
        if (this.text.length < 250) {
            root.push(1, this.text);
        }
        else {
            for (let i = 0; i < this.text.length - 250; i += 250) {
                const subText = this.text.slice(i, i + 250);
                root.push(3, subText);
            }
            root.push(1, this.text.slice(-this.text.length % 250));
        }
    }
}
