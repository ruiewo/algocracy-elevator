import { EventHandler } from './eventHandler';
import { AppEvent } from './events';

export type FloorState = {
    up: boolean;
    down: boolean;
};

export class Floor extends EventHandler {
    public index = 0;

    private state = {
        up: false,
        down: false,
    };

    constructor(index: number) {
        super();
        this.index = index;
    }

    pressUpButton = () => {
        if (this.state.up === true) {
            return; // do nothing
        }

        this.state.up = true;
        this.trigger(AppEvent.floorStateChanged, this.state);
    };

    pressDownButton = () => {
        if (this.state.down === true) {
            return; // do nothing
        }

        this.state.down = true;
        this.trigger(AppEvent.floorStateChanged, this.state);
    };

    clearState = () => {
        this.state.up = false;
        this.state.down = false;
        this.trigger(AppEvent.floorStateChanged, this.state);
    };

    getState = () => {
        // todo should be readonly
        return this.state;
    };
}
