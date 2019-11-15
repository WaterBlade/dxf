import { Groupcode } from "../groupcode";
import { TableItem } from "./Table";
export class BlockRecord extends TableItem {
    constructor(protected name: string, protected handle: string) {
        super();
    }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'BLOCK_RECORD', 
            5, this.handle, 
            100, 'AcDbSymbolTableRecord', 
            100, 'AcDbBlockTableRecord', 
            2, this.name, 
            70, 0, 
            280, 1, 
            281, 0);
    }
}
