import { CompositeContent, Groupcode } from "./groupcode";
import { Entity } from "./entity";

export class Entities extends CompositeContent<Entity>{
    toGroupcode(root: Groupcode){
        root.push(
            0, 'SECTION',
            2, 'ENTITIES'
        )
        super.toGroupcode(root);
        root.push(0, 'ENDSEC');
    }
}