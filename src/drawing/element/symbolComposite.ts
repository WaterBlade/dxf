import { DrawComposite } from "./composite";
import { IHandlerVisitor } from "./iHandlerVisitor";

export class SymbolComposite extends DrawComposite{
    accept(visitor: IHandlerVisitor){
        visitor.visitSymbolComposite(this);
    }

}