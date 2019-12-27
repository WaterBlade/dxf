import { IHandlerVisitor } from "../element/iHandlerVisitor";
import { DrawComposite } from "../element/composite";
import { SymbolComposite } from "../element/symbolComposite";
import { BorderComposite } from "../element/borderComposite";

export class PaperScaleHandler implements IHandlerVisitor{
    constructor(public factor: number){}
    visitBorderComposite(border: BorderComposite){
        border.scale(this.factor, border.insertPoint);
    }
    visitComposite(composite: DrawComposite){
        for(const ele of composite.elements){
            ele.accept(this);
        }
    }
    visitLine(){}
    visitSymbolComposite(symbol: SymbolComposite){
        symbol.scale(this.factor, symbol.insertPoint);
    }
}