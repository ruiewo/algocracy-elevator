import { EventHandler } from './eventHandler';
import { AppEvent } from './events';

export class Elevator extends EventHandler {
    private index = 0;
    private floorCount = 0;
    private capacity = 4;
    private currentFloor = 0;
    private buttonState: boolean[];
    private isMoving = false;

    private state = {
        up: false,
        down: false,
    };

    constructor(index: number, floorCount: number, capacity: number) {
        super();
        this.index = index;
        this.floorCount = floorCount;
        this.capacity = capacity || 4;
        this.buttonState = new Array(floorCount).fill(false);
    }

    private getTargetFloors() {
        const floors: number[] = [];
        this.buttonState.forEach((state, i) => {
            if (state) {
                floors.push(i);
            }
        });

        return floors;
    }

    private goTo(floorIndex: number) {
        this.isMoving = true;
    }

    private loadUser() {
        //
    }

    private unloadUser() {
        //
    }
}
