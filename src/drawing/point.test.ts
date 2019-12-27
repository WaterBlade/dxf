import { describe, it } from "mocha";
import { expect } from "chai";

import { Point } from "./point";
import { Vector } from "./vector";


describe('basic point property', () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(3, 5);
    it('x', () => {
        expect(p1.x).to.equal(1);
    });
    it('y', ()=>{
        expect(p1.y).to.equal(2);
    });
    it('sub', ()=>{
        const p3 = p1.sub(p2);
        expect(p3.x).to.equal(-2);
        expect(p3.y).to.equal(-3);
    });
    it('add', ()=>{
        const p3 = p1.add(new Vector(1, 2));
        expect(p3.x).to.equal(2);
        expect(p3.y).to.equal(4);
    });
    it('scale', ()=>{
        const p3 = p1.scale(5, new Point(0, 0));
        expect(p3.x).to.equal(5);
        expect(p3.y).to.equal(10);
    });
})