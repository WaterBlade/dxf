import { Groupcode, CompositeContent } from "../groupcode";
import { BlockRecord } from "./BlockRecord";
export class TableBlock extends CompositeContent<BlockRecord> {
    constructor(protected handle: string, ...blockRecords: BlockRecord[]) { super(...blockRecords); }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'TABLE', 
            2, 'BLOCK_RECORD', 
            5, this.handle, 
            100, 'AcDbSymbolTable', 
            70, 0);
        super.toGroupcode(root);
        root.push(0, 'ENDTAB');
    }
}
