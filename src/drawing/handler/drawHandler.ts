import {IHandlerVisitor} from "../element/iHandlerVisitor";
import { DrawComposite } from "../element/composite";
import { Point } from "../point";
import { Line } from "../element/line";
import { DXFBuilder } from "/builder";
import { SymbolComposite } from "../element/symbolComposite";
import { BorderComposite } from "../element/borderComposite";

export class DrawHanlder implements IHandlerVisitor{
    insertPointStack: Point[] = [];
    insertPoint = new Point(0, 0);
    builder = new DXFBuilder();
    model = this.builder.modelSpace;
    saveBlob(name: string){
        this.builder.saveBlob(name);
    }
    visitBorderComposite(border: BorderComposite){
        this.visitComposite(border);
    }
    visitComposite(composite: DrawComposite){
        this.insertPointStack.push(this.insertPoint);
        this.insertPoint = this.insertPoint.add(composite.insertPoint.toVector());
        for(const ele of composite.elements){
            ele.accept(this);
        }
        this.insertPoint = this.insertPointStack.pop()!;
    }
    visitLine(line: Line){
        const {x: x0, y: y0} = this.insertPoint.add(line.start.toVector());
        const {x: x1, y: y1} = this.insertPoint.add(line.end.toVector());
        this.model.line(x0, y0, x1, y1);
    }
    visitSymbolComposite(symbol: SymbolComposite){
        this.visitComposite(symbol);
    }
}