import { Content, Groupcode, CompositeContent } from "./groupcode";
import { PaperSize } from "../common";

export abstract class ObjectItem extends Content{
    constructor(
        public name: string, 
        public handle: string,
        public ownerHandle: string
    ){super();}
}

export class Dictionary extends ObjectItem{
    protected contents: ObjectItem[] = [];
    push(...items: ObjectItem[]){
        this.contents.push(...items);
    }
    toGroupcode(root: Groupcode){
        root.push(
            0, 'DICTIONARY',
            5, this.handle,
            330, this.ownerHandle,
            100, 'AcDbDictionary'
        )
        for(const item of this.contents){
            root.push(3, item.name, 350, item.handle);
        }
    }
}

export class Layout extends ObjectItem{
    constructor(
        name: string, handle: string, ownerHandle: string,
        public spaceHandle: string,
        public paperSize: 'A1' | 'A2' | 'A3'= 'A1'
    ){
        super(name, handle, ownerHandle);
    }
    toGroupcode(root: Groupcode){
        const [xLeftBottom, yLeftBottom] = PaperSize[this.paperSize].leftBottom;
        const [xRightTop, yRightTop] = PaperSize[this.paperSize].rightTop;
        const width = PaperSize[this.paperSize].width;
        const height = PaperSize[this.paperSize].height;
        root.push(
            0, 'LAYOUT',
            5, this.handle,
            330, this.ownerHandle,
            100, 'AcDbPlotSettings',
            1, '',
            2, 'none_device',
            4, `ISO_${this.paperSize}_(${width.toFixed(2)}_x_${height.toFixed(2)})`,
            6, '',
            40, 5,
            41, 5,
            42, 5,
            43, 5,
            44, height,
            45, width,
            46, 0,
            47, 0,
            142, 1,
            143, 1,
            70, 1,
            72, 1,
            73, 1,
            74, 5,
            75, 16,
            77, 2,
            148, 0,
            149, 0,
            100, 'AcDbLayout',
            1, this.name,
            10, xLeftBottom,
            20, yLeftBottom,
            11, xRightTop,
            21, yRightTop,
            14, xLeftBottom - 100,
            24, yLeftBottom - 100, 
            34, 0,
            15, xRightTop + 100,
            25, yRightTop + 100,
            35, 0,
            330, this.spaceHandle
        )
    }
}

export class Objects extends CompositeContent<ObjectItem>{
    root: Dictionary;
    groupDict: Dictionary;
    layoutDict: Dictionary;
    toGroupcode(root: Groupcode){
        root.push(0, 'SECTION', 2, 'OBJECTS');
        this.root.toGroupcode(root);
        this.groupDict.toGroupcode(root);
        this.layoutDict.toGroupcode(root);
        super.toGroupcode(root);
        root.push(0, 'ENDSEC');
    }
}