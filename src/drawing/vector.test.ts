import {describe, it} from "mocha";
import {expect} from "chai";

import {Vector} from "./vector";

describe('basic vector operation', ()=>{
    const v1 = new Vector(0, 0);
    const v2 = new Vector(1, 2);
    it('x', ()=>{
        expect(v1.x).to.equal(0);
    });
    it('y', ()=>{
        expect(v1.y).to.equal(0);
    });
    it('add', ()=>{
        const v3 = v1.add(v2);
        expect(v3.x).to.equal(1);
        expect(v3.y).to.equal(2);
    });
    it('sub', ()=>{
        const v3 = v1.sub(v2);
        expect(v3.x).to.equal(-1);
        expect(v3.y).to.equal(-2);
    });
    it('scale', ()=>{
        const v3 = v2.scale(5);
        expect(v3.x).to.equal(5);
        expect(v3.y).to.equal(10);
    })
    

})