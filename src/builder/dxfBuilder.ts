import { DXF, DXFClass, TableAppID, AppID, TableBlock, TableDimStyle, TableLType, TableLayer, LType, TableUCS, TableView, TableVPort, TableStyle, Layer, Style, DimStyle, BlockRecord, Block } from "../component";
import { Variable } from "../component/header";
import { Dictionary, Layout } from "../component/objects";
import { SpaceBuilder } from "./spaceBuilder";
import { LineData, ColorIndex, LayerData, PaperSizeData } from "../common";

export class DXFBuilder {
    private dxf = new DXF();
    
    modelSpace: SpaceBuilder;
    paperSpace: SpaceBuilder;

    constructor() {
        // header
        this.initHeader();
        // classes
        this.initClasses();
        // tables
        this.initTables();
        // blocks
        // entities
        // objects
        this.initObjects();

        // space
        this.initModelSpace();
        this.initPaperSpace();
    }

    private initHeader() {
        this.dxf.header.push(new Variable('ACADVER', 1, 'AC1021'));
    }
    private initClasses() {
        this.dxf.classes.push(new DXFClass('WIPEOUTVARIABLES', 'AcDbWipeoutVariables', `WipeOut|Product Desc:     WipeOut Dbx Application|Company:          Autodesk, Inc.|WEB Address:      www.autodesk.com`, 0, 1, 0, 0));
    }
    private initTables() {
        const dxf = this.dxf;
        const t = dxf.tables;
        t.tableAppID = new TableAppID(dxf.Handle);
        t.tableBlock = new TableBlock(dxf.Handle);
        t.tableDimStyle = new TableDimStyle(dxf.Handle);
        t.tableLType = new TableLType(dxf.Handle);
        t.tableLayer = new TableLayer(dxf.Handle);
        t.tableStyle = new TableStyle(dxf.Handle);
        t.tableUCS = new TableUCS(dxf.Handle);
        t.tableVPort = new TableVPort(dxf.Handle);
        t.tableView = new TableView(dxf.Handle);

        // appid
        t.tableAppID.push(new AppID('ACAD', dxf.Handle)); 
        // ltype
        const center = LineData.get('CENTER')!;
        const dashed = LineData.get('DASHED')!;
        t.tableLType.push(
            new LType(LineData.get('CONTINUOUS')!.name, dxf.Handle), 
            new LType(LineData.get('ByLayer')!.name, dxf.Handle), 
            new LType(LineData.get('ByBlock')!.name, dxf.Handle), 
            new LType(center.name, dxf.Handle, center.desc, center.data),
            new LType(dashed.name, dxf.Handle, dashed.desc, dashed.data)
        );
        // layer
        t.tableLayer.push(
            new Layer('0', dxf.Handle),
            new Layer('Defpoints', dxf.Handle, 'CONTINUOUS', ColorIndex.gray, true),
            new Layer(LayerData.get('THIN')!, dxf.Handle, 'CONTINUOUS', ColorIndex.green),
            new Layer(LayerData.get('MID')!, dxf.Handle, 'CONTINUOUS', ColorIndex.yellow),
            new Layer(LayerData.get('THICK')!, dxf.Handle, 'CONTINUOUS', ColorIndex.red),
            new Layer(LayerData.get('THICKER')!, dxf.Handle, 'CONTINUOUS', ColorIndex.magenta),
            new Layer(LayerData.get('DASHED')!, dxf.Handle, 'DASHED', ColorIndex.blue),
            new Layer(LayerData.get('CENTER')!, dxf.Handle, 'CENTER', ColorIndex.cyan),
            new Layer(LayerData.get('TEXT')!, dxf.Handle, 'CONTINUOUS', ColorIndex.green),
            new Layer(LayerData.get('FILL')!, dxf.Handle, 'CONTINUOUS', ColorIndex.green),
        );
        // style
        t.tableStyle.push(
            new Style('STANDARD', dxf.Handle),
            new Style('HZ', dxf.Handle, 'simplex', 'hztxt'),
            new Style('TITLE', dxf.Handle, 'simplex', 'hztxt', 1.0)
        );
        // dimstyle
        t.tableDimStyle.push(
            new DimStyle('STANDARD', dxf.Handle, t.tableStyle.styles['STANDARD']),
            new DimStyle('100', dxf.Handle, t.tableStyle.styles['HZ'], 0.1, 1000)
        )
    }
    private initObjects() {
        const dxf = this.dxf;
        const obj = dxf.objects;
        obj.root = new Dictionary('root', dxf.Handle, '0');
        obj.groupDict = new Dictionary('ACAD_GROUP', dxf.Handle, obj.root.handle);
        obj.layoutDict = new Dictionary('ACAD_LAYOUT', dxf.Handle, obj.root.handle);
        obj.root.push(obj.groupDict, obj.layoutDict);
    }
    private initModelSpace(){
        const dxf = this.dxf;
        const name = '*MODEL_SPACE';
        const recordHandle = dxf.Handle;
        // blockrecord
        dxf.tables.tableBlock.push(new BlockRecord(name, recordHandle));
        // block
        dxf.blocks.push(new Block(name, '0', dxf.Handle, dxf.Handle, 0, 0));
        // space
        this.modelSpace = new SpaceBuilder(dxf, dxf.entities,recordHandle, 0);
    }
    private initPaperSpace(){
        this.paperSpace = this.newPaperSpace('A1');
    }

    newPaperSpace(paperSize: 'A1' | 'A2' | 'A3'){
        const dxf = this.dxf;
        const name = dxf.PaperspaceName;
        const recordHandle = dxf.Handle;
        // paper size
        const size = PaperSizeData.get(paperSize)!
        // blockrecord
        dxf.tables.tableBlock.push(new BlockRecord(name, recordHandle));
        // block
        dxf.blocks.push(new Block(name, '0', dxf.Handle, dxf.Handle, 0, 0));
        // layout
        const layout = new Layout(
            name.replace('*PAPER_SPACE', 'Layout'),
            dxf.Handle,
            dxf.objects.layoutDict.handle,
            recordHandle,
            paperSize
        )
        dxf.objects.layoutDict.push(layout);
        dxf.objects.push(layout);
        // space
        const paper = new  SpaceBuilder(dxf, dxf.entities,recordHandle, 1);
        paper.viewport(0, 0, 0, size.height/2, size.width, size.height, 1, 0)
        return paper
    }
    newBlock(name: string){
        const dxf = this.dxf;
        dxf.blockNameStore.push(name);
        const recordHandle = dxf.Handle;
        // blockrecord
        dxf.tables.tableBlock.push(new BlockRecord(name, recordHandle));
        // block
        const block = new Block(name, '0', dxf.Handle, dxf.Handle, 0, 0)
        dxf.blocks.push(block);
        // blockBuilder
        return new SpaceBuilder(dxf, block, recordHandle, 0);
    }

    saveBlob(name: string) {
        this.dxf.header.push(new Variable('HANDSEED', 5, this.dxf.Handle));

        this.dxf.saveBlob(name);
    }
}


export function dxfDemo() {
    const builder = new DXFBuilder();
    const model = builder.modelSpace;
    // const paper = builder.paperSpace;
    // model.line(0, 0, 100, 100);
    // model.text('hello world', 0, 0);
    // model.setLayer('中粗线').line(100, 100, 200, 100);
    // model.lwpolyline(
    //     0, 0, 0,
    //     100, 0, 0,
    //     100, 100, 0,
    //     0, 100, 0,
    //     0, 0, 0
    // );
    // model.arc(0, 0, 100, 0, 180);
    // model.circle(100, 100, 50);
    // model.dimArcLength(0, 0, 100, 100, 0, 100, 100, 0);
    // model.dimDiameter(0, 0, 100, 100);
    // model.dimLineAngle(100, 100, 0, 0, 0, 100, 0, 0, 100, 0);
    // model.dimPointAngle(100, 100, 0, 0, 100, 0, 0, 100);
    // model.dimRadius(0, 0, 100, 100);
    // model.dimRotate(0, 0, 100, 100, 45, 50, 45);
    // model.ellipse(0, 0, 1, 1, 0.5, 0, 360);
    // model.mtext('hello world hello again', 0, 0, 10, 20);
    // builder.newBlock('hello').line(0, 0, 100, 100);
    // model.insert('hello', 50, 50, 1, 2, 0);
    // model.wipeout(0, 0, 100, 0, 100, 100, 0, 0);
    // paper.circle(0, 0, 100);
    // paper.viewport(0, 0, 50, 50, 50, 50, 2, 0);
    // model.hatchEdge('ANSI31', 0).arc(0, 0, 50, 0, 180, true).line(-50, 0, 50, 0);
    model.hatch('ANSI31', 0).polyline(100, 100, 0, 120, 100, 0, 120, 120, 0, 100, 120, 0, 100, 100, 0);
    builder.saveBlob('dxf测试');
}