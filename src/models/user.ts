import { Elevator } from './elevator';
import { EventHandler } from './eventHandler';
import { Floor } from './floor';
import { gameRenderer } from './gameRenderer';

export class User extends EventHandler {
    private floorIndex = 0;
    private destinationFloorIndex = 0;

    private isMoving = false;
    private done = false;
    public removeMe = false;

    // for rendering
    private velocity = 1;
    public currentX = 0;
    public elevatorIndex = -1;

    public dom: HTMLElement;
    public position: number;

    private pressFloorButton: () => void;

    constructor(floor: Floor, destinationFloorIndex: number) {
        super();

        this.floorIndex = floor.index;
        this.destinationFloorIndex = destinationFloorIndex;

        this.position = Math.random();
        this.dom = gameRenderer.spawnUser(this.floorIndex, this.position);

        this.pressFloorButton =
            this.destinationFloorIndex > this.floorIndex ? floor.pressUpButton : floor.pressDownButton;
        this.pressFloorButton();
    }

    public update = (deltaTime: number) => {
        if (!this.isMoving) {
            return;
        }

        // calc position
        this.currentX += this.velocity * deltaTime;

        // exit elevator
        if (this.currentX >= 2) {
            this.setMovingState(false);
            this.removeMe = true;
            return;
        }

        // go to elevator
        if (!this.done && this.currentX > 0.99) {
            this.setMovingState(false);
            this.currentX = 1;
            this.done = true;

            gameRenderer.stickTo(this);
        }
    };

    public enterIfPossible = (elevator: Elevator, floorIndex: number) => {
        if (this.elevatorIndex != -1) {
            return; // already on elevator.
        }

        if (this.floorIndex !== floorIndex) {
            return;
        }

        // check if same direction.
        // if (elevator.isGoingUp() !== this.floorIndex < this.destinationFloorIndex) {
        //     this.pressFloorButton();
        //     return;
        // }

        // check if can take elevator.
        if (!elevator.loadUser(this)) {
            this.pressFloorButton();
            return;
        }

        this.elevatorIndex = elevator.index;
        elevator.pressButton(this.destinationFloorIndex);

        this.setMovingState(true);
    };

    public exitIfNeeded = (elevator: Elevator, floorIndex: number) => {
        if (floorIndex !== this.destinationFloorIndex) {
            return;
        }

        elevator.unloadUser(this);

        this.setMovingState(true);
    };

    private setMovingState = (state: boolean) => {
        if (this.isMoving !== state) {
            gameRenderer.toggleUserMoving(this);
        }

        this.isMoving = state;
    };
}
