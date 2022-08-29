import { gameRenderer } from './gameRenderer';
import { World } from './world';

type WorldOption = {
    seed: number;
    floorCount: number;
    elevatorCount: number;
    spawnRate: number;
};

export const gameManager = (() => {
    return {
        createWorld: (option: WorldOption) => {
            const world = new World(option);

            return world;
        },
        initialize: gameRenderer.initialize,
    };
})();
