import { EventHandler } from './eventHandler';
import { AppEvent } from './events';

export class Floor extends EventHandler {
    private index = 0;
    private state = {
        up: false,
        down: false,
    };

    constructor(index: number) {
        super();
        this.index = index;
    }

    up() {
        if (this.state.up === true) {
            return; // do nothing
        }

        this.state.up = true;
        this.trigger(AppEvent.floorStateChanged, this.index);
    }

    down() {
        if (this.state.down === true) {
            return; // do nothing
        }

        this.state.up = true;
        this.trigger(AppEvent.floorStateChanged, this.index, this.state);
    }
}
