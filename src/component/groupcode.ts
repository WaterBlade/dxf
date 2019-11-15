export class Groupcode {
    private rows: Array<number | string> = [];

    public toString() {
        return this.rows.join('\n');
    }

    public push(...codeValues: Array<number | string>) {
        if (codeValues.length % 2 !== 0) {
            throw Error('code and value does not match!');
        }
        for (let i = 0; i < codeValues.length; i += 2) {
            this.rows.push(codeValues[i], codeValues[i+1]);
        }
        return this;
    }

}

export abstract class Content {
    abstract toGroupcode(root: Groupcode): void;
}

export class CompositeContent<T extends Content> extends Content {
    private contents: T[] = [];
    constructor(...contents: T[]){
        super();
        this.contents = contents;
    }
    toGroupcode(root: Groupcode) {
        for (const c of this.contents) {
            c.toGroupcode(root);
        }
    }
    push(...code: T[]){
        this.contents.push(...code);
    }
}

export class Composite extends CompositeContent<Content>{ }