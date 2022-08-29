import { Elevator } from './elevator';
import { Floor } from './floor';
import { Random } from './random';

type WorldOption = {
    seed: number;
    floorCount: number;
    elevatorCount: number;
    spawnRate: number;
};

export class World {
    private random: Random;
    public floors: Floor[];
    public elevators: Elevator[];
    public isEnded = false;

    constructor(option: WorldOption) {
        this.random = new Random(option.seed);

        this.floors = this.createFloor(option.floorCount);
        this.elevators = this.createElevator(option.elevatorCount);
    }

    createFloor = (count: number) => {
        const floors = [];
        for (let i = 0; i < count; i++) {
            floors.push(new Floor(i));
        }
        return floors;
    };

    createElevator = (count: number) => {
        return [];
    };

    createUser = (count: number) => {
        //
    };
}
