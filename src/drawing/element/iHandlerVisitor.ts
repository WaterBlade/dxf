import { DrawElement } from "./element";

export interface IHandlerVisitor{
    visitBorderComposite(border: DrawElement);
    visitComposite(composite: DrawElement);
    visitLine(line: DrawElement);
    visitSymbolComposite(symbol: DrawElement);
}