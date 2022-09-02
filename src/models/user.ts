import { Elevator } from './elevator';
import { EventHandler } from './eventHandler';
import { Floor } from './floor';

export class User extends EventHandler {
    private floorIndex = 0;
    private destinationFloorIndex = 0;
    private done = false;
    private removeMe = false;

    constructor(floor: Floor, destinationFloorIndex: number) {
        super();

        this.floorIndex = floor.index;
        this.destinationFloorIndex = destinationFloorIndex;

        // todo render on floor!!

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
