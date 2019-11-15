import { Groupcode, Content } from "./groupcode";
import { 
    TableAppID, TableBlock, 
    TableDimStyle, TableLayer, TableLType, 
    TableUCS, TableView, TableVPort, TableStyle 
} from "./table";

export class Tables extends Content{
    tableAppID: TableAppID;
    tableBlock: TableBlock;
    tableDimStyle: TableDimStyle;
    tableLayer: TableLayer;
    tableLType: TableLType;
    tableStyle: TableStyle;
    tableUCS: TableUCS;
    tableView: TableView;
    tableVPort: TableVPort;
    toGroupcode(root: Groupcode){
        root.push( 0, 'SECTION', 2, 'TABLES')
        this.tableAppID.toGroupcode(root);
        this.tableBlock.toGroupcode(root);
        this.tableDimStyle.toGroupcode(root);
        this.tableLayer.toGroupcode(root);
        this.tableLType.toGroupcode(root);
        this.tableStyle.toGroupcode(root);
        this.tableUCS.toGroupcode(root);
        this.tableView.toGroupcode(root);
        this.tableVPort.toGroupcode(root);
        root.push(0, 'ENDSEC');
    }
}