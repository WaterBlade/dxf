import { DXF, Block, Line, Entities, Text, LWPolyline, Hatch } from "../component";
import { PatternData } from "../common";

export class SpaceBuilder{
    private layer = '0';
    private style = 'STANDARD';
    // private dimStyle = 'STANDARD';
    private lineScale = 1;
    private textHeight = 3.5;
    private patternScale = 1;
    constructor(
        private dxf: DXF,
        private container: Entities | Block,
        private ownerHandle: string,
        private spaceSign: number
    ){}

    get Handle(){
        return this.dxf.Handle;
    }

    setLayer(layer: string){
        this.layer = layer;
        return this;
    }
    setStyle(style: string){
        this.style = style;
        return this;
    }
    // setDimStyle(dimStyle: string){
    //     this.dimStyle = dimStyle;
    //     return this;
    // }
    setLineScale(lineScale: number){
        this.lineScale = lineScale;
        return this;
    }
    setTextHeight(textHeight: number){
        this.textHeight = textHeight;
        return this;
    }
    setPatternScale(scale: number){
        this.patternScale = scale;
        return this;
    }


    line(xStart: number, yStart: number, xEnd: number, yEnd: number){
        const l = new Line(
            this.layer,
            this.Handle,
            this.ownerHandle,
            this.spaceSign,
            xStart, yStart, xEnd, yEnd,
            this.lineScale
        )
        this.container.push(l);
        return this;
    }
    text(txt: string, xInsert: number, yInsert: number){
        const t = new Text(
            this.layer,
            this.Handle,
            this.ownerHandle,
            this.spaceSign,
            this.style,
            txt,
            xInsert,
            yInsert,
            this.textHeight,
        )
        this.container.push(t);
        return this;
    }
    lwpolyline(...xyBulges: number[]){
        const pl = new LWPolyline(
            this.layer,
            this.Handle,
            this.ownerHandle,
            this.spaceSign,
            this.lineScale,
            ...xyBulges
        );
        this.container.push(pl);
        return this;
    }
    hatch(patternName: string, angle: number, ...xyBulges: number[]){
        const pattern = PatternData[patternName];
        this.container.push(
            new Hatch(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                pattern.name,
                pattern.data,
                angle,
                this.patternScale,
                ...xyBulges
            )
        )
    }
}