import { Elevator } from './elevator';
import { EventHandler } from './eventHandler';
import { Floor } from './floor';
import { gameRenderer } from './gameRenderer';

export class User extends EventHandler {
    private floorIndex = 0;
    private destinationFloorIndex = 0;
    private done = false;
    public removeMe = false;
    public isMoving = false;

    // for rendering
    private velocity = 1;
    public currentX = 0;
    public elevatorIndex: number | null = null;

    public dom: HTMLElement;

    constructor(floor: Floor, destinationFloorIndex: number) {
        super();

        this.floorIndex = floor.index;
        this.destinationFloorIndex = destinationFloorIndex;

        // todo render on floor!!
        this.dom = gameRenderer.spawnUser(this.floorIndex);

        this.pressFloorButton(floor);
    }

    public update = (deltaTime: number) => {
        if (!this.isMoving) {
            return;
        }

        // calc position
        this.currentX += this.velocity * deltaTime;

        if (this.elevatorIndex) {
            // go to elevator
            if (Math.abs(1 - this.currentX) < 0.01) {
                this.isMoving = false;
                this.currentX = 1;
            }
        } else {
            // exit elevator
            if (this.currentX >= 2) {
                this.isMoving = false;
                this.removeMe = true;
            }
        }
    };

    private pressFloorButton = (floor: Floor) => {
        if (this.destinationFloorIndex < this.floorIndex) {
            floor.pressDownButton();
        } else {
            floor.pressUpButton();
        }
    };

    private enterIfPossible = (elevator: Elevator) => {
        const isGoingUp = this.floorIndex < this.destinationFloorIndex;
        if (elevator.isGoingUp() !== isGoingUp) {
            return;
        }

        this.isMoving = true;
        this.elevatorIndex = elevator.index;
    };

    private exitIfNeeded = (floorIndex: number, elevator: Elevator) => {
        if (floorIndex !== this.destinationFloorIndex) {
            return;
        }

        this.isMoving = true;
    };

    static moveTo = () => {
        //
    };
}
