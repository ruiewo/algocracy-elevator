import { EventHandler } from './eventHandler';

export class User extends EventHandler {
    private floorIndex = 0;
    constructor(floorIndex: number) {
        super();

        this.floorIndex = floorIndex;
    }
}
