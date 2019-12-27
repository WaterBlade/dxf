import { DrawComposite } from "./composite";
import { IHandlerVisitor } from "./iHandlerVisitor";

export class BorderComposite extends DrawComposite{
    accept(visitor: IHandlerVisitor){
        visitor.visitBorderComposite(this);
    }
}