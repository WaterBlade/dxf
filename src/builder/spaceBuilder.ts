import { 
    DXF, 
    Block, 
    Line, 
    Entities, 
    Text, 
    LWPolyline, 
    Arc, 
    Circle,
    DimensionArcLength,
    DimensionDiametric,
    DimensionLineAngular,
    DimensionPointAngular,
    DimensionRadial,
    DimensionRotated,
    Ellipse,
    MText,
    Insert,
    Wipeout,
    Viewport,
    HatchEdge
} from "../component";
import { 
    PatternData,
    LayerType, 
    LayerData, 
    PatternType 
} from "../common";
import { HatchBuilder } from "./hatchBuilder";

export class SpaceBuilder{
    private layer = '0';
    private style = 'STANDARD';
    private dimStyle = 'STANDARD';
    private lineScale = 1;
    private textHeight = 3.5;
    private textAlign = 0;
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

    setLayer(layer: LayerType){
        this.layer = LayerData.get(layer)!;
        return this;
    }
    setStyle(style: string){
        this.style = style;
        return this;
    }
    setDimStyle(dimStyle: string){
        this.dimStyle = dimStyle;
        return this;
    }
    setLineScale(lineScale: number){
        this.lineScale = lineScale;
        return this;
    }
    setTextHeight(textHeight: number){
        this.textHeight = textHeight;
        return this;
    }
    setTextAlign(align: 'middleCenter' | 'bottomCenter'){
        if(align === 'middleCenter'){
            this.textAlign = 4;
        }else{
            this.textAlign = 1;
        }
    }
    setPatternScale(scale: number){
        this.patternScale = scale;
        return this;
    }

    // entities
    arc(xCenter: number, yCenter: number, radius: number, startAngle: number, endAngle: number){
        this.container.push(
            new Arc(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                xCenter,
                yCenter,
                radius,
                startAngle,
                endAngle
            )
        )
    }
    circle(xCenter: number, yCenter: number, radius: number){
        this.container.push(
            new Circle(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                xCenter,
                yCenter,
                radius
            )
        )
    }
    dimArcLength(
        xCenter: number,
        yCenter: number,
        xInsert: number,
        yInsert: number,
        xStart: number,
        yStart: number,
        xEnd: number,
        yEnd: number
    ){
        this.container.push(
            new DimensionArcLength(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                this.dimStyle,
                xCenter,
                yCenter,
                xInsert,
                yInsert,
                xStart,
                yStart,
                xEnd,
                yEnd
            )
        )
    }
    dimDiameter(
        xStart: number,
        yStart: number,
        xEnd: number,
        yEnd: number
    ){
        this.container.push(
            new DimensionDiametric(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                this.dimStyle,
                xStart,
                yStart,
                xEnd,
                yEnd
            )
        )
    }
    dimLineAngle(
        xDimPos: number,
        yDimPos: number,
        xLine1Start: number,
        yLine1Start: number,
        xLine1End: number,
        yLine1End: number,
        xLine2Start: number,
        yLine2Start: number,
        xLine2End: number,
        yLine2End: number
    ){
        this.container.push(
            new DimensionLineAngular(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                this.dimStyle,
                xDimPos,
                yDimPos,
                xLine1Start,
                yLine1Start,
                xLine1End,
                yLine1End,
                xLine2Start,
                yLine2Start,
                xLine2End,
                yLine2End
            )
        )
    }
    dimPointAngle(
        xDimPos: number,
        yDimPos: number,
        xCenter: number,
        yCenter: number,
        xLine1: number,
        yLine1: number,
        xLine2: number,
        yLine2: number
    ){
        this.container.push(
            new DimensionPointAngular(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                this.dimStyle,
                xDimPos,
                yDimPos,
                xCenter,
                yCenter,
                xLine1,
                yLine1,
                xLine2,
                yLine2
            )
        )
    }
    dimRadius(
        xCenter: number,
        yCenter: number,
        xStart: number,
        yStart: number
    ){
        this.container.push(
            new DimensionRadial(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                this.dimStyle,
                xCenter,
                yCenter,
                xStart,
                yStart
            )
        )
    }
    dimRotate(
        xStart: number,
        yStart: number,
        xEnd: number,
        yEnd: number,
        xInsert: number,
        yInsert: number,
        angle: number = 0
    ){
        this.container.push(
            new DimensionRotated(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                this.dimStyle,
                xStart,
                yStart,
                xEnd,
                yEnd,
                xInsert,
                yInsert,
                angle
            )
        )
    }
    ellipse(
        xCenter: number,
        yCenter: number,
        xVector: number,
        yVector: number,
        ratio: number,
        startAngle: number,
        endAngle: number
    ){
        this.container.push(
            new Ellipse(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                xCenter,
                yCenter,
                xVector,
                yVector,
                ratio,
                startAngle,
                endAngle
            )
        )
    }
    hatch(patternName: PatternType, angle: number){
        const pattern = PatternData.get(patternName)!;
        const hatch = new HatchEdge(
            this.layer,
            this.Handle,
            this.ownerHandle,
            this.spaceSign,
            pattern.name,
            pattern.data,
            angle,
            this.patternScale
        )
        this.container.push(hatch);
        return new HatchBuilder(hatch);
    }
    insert(
        blockName: string,
        xInsert: number,
        yInsert: number,
        xScale: number = 1,
        yScale: number = 1,
        angle: number = 0
    ){
        if(!this.dxf.blockNameStore.includes(blockName)){
            throw Error('use a insert of unexisted block: '+blockName);
        }
        this.container.push(
            new Insert(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                blockName,
                xInsert,
                yInsert,
                xScale,
                yScale,
                angle
            )
        )
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
    mtext(
        text: string,
        xInsert: number,
        yInsert: number,
        height: number,
        width: number
    ){
        this.container.push(
            new MText(
                this.layer,
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                this.style,
                text,
                xInsert,
                yInsert,
                height,
                width
            )
        )
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
            this.textAlign,
        )
        this.container.push(t);
        return this;
    }
    viewport(
        xModelCenter: number,
        yModelCenter: number,
        xPaperCenter: number,
        yPaperCenter: number,
        widthPaper: number,
        heightPaper: number,
        scale: number,
        angle: number
    ){
        if(this.spaceSign !== 1){
            throw Error('viewport must be in paperspace');
        }
        this.container.push(
            new Viewport(
                'Defpoints',
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                this.dxf.ViewportId,
                xModelCenter,
                yModelCenter,
                xPaperCenter,
                yPaperCenter,
                widthPaper,
                heightPaper,
                scale,
                angle
            )
        )
    }
    wipeout(...xyList: number[]){
        this.container.push(
            new Wipeout(
                '0',
                this.Handle,
                this.ownerHandle,
                this.spaceSign,
                ...xyList
            )
        )
    }
}