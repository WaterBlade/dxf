import {DXF} from "../component";

export class DXFBuilder{
    private dxf = new DXF();
    saveBlob(name: string){
        this.dxf.saveBlob(name);
    }
}


export function dxfDemo(){
    const builder = new DXFBuilder();
    builder.saveBlob('dxf测试');
}