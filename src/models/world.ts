import { Elevator } from './elevator';
import { AppEvent } from './events';
import { Floor } from './floor';
import { gameRenderer } from './gameRenderer';
import { Random } from './random';
import { User } from './user';

export type WorldOption = {
    seed: number;
    floorCount: number;
    elevatorCount: number;
    elevatorCapacity: number;
    spawnRate: number;
    timeLimit: number;
};

export type WorldSetting = {
    floorCount: number;
    elevatorCount: number;
    elevatorCapacity: number;
    spawnRate: number;
    timeLimit: number;
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

    private floorCount = 0;
    public timeLimit = 0;

    constructor(option: WorldOption) {
        this.floorCount = option.floorCount;
        this.timeLimit = option.timeLimit;
        this.random = new Random(option.seed);

        this.floors = this.createFloor(option.floorCount);
        this.elevators = this.createElevator(option.elevatorCount, option.floorCount, option.elevatorCapacity);
        this.users = [];

        for (const elevator of this.elevators) {
            elevator.on(AppEvent.arrived, (_: Elevator, floorIndex: number) => {
                // exit user
                elevator.users.forEach(user => {
                    user.exitIfNeeded(elevator, floorIndex);
                });

                const floor = this.floors[floorIndex];
                floor.clearState();

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
        if (this.elapsedTime > this.timeLimit) {
            this.isEnded = true;
        }

        this.elevators.forEach(x => x.update(deltaTime));
        this.users.forEach(x => x.update(deltaTime));

        for (let i = this.users.length - 1; i >= 0; i--) {
            const user = this.users[i];
            if (user.removeMe) {
                user.trigger(AppEvent.userRemoved);
                this.users.splice(i, 1);
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
        const spawnFloorIndex = this.random.nextInt(0, this.floorCount - 1);
        const destinationFloor = (spawnFloorIndex + this.random.nextInt(1, this.floorCount - 1)) % this.floorCount;

        const user = new User(this.floors[spawnFloorIndex], destinationFloor);
        user.on(AppEvent.userRemoved, () => gameRenderer.removeUser(user));
        user.on(AppEvent.userStateChanged, () => gameRenderer.toggleUserMoving(user));
        gameRenderer.spawnUser(user);

        this.users.push(user);
    };
}
