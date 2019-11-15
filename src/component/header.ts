import { Content, Groupcode, CompositeContent } from "./groupcode";

export class Variable extends Content{
    protected codeValues: Array<number | string>;
    constructor(protected name: string, ...codeValues: Array<number | string>){
        super();
        this.codeValues = codeValues;
    }
    toGroupcode(root: Groupcode){
        root.push(9, '$'+this.name, ...this.codeValues);
    }
}


export class Header extends CompositeContent<Variable>{
    toGroupcode(root: Groupcode){
        root.push(0, 'SECTION', 2, 'HEADER');
        super.toGroupcode(root);
        root.push(0, 'ENDSEC');
    }
}