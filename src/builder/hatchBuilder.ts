import { HatchEdge, HatchLine, HatchEllipse, HatchArc, HatchLWPolyline } from "../component";

export class HatchBuilder{
    isPolyline = false;
    constructor(public hatch: HatchEdge){}
    arc(
        xCenter: number,
        yCenter: number,
        radius: number,
        angleStart: number,
        angleEnd: number,
        isCounterClock: boolean
    ){
        if(this.isPolyline) throw Error('hatch cannot have polyline and arc');
        this.hatch.push(
            new HatchArc(
                xCenter,
                yCenter,
                radius,
                angleStart,
                angleEnd,
                isCounterClock
            )
        )
        return this;
    }
    ellipse(
        xCenter: number,
        yCenter: number,
        xLong: number,
        yLong: number,
        ratio: number,
        angleStart: number,
        angleEnd: number,
        isCounterClock: boolean
    ){
        if(this.isPolyline) throw Error('hatch cannot have polyline and ellipse');
        this.hatch.push(
            new HatchEllipse(
                xCenter,
                yCenter,
                xLong,
                yLong,
                ratio,
                angleStart,
                angleEnd,
                isCounterClock
            )
        );
        return this;
    }
    line(
        xStart: number,
        yStart: number,
        xEnd: number,
        yEnd: number
    ){
        if(this.isPolyline) throw Error('hatch cannot have polyline and line');
        this.hatch.push(
            new HatchLine(
                xStart,
                yStart,
                xEnd,
                yEnd
            )
        );
        return this;
    }
    polyline(
        ...xyBuldges: number[]
    ){
        this.isPolyline = true;
        this.hatch.push(
            new HatchLWPolyline(
                ...xyBuldges
            )
        )
        return this;
    }
}