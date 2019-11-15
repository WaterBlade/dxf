import { Groupcode } from "../groupcode";
import { TableItem } from "./Table";
export class AppID extends TableItem {
    constructor(protected name: string, protected handle: string) {
        super();
    }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'APPID', 
            5, this.handle, 
            100, 'AcDbSymbolTableRecord', 
            100, 'AcDbRegAppTableRecord', 
            2, this.name, 
            70, 0);
    }
}
