import { Entity } from "./Entity";
import { Groupcode } from "../groupcode";

export class HatchEdge extends Entity {
    protected edges: Edge[] = [];
    constructor(
        layer: string,
        handle: string,
        ownerHandle: string,
        spaceSign: number = 0,
        protected patternName: string,
        protected patternData: Array<Array<number>>,
        protected angle: number,
        protected scale: number = 1,
    ) {
        super(layer, handle, ownerHandle, spaceSign);
    }
    push(...edges: Edge[]) {
        this.edges.push(...edges);
    }
    toGroupcode(root: Groupcode) {
        const isPolyline = this.edges[0] instanceof HatchLWPolyline;
        root.push(
            0, 'HATCH',
            5, this.handle,
            8, this.layer,
            330, this.ownerHandle,
            100, 'AcDbEntity',
            100, 'AcDbHatch',
            10, 0,
            20, 0,
            30, 0,
            210, 0,
            220, 0,
            230, 1,
            2, this.patternName,
            70, (this.patternName === 'SOLID') ? 1 : 0,
            71, 0,
            91, 1,
        )
        if (isPolyline) {
            root.push(
                92, 7,
                72, 1,
                73, 1,
            )
        } else {
            root.push(
                92, 5,
                93, this.edges.length
            )
        }
        for (const edge of this.edges) {
            edge.toGroupcode(root);
        }
        root.push(
            97, 0,
            75, 0,
            76, 1,
        )
        if (this.patternName !== 'SOLID') {
            root.push(
                52, this.angle,
                41, this.scale,
                77, 0,
                78, this.patternData.length
            )

            for (const row of this.patternData) {
                const head = row.slice(0, 5);
                const tail = row.slice(5);

                head[0] += this.angle;
                const x = head[1];
                const y = head[2];
                const radian12 = this.angle * Math.PI / 180;
                head[1] = (x * Math.cos(radian12) - y * Math.sin(radian12)) * this.scale;
                head[2] = (y * Math.cos(radian12) + x * Math.sin(radian12)) * this.scale;

                const dx = head[3];
                const dy = head[4];
                const radian34 = head[0] * Math.PI / 180;
                head[3] = (dx * Math.cos(radian34) - dy * Math.sin(radian34)) * this.scale;
                head[4] = (dy * Math.cos(radian34) + dx * Math.sin(radian34)) * this.scale;

                root.push(
                    53, head[0],
                    43, head[1],
                    44, head[2],
                    45, head[3],
                    46, head[4],
                    79, tail.length
                )
                for (const t of tail) {
                    root.push(49, this.scale * t)
                }
            }
        }
        const [x, y] = this.edges[0].Seed;
        root.push(
            47, 1,
            98, 1,
            10, x,
            20, y
        )

    }

}

export abstract class Edge {
    abstract toGroupcode(root: Groupcode);
    abstract get Seed(): number[];
}
export class HatchLWPolyline extends Edge {
    xyBulges: number[];
    constructor(...xyBulges: number[]) {
        super();
        if (xyBulges.length % 3 !== 0) {
            throw Error('x y bulges does not match in hatch');
        }
        if (xyBulges[0] !== xyBulges[xyBulges.length - 3] ||
            xyBulges[1] !== xyBulges[xyBulges.length - 2]) {
            throw Error('hatch boundary does not closed!')
        }
        this.xyBulges = xyBulges;
    }
    get Seed() {
        return this.xyBulges.slice(0, 2);
    }
    toGroupcode(root: Groupcode) {
        root.push(
            93, this.xyBulges.length / 3
        )
        for (let i = 0; i < this.xyBulges.length; i += 3) {
            root.push(
                10, this.xyBulges[i],
                20, this.xyBulges[i + 1],
                42, this.xyBulges[i + 2]
            )
        }
    }
}
export class HatchLine extends Edge {
    constructor(
        public xStart: number,
        public yStart: number,
        public xEnd: number,
        public yEnd: number
    ) { super(); }
    toGroupcode(root: Groupcode) {
        root.push(
            72, 1,
            10, this.xStart,
            20, this.yStart,
            11, this.xEnd,
            21, this.yEnd
        )
    }
    get Seed() {
        return [this.xStart, this.yStart];
    }

}
export class HatchEllipse extends Edge {
    constructor(
        public xCenter: number,
        public yCenter: number,
        public xLong: number,
        public yLong: number,
        public ratio: number,
        public angleStart: number,
        public angleEnd: number,
        public isCounterClock: boolean = true
    ) { super(); }
    get Seed() {
        return [this.xCenter, this.yCenter];
    }
    toGroupcode(root: Groupcode) {
        root.push(
            72, 3,
            10, this.xCenter,
            20, this.yCenter,
            11, this.xLong,
            21, this.yLong,
            40, this.ratio,
            50, this.angleStart,
            51, this.angleEnd,
            73, this.isCounterClock ? 1 : 0
        )
    }
}
export class HatchArc extends Edge {
    constructor(
        public xCenter: number,
        public yCenter: number,
        public radius: number,
        public angleStart: number,
        public angleEnd: number,
        public isCounterClock: boolean
    ) { super(); }
    get Seed() {
        return [this.xCenter, this.yCenter];
    }
    toGroupcode(root: Groupcode) {
        root.push(
            72, 2,
            10, this.xCenter,
            20, this.yCenter,
            40, this.radius,
            50, this.angleStart,
            51, this.angleEnd,
            73, this.isCounterClock ? 1 : 0
        )
    }
}