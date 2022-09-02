import { EventHandler } from './eventHandler';
import { AppEvent } from './events';
import { User } from './user';

export class Elevator extends EventHandler {
    private index = 0;
    private floorCount = 0;
    private capacity = 4;
    private currentFloor = 0;
    private destinationFloor = 0;
    private buttonState: boolean[];
    private isMoving = false;
    private userSlot: User[] = [];

    // for rendering
    private velocity = 1;
    private currentY = 0;

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

    public update = (deltaTime: number) => {
        // calc position
        this.currentY += this.velocity * deltaTime;

        // arrived
        if (this.isMoving && Math.abs(this.destinationFloor - this.currentY) < 0.01) {
            this.currentY = this.destinationFloor; // snap to floor
            this.velocity = 0;
            this.isMoving = false;
            this.trigger('arrived', this, this.destinationFloor);
        }

        // render
        // move elevator & users in elevator
    };

    private getTargetFloors = () => {
        const floors: number[] = [];
        this.buttonState.forEach((state, i) => {
            if (state) {
                floors.push(i);
            }
        });

        return floors;
    };

    private goTo = (floorIndex: number) => {
        this.isMoving = true;
    };

    private loadUser = (user: User) => {
        if (this.userSlot.length === this.capacity) {
            return false;
        }

        this.userSlot.push(user);
        return true;
    };

    private unloadUser = (user: User) => {
        this.userSlot = this.userSlot.filter(x => x !== user);
    };
}
