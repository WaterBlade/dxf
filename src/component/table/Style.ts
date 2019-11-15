import { Groupcode } from "../groupcode";
import { TableItem } from "./Table";
export class Style extends TableItem {
    constructor(
        public name: string, 
        public handle: string, 
        public fontName: string = 'simp1.shx', 
        public bigFontName: string = 'hz.shx', 
        public widthFactor = 0.7, 
        public obliqueDegree = 0, 
        public systemFontName: string | null = null, 
        public extData: string | null = null
    ) {
        super();
    }
    toGroupcode(root: Groupcode) {
        root.push(0, 'STYLE', 5, this.handle, 100, 'AcDbSymbolTableRecord', 100, 'AcDbTextStyleTableRecord', 2, this.name, 70, 0, 40, 0, 41, this.widthFactor, 50, this.obliqueDegree);
        if (this.systemFontName && this.extData) {
            root.push(
                1001, 'ACAD', 
                1000, this.systemFontName, 
                1071, this.extData);
        }
    }
}
