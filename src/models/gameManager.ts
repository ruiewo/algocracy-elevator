import { Floor } from './floor';
import { Random } from './random';

type WorldOption = {
    seed: number;
    floorCount: number;
    elevatorCount: number;
    spawnRate: number;
};

export const gameManager = (() => {
    let random: Random;

    function createFloor(count: number) {
        const floors = [];
        for (let i = 0; i < count; i++) {
            floors.push(new Floor(i));
        }
        return floors;
    }

    function createElevator(count: number) {
        //
    }

    function createUser(count: number) {
        //
    }

    function createWorld(option: WorldOption) {
        random = new Random(option.seed);

        const floors = createFloor(option.floorCount);
        const elevators = createElevator(option.elevatorCount);

        const world = {};

        return world;
    }

    return {
        createWorld: (option: WorldOption) => {
            createUser(option.floorCount);

            const world = {};

            return world;
        },
    };
})();
