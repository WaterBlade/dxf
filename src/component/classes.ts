import { Content, CompositeContent, Groupcode } from "./groupcode";

export class DXFClass extends Content{
    constructor(protected recordName : string, protected className: string,
        protected applicationName: string, 
        protected value90 = 0, protected value91 = 0,
        protected value280 = 0, protected value281=0){
            super();
    }
    toGroupcode(root: Groupcode){
        root.push(
            0, 'CLASS',
            1, this.recordName,
            2, this.className,
            3, this.applicationName,
            90, this.value90,
            91, this.value91,
            280, this.value280,
            281, this.value281
        );
    }


}


export class Classes extends CompositeContent<DXFClass>{
    toGroupcode(root: Groupcode){
        root.push(0, 'SECTION', 2, 'CLASSES');
        super.toGroupcode(root);
        root.push(0, 'ENDSEC');
    }
}