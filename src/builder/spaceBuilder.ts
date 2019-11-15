import { DXF, Block, Line, Entities } from "../component";

export class SpaceBuilder{
    constructor(
        private dxf: DXF,
        private container: Entities | Block,
        private ownerHandle: string,
        private spaceSign: number
    ){}

    get Handle(){
        return this.dxf.Handle;
    }

    line(){
        this.container.push(new Line('0', this.Handle, this.ownerHandle, this.spaceSign, 0, 0, 0, 0))
    }

}