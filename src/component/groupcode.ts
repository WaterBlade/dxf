export class Groupcode{
    private rows: Array<number|string> = [];
    
    public toString(){
        return this.rows.join('\n');
    }

    public add(code: number, value: number|string){
        this.rows.push(code, value);
        return this;
    }

}

export abstract class Content{
    abstract toGroupcode(root: Groupcode): void;
}

export class CompositeContent<T extends Content> extends Content{
    private contents: T[] = [];
    toGroupcode(root: Groupcode){
        for (const c of this.contents){
            c.toGroupcode(root);
        }
    }
}

export class Composite extends CompositeContent<Content>{}