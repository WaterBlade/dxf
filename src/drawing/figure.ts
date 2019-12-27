import { PaperScaleHandler } from "./handler/paperScaleHandler";
import { DrawHanlder } from "./handler/drawHandler";
import { DrawComposite } from "./element/composite";
import { BorderComposite } from "./element/borderComposite";
import { Point } from "./point";

export class Figure{
    paperScale = 1;
    figureFactor = 1;

    composite = new DrawComposite();

    setInsertPoint(point: Point){
        this.composite.insertPoint = point;
    }

    setPaperScale(factor: number){
        const handler = new PaperScaleHandler(factor);
        this.composite.accept(handler);
    }

    draw(handler: DrawHanlder){
        this.composite.accept(handler);
    }
    getBoundingBox(): {left: number, right: number, top: number, bottom: number}{
        return {left: 0, right: 0, top: 0, bottom: 0}
    }
}

export class Drawing{
    paperScale = 1;
    figureFactor = 1;
    insertPoint = new Point(0, 0);

    figures: Figure[] = [];
    border: BorderComposite;
    setInsertPoint(point: Point){
        this.insertPoint = point;
    }

    setPaperScale(factor: number){
        for(const fig of this.figures){
            fig.setPaperScale(factor);
        }
        this.border.accept(new PaperScaleHandler(factor));
    }
    layout(){

    }
    draw(handler: DrawHanlder){
        this.layout();
        for(const fig of this.figures){
            fig.draw(handler);
        }
    }
    getBoundingBox(): {left: number, right: number, top: number, bottom: number}{
        return this.figures.map(x=>x.getBoundingBox()).reduce((prev, curr)=>{
            return {
                left: Math.min(prev.left, curr.left),
                right: Math.max(prev.right, curr.right),
                top: Math.max(prev.top, curr.top),
                bottom: Math.min(prev.bottom, curr.top)
            }
        })

    }
}

export class DxfContainer{
    drawings: Drawing[] = [];
    add(draw: Drawing){
        this.drawings.push(draw);
    }
    layout(){
        let x = 0;
        for(const d of this.drawings){
            d.setInsertPoint(new Point(x, 0));
            const {left, right} = d.getBoundingBox();
            x += (right - left);
        }
    }
    draw(name: string){
        this.layout();
        const handler = new DrawHanlder();
        for(const d of this.drawings){
            d.draw(handler);
        }
        handler.saveBlob(name);
    }
}