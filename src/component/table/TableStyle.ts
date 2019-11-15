import { Groupcode, CompositeContent } from "../groupcode";
import { Style } from "./Style";
export class TableStyle extends CompositeContent<Style> {
    styles: {[name: string]: string} = {}
    constructor(protected handle: string, ...styles: Style[]) { super(...styles); }
    push(...items: Style[]){
        for(const c of items){
            this.styles[c.name] = c.handle;
        }
        super.push(...items);
    }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'TABLE', 
            2, 'STYLE', 
            5, this.handle, 
            100, 'AcDbSymbolTable', 
            70, 0, 
        );
        super.toGroupcode(root);
        root.push(0, 'ENDTAB');
    }
}
