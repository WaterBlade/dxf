import {saveAs} from "file-saver";
import { Groupcode } from "./groupcode";

export class DXF{
    private groupcode = new Groupcode();

    saveBlob(name: string){
        this.groupcode.add(0, 'EOF');
        const blob = new Blob([this.groupcode.toString()], {type: "text/plain;charset=utf-8"});
        saveAs(blob , name+'.dxf');
    }
}