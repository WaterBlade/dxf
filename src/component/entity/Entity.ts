import { Content } from "../groupcode";
export abstract class Entity extends Content {
    constructor(
        protected layer: string, 
        protected handle: string, 
        protected ownerHandle: string, 
        protected spaceSign: number = 0) { super(); }
}
