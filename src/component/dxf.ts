import {saveAs} from "file-saver";
import { Groupcode } from "./groupcode";
import { Header } from "./header";
import { Classes } from "./classes";
import { Tables } from "./tables";
import { Blocks } from "./blocks";
import { Entities } from "./entities";
import { Objects } from "./objects";

export class DXF{
    private groupcode = new Groupcode();
    private handleNum = 1;
    private paperNum = 0;
    private viewportNum = 1;

    header = new Header();
    classes = new Classes();
    tables = new Tables();
    blocks = new Blocks();
    entities = new Entities();
    objects = new Objects();

    blockNameStore: string[] = [];


    get Handle(){
        return (this.handleNum++).toString(16)
    }

    get PaperspaceName(){
        if(this.paperNum === 0){
            return '*PAPER_SPACE';
        }else{
            return `*PAPER_SPACE${this.paperNum++}`
        }
    }

    get ViewportId(){
        return `${this.viewportNum++}`
    }

    saveBlob(name: string){
        this.header.toGroupcode(this.groupcode);
        this.classes.toGroupcode(this.groupcode);
        this.tables.toGroupcode(this.groupcode);
        this.blocks.toGroupcode(this.groupcode);
        this.entities.toGroupcode(this.groupcode);
        this.objects.toGroupcode(this.groupcode);
        this.groupcode.push(0, 'EOF');
        const blob = new Blob([this.groupcode.toString()], {type: "text/plain;charset=utf-8"});
        saveAs(blob , name+'.dxf');
    }
}