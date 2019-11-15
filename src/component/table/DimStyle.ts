import { Groupcode } from "../groupcode";
import { TableItem } from "./Table";
export class DimStyle extends TableItem {
    constructor(
        protected name: string, 
        protected handle: string, 
        protected textStyleHandle: string, 
        protected dimScale = 1, 
        protected measureScale = 1, 
        protected textHeight = 2.5, 
        protected arrowSize = 2.0, 
        protected anglePrecision = 1, 
        protected decPrecision = 0) {
        super();
    }
    toGroupcode(root: Groupcode) {
        root.push(
            0, 'DIMSTYLE', 
            105, this.handle, 
            100, 'AcDbSymbolTableRecord', 
            100, 'AcDbDimStyleTableRecord', 
            2, this.name, 
            70, 0, 
            41, this.arrowSize, 
            42, 0, 
            44, 2, 
            73, 0, 
            77, 1, 
            140, this.textHeight, 
            147, 1, 
            144, this.measureScale, 
            40, this.dimScale, 
            279, 1, 
            280, 0, 
            289, 3, 
            179, this.anglePrecision, 
            172, 1, 
            174, 1, 
            176, 256, 
            177, 256, 
            178, 256, 
            271, this.decPrecision, 
            340, this.textStyleHandle);
    }
}
