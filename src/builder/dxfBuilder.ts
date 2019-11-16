import { DXF, DXFClass, TableAppID, AppID, TableBlock, TableDimStyle, TableLType, TableLayer, LType, TableUCS, TableView, TableVPort, TableStyle, Layer, Style, DimStyle, BlockRecord, Block } from "../component";
import { Variable } from "../component/header";
import { Dictionary, Layout } from "../component/objects";
import { SpaceBuilder } from "./spaceBuilder";
import { LineTypeData, ColorIndex } from "../common";

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
        const center = LineTypeData.center;
        const dashed = LineTypeData.dashed;
        t.tableLType.push(
            new LType('CONTINUOUS', dxf.Handle), 
            new LType('ByLayer', dxf.Handle), 
            new LType('ByBlock', dxf.Handle), 
            new LType(center.name, dxf.Handle, center.desc, center.data),
            new LType(dashed.name, dxf.Handle, dashed.desc, dashed.data)
        );
        // layer
        t.tableLayer.push(
            new Layer('0', dxf.Handle),
            new Layer('Defpoints', dxf.Handle, 'CONTINUOUS', ColorIndex.gray, true),
            new Layer('细实线', dxf.Handle, 'CONTINUOUS', ColorIndex.green),
            new Layer('中粗线', dxf.Handle, 'CONTINUOUS', ColorIndex.yellow),
            new Layer('粗线', dxf.Handle, 'CONTINUOUS', ColorIndex.red),
            new Layer('加粗线', dxf.Handle, 'CONTINUOUS', ColorIndex.magenta),
            new Layer('虚线', dxf.Handle, 'DASHED', ColorIndex.blue),
            new Layer('中心线', dxf.Handle, 'CENTER', ColorIndex.cyan)
        );
        // style
        t.tableStyle.push(
            new Style('STANDARD', dxf.Handle)
        );
        // dimstyle
        t.tableDimStyle.push(
            new DimStyle('STANDARD', dxf.Handle, t.tableStyle.styles['STANDARD'])
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
        return this.newPaperSpace('A1');
    }
    newPaperSpace(paperSize: 'A1' | 'A2' | 'A3'){
        const dxf = this.dxf;
        const name = dxf.PaperspaceName;
        const recordHandle = dxf.Handle;
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
        return new SpaceBuilder(dxf, dxf.entities,recordHandle, 1);

    }



    saveBlob(name: string) {
        this.dxf.header.push(new Variable('HANDSEED', 5, this.dxf.Handle));

        this.dxf.saveBlob(name);
    }
}


export function dxfDemo() {
    const builder = new DXFBuilder();
    const model = builder.modelSpace;
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
    model.hatch(
        'ansi31', 
        0,
        100, 100, 0,
        120, 100, 0,
        120, 120, 0,
        100, 120, 0,
        100, 100, 0
    )
    builder.saveBlob('dxf测试');
}