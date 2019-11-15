import { Groupcode, CompositeContent } from "../groupcode";
import { LType } from "./LType";
export class TableLType extends CompositeContent<LType> {
    constructor(protected handle: string, ...ltypes: LType[]) { super(...ltypes); }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'TABLE', 
            2, 'LTYPE', 
            5, this.handle, 
            100, 'AcDbSymbolTable', 
            70, 0, 
        );
        super.toGroupcode(root);
        root.push(0, 'ENDTAB');
    }
}
