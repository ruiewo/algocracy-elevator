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
    spawnRate: number;
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

    public elapsedSinceSpawn = 0;
    public spawnInterval = 0;
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
            spawnRate: option.spawnRate,
        };

        for (const elevator of this.elevators) {
            elevator.on('arrived', (_: Elevator, floorIndex: number) => {
                // exit user
                elevator.users.forEach(user => {
                    user.exitIfNeeded(elevator, floorIndex);
                });

                // enter user
                this.users.forEach(user => {
                    user.enterIfPossible(elevator, floorIndex);
                });
            });
        }

        this.spawnInterval = 1 / option.spawnRate;
    }

    update = (deltaTime: number) => {
        this.elapsedTime += deltaTime;

        this.elevators.forEach(x => x.update(deltaTime));
        this.users.forEach(x => x.update(deltaTime));

        for (let i = this.users.length - 1; i >= 0; i--) {
            const user = this.users[i];
            if (user.removeMe) {
                this.users.splice(i, 1);
                user.dom.remove();
            }
        }

        this.elapsedSinceSpawn += deltaTime;
        if (this.elapsedSinceSpawn > this.spawnInterval) {
            this.elapsedSinceSpawn -= this.spawnInterval;
            this.spawnUser();
        }
    };

    private createFloor = (count: number) => {
        const floors = [];
        for (let i = 0; i < count; i++) {
            floors.push(new Floor(i));
        }
        return floors;
    };

    private createElevator = (count: number, floorCount: number, capacity: number) => {
        const elevators = [];
        for (let i = 0; i < count; i++) {
            elevators.push(new Elevator(i, floorCount, capacity));
        }
        return elevators;
    };

    private spawnUser = () => {
        const spawnFloorIndex = this.random.nextInt(0, this.worldSetting.floorCount - 1);
        const destinationFloor =
            (spawnFloorIndex + this.random.nextInt(1, this.worldSetting.floorCount - 1)) % this.worldSetting.floorCount;

        this.users.push(new User(this.floors[spawnFloorIndex], destinationFloor));
    };
}
