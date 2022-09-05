import { EventHandler } from './eventHandler';
import { User } from './user';

export type Motion = 'up' | 'down' | 'stay';

export class Elevator extends EventHandler {
    public index = 0;
    private floorCount = 0;
    private capacity = 4;
    private currentFloor = 0;
    private destinationFloor = 0;
    private buttonState: boolean[];
    // private isMoving = false;
    private isMoving = true;
    public users: User[] = [];

    // waiting on floor
    private isWaiting = false;
    private waitingTime = 1; //msec
    private currentWaitingTime = 0; //msec

    // for rendering
    private velocity = 1;
    public currentY = 0;

    private state: {
        up: boolean;
        down: boolean;
        motion: Motion;
    } = {
        up: false,
        down: false,
        motion: 'up',
    };

    constructor(index: number, floorCount: number, capacity: number) {
        super();
        this.index = index;
        this.floorCount = floorCount;
        this.capacity = capacity || 4;
        this.buttonState = new Array(floorCount).fill(false);
    }

    public update = (deltaTime: number) => {
        if (this.checkWaiting(deltaTime)) {
            return;
        }

        if (!this.isMoving) {
            return;
        }

        // calc position
        this.currentY += this.velocity * deltaTime;

        // upper limit or arrived
        if (this.currentY > this.floorCount - 1 || Math.abs(this.destinationFloor - this.currentY) < 0.01) {
            this.currentFloor = this.destinationFloor;
            this.currentY = this.destinationFloor; // snap to floor
            this.velocity = 0;
            this.isMoving = false;

            const nextFloor = this.getNextDestinationFloor();
            this.state.motion =
                nextFloor > this.currentFloor ? 'up' : nextFloor === this.currentFloor ? 'stay' : 'down';
            console.log(this.state.motion);

            this.trigger('arrived', this, this.currentFloor);

            this.startWaiting();
        }
    };

    private startWaiting() {
        this.isWaiting = true;
    }

    private checkWaiting(deltaTime: number) {
        if (!this.isWaiting) {
            return false;
        }

        this.currentWaitingTime += deltaTime;
        if (this.currentWaitingTime > this.waitingTime) {
            this.currentWaitingTime = 0;
            this.isWaiting = false;
            this.goTo(this.getNextDestinationFloor());
        }

        return true;
    }

    public isGoingUp() {
        return this.state.motion === 'up';
        // return this.velocity > 0;
    }

    private getTargetFloors = () => {
        const floors: number[] = [];
        this.buttonState.forEach((state, i) => {
            if (state) {
                floors.push(i);
            }
        });

        return floors;
    };

    private getNextDestinationFloor() {
        // todo replace
        // just move one stairs.

        // if (this.currentFloor + 1 > this.floorCount) {
        //     return this.currentFloor - 1;
        // } else {
        //     return this.currentFloor + 1;
        // }

        return (this.currentFloor + 1) % this.floorCount;
    }

    private calcVelocity(isUpward: boolean) {
        return isUpward ? 1 : -1;
    }

    // todo be private
    public goTo = (floorIndex: number) => {
        this.destinationFloor = floorIndex;
        this.isMoving = true;

        if (floorIndex === this.currentFloor) {
            this.isMoving = false;
            this.velocity = 0;
        } else {
            const isUpward = floorIndex > this.currentFloor;
            this.velocity = this.calcVelocity(isUpward);
        }
    };

    public loadUser = (user: User) => {
        if (this.users.length === this.capacity) {
            return false;
        }

        this.users.push(user);
        return true;
    };

    public unloadUser = (user: User) => {
        this.users = this.users.filter(x => x !== user);
    };
}
