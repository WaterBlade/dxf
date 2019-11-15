import { Groupcode, CompositeContent } from "../groupcode";
import { DimStyle } from "./DimStyle";
export class TableDimStyle extends CompositeContent<DimStyle> {
    constructor(protected handle: string, ...dimStyles: DimStyle[]) { super(...dimStyles); }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'TABLE', 
            2, 'DIMSTYLE', 
            5, this.handle, 
            100, 'AcDbSymbolTable', 
            70, 0, 
            100, 'AcDbDimStyleTable', 
            71, 1);
        super.toGroupcode(root);
        root.push(0, 'ENDTAB');
    }
}
