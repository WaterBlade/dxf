import { Groupcode } from "../groupcode";
import { Table } from "./Table";
export class TableUCS extends Table{
    constructor(protected handle: string) { super(); }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'TABLE', 
            2, 'UCS', 
            5, this.handle, 
            100, 'AcDbSymbolTable', 
            70, 0, 
            0, 'ENDTAB'
        );
    }
}
