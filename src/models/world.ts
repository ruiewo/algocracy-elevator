import { Elevator } from './elevator';
import { Floor } from './floor';
import { Random } from './random';
import { User } from './user';

export type WorldOption = {
    seed: number;
    floorCount: number;
    elevatorCount: number;
    elevatorCapacity: number;
    spawnRate: number;
};

export type WorldSetting = {
    floorCount: number;
    elevatorCount: number;
    elevatorCapacity: number;
};

export class World {
    private random: Random;
    public floors: Floor[];
    public elevators: Elevator[];
    public users: User[];

    public isEnded = false;
    public unitCount = 0;
    public elapsedTime = 0.0;
    public waitingTimeMax = 0.0;
    public waitingTimeTotal = 0.0;

    private worldSetting: WorldSetting;

    constructor(option: WorldOption) {
        this.random = new Random(option.seed);

        this.floors = this.createFloor(option.floorCount);
        this.elevators = this.createElevator(option.elevatorCount, option.floorCount, option.elevatorCapacity);
        this.users = [];

        this.worldSetting = {
            floorCount: option.floorCount,
            elevatorCount: option.elevatorCount,
            elevatorCapacity: option.elevatorCapacity,
        };
    }

    createFloor = (count: number) => {
        const floors = [];
        for (let i = 0; i < count; i++) {
            floors.push(new Floor(i));
        }
        return floors;
    };

    createElevator = (count: number, floorCount: number, capacity: number) => {
        const elevators = [];
        for (let i = 0; i < count; i++) {
            elevators.push(new Elevator(i, floorCount, capacity));
        }
        return elevators;
    };

    createUser = (count: number) => {
        //
    };

    update = (deltaTime: number) => {
        this.elapsedTime += deltaTime;
    };

    get setting() {
        return this.worldSetting;
    }
}
