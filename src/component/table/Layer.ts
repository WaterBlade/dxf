import { TableItem } from "./Table";
import { Groupcode } from "../groupcode";
import { LineType } from "../../common";


export class Layer extends TableItem {
    constructor(
        protected name: string, 
        protected handle: string, 
        protected ltypeName: LineType = 'CONTINUOUS', 
        protected color: number = 7, 
        protected noPrint: boolean = false
    ) {
        super();
    }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'LAYER', 
            5, this.handle, 
            100, 'AcDbSymbolTableRecord', 
            100, 'AcDbLayerTableRecord', 
            2, this.name,
            70, 0, 
            62, this.color, 
            6, this.ltypeName);
        if (this.noPrint)
            root.push(290, 0);
        root.push(
            370, -3, 
            390, this.handle + '0', 
            347, this.handle + '1');
    }
}
