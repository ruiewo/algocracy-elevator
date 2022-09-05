import { Elevator } from './elevator';
import { EventHandler } from './eventHandler';
import { Floor } from './floor';
import { gameRenderer } from './gameRenderer';

export class User extends EventHandler {
    public floorIndex = 0;
    public destinationFloorIndex = 0;
    private done = false;
    public removeMe = false;
    public isMoving = false;

    // for rendering
    private velocity = 1;
    public currentX = 0;
    public elevatorIndex = -1;

    public dom: HTMLElement;
    public position: number;

    constructor(floor: Floor, destinationFloorIndex: number) {
        super();

        this.floorIndex = floor.index;
        this.destinationFloorIndex = destinationFloorIndex;

        this.position = Math.random();
        this.dom = gameRenderer.spawnUser(this.floorIndex, this.position);

        this.pressFloorButton(floor);
    }

    public update = (deltaTime: number) => {
        if (!this.isMoving) {
            return;
        }

        // calc position
        this.currentX += this.velocity * deltaTime;

        // exit elevator
        if (this.currentX >= 2) {
            this.isMoving = false;
            this.removeMe = true;
            return;
        }

        // go to elevator
        if (Math.abs(1 - this.currentX) < 0.01) {
            this.isMoving = false;
            this.currentX = 1;

            gameRenderer.stickTo(this);
        }
    };

    private pressFloorButton = (floor: Floor) => {
        if (this.destinationFloorIndex < this.floorIndex) {
            floor.pressDownButton();
        } else {
            floor.pressUpButton();
        }
    };

    public enterIfPossible = (elevator: Elevator, floorIndex: number) => {
        if (this.elevatorIndex != -1) {
            // has already on elevator.
            return;
        }

        if (this.floorIndex !== floorIndex) {
            return;
        }

        // check if same direction.
        const isGoingUp = this.floorIndex < this.destinationFloorIndex;
        if (elevator.isGoingUp() !== isGoingUp) {
            return;
        }

        // check if can take elevator.
        if (!elevator.loadUser(this)) {
            return;
        }

        this.isMoving = true;
        this.elevatorIndex = elevator.index;
    };

    public exitIfNeeded = (elevator: Elevator, floorIndex: number) => {
        if (floorIndex !== this.destinationFloorIndex) {
            return;
        }

        this.done = true;
        this.isMoving = true;

        elevator.unloadUser(this);
    };
}
