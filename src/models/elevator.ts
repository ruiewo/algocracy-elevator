import { EventHandler } from './eventHandler';
import { AppEvent } from './events';
import { User } from './user';

export type Motion = 'up' | 'down' | 'stay';

export class Elevator extends EventHandler {
    public index = 0;
    private floorCount = 0;
    private capacity = 4;
    private currentFloor = 0;
    private destinationFloor = 0;
    private buttonState: boolean[];
    private isMoving = false;
    public users: User[] = [];

    // waiting on floor
    private isWaiting = false;
    private waitingTime = 1; // sec
    private currentWaitingTime = 0; // sec

    // for rendering
    private velocityMax = 2;
    private velocity = 0;
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
        if (this.isWaiting) {
            this.waitForTime(deltaTime);
            return;
        }

        if (!this.isMoving) {
            return;
        }

        // calc position
        this.currentY += this.velocity * deltaTime;

        // upper limit or arrived
        if (this.currentY > this.floorCount - 1 || Math.abs(this.destinationFloor - this.currentY) < 0.01) {
            this.arrived();
        }
    };

    public pressButton = (floorIndex: number) => {
        const alreadyPressed = this.buttonState[floorIndex];
        if (alreadyPressed) {
            return;
        }

        this.trigger(AppEvent.elevatorButtonPressed, floorIndex);
    };

    public isGoingUp = () => {
        return this.state.motion === 'up';
    };

    // todo be private
    public goTo = (floorIndex: number) => {
        this.destinationFloor = floorIndex;
        this.isMoving = true;

        if (floorIndex === this.currentFloor) {
            this.arrived();
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
        this.trigger(AppEvent.userExited, this.currentFloor);
    };

    private getNextDestinationFloor = () => {
        // todo replace
        return (this.currentFloor + 1) % this.floorCount;
    };

    private calcVelocity = (isUpward: boolean) => {
        return isUpward ? this.velocityMax : -this.velocityMax;
    };

    private arrived = () => {
        this.currentFloor = this.destinationFloor;
        this.currentY = this.destinationFloor; // snap to floor
        this.startWaiting();

        const nextFloor = this.getNextDestinationFloor();
        this.state.motion = nextFloor > this.currentFloor ? 'up' : nextFloor === this.currentFloor ? 'stay' : 'down';

        this.trigger(AppEvent.arrived, this, this.currentFloor);
    };

    private startWaiting = () => {
        this.velocity = 0;
        this.isMoving = false;
        this.isWaiting = true;
        this.currentWaitingTime = 0;
    };

    private waitForTime = (deltaTime: number) => {
        this.currentWaitingTime += deltaTime;
        if (this.currentWaitingTime > this.waitingTime) {
            this.isWaiting = false;
            this.goTo(this.getNextDestinationFloor());
        }
    };
}
