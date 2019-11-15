import { Groupcode, CompositeContent } from "../groupcode";
import { AppID } from "./AppID";

export class TableAppID extends CompositeContent<AppID>{
    constructor(protected handle: string, ...appids: AppID[]){super(...appids);}
    toGroupcode(root: Groupcode){
        root.push(
            0, 'TABLE',
            2, 'APPID',
            5, this.handle,
            100, 'AcDbSymbolTable',
            70, 0
        );
        super.toGroupcode(root);
        root.push(0, 'ENDTAB');
    }
}