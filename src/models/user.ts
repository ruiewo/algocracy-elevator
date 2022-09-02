import { Elevator } from './elevator';
import { EventHandler } from './eventHandler';
import { Floor } from './floor';
import { gameRenderer } from './gameRenderer';

export class User extends EventHandler {
    private floorIndex = 0;
    private destinationFloorIndex = 0;
    private done = false;
    private removeMe = false;

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
        // calc position
        // arrived
        // render
    };

    private pressFloorButton = (floor: Floor) => {
        if (this.destinationFloorIndex < this.floorIndex) {
            floor.pressDownButton();
        } else {
            floor.pressUpButton();
        }
    };

    private enterIfPossible = () => {
        //
    };

    private exitIfNeeded = (floorIndex: number, elevator: Elevator) => {
        if (floorIndex !== this.destinationFloorIndex) {
            return;
        }
    };

    static moveTo = () => {
        //
    };
}
