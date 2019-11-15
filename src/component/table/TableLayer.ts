import { Groupcode, CompositeContent } from "../groupcode";
import { Layer } from "./Layer";
export class TableLayer extends CompositeContent<Layer> {
    constructor(protected handle: string, ...layers: Layer[]) { super(...layers); }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'TABLE', 
            2, 'LAYER', 
            5, this.handle, 
            100, 'AcDbSymbolTable', 
            70, 0, 
        );
        super.toGroupcode(root);
        root.push(0, 'ENDTAB');
    }
}
