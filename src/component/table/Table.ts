import { Content, CompositeContent } from "../groupcode";
export abstract class TableItem extends Content {
}
export class Table extends CompositeContent<TableItem>{}
