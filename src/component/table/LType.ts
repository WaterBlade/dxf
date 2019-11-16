import { Groupcode } from "../groupcode";
import { TableItem } from "./Table";
export class LType extends TableItem {
    constructor(
        protected name: string, 
        protected handle: string, 
        protected note?: string, 
        protected data?: number[]
    ) {
        super();
    }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'LTYPE', 
            5, this.handle, 
            100, 'AcDbSymbolTableRecord', 
            100, 'AcDbLinetypeTableRecord', 
            2, this.name, 
            70, 0);
        if (this.note === undefined || this.data === undefined) {
            root.push(
                3, '', 
                72, 65, 
                73, 0, 
                40, 0);
        }
        else {
            root.push(
                3, this.note!, 
                72, 5, 
                73, this.data!.length, 
                40, this.data!.reduce((pre, next) => pre + next));
            for (const c in this.data!) {
                root.push(49, c, 74, 0);
            }
        }
    }
}
