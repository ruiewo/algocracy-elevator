import { Elevator } from './elevator';
import { Floor } from './floor';
import { gameRenderer } from './gameRenderer';
import { World, WorldOption } from './world';
import { WorldController } from './worldController';

export const gameManager = (() => {
    const worldController = new WorldController();

    function start() {
        const world = new World({
            seed: 0,
            floorCount: 0,
            elevatorCount: 0,
            elevatorCapacity: 0,
            spawnRate: 0,
        });

        worldController.start(
            world,
            {
                initialize: (elevators: Elevator[], floors: Floor[]) => {},
                update: (dt: number, elevators: Elevator[], floors: Floor[]) => {},
            },
            window.requestAnimationFrame
        );
    }

    return {
        createWorld: (option: WorldOption) => {
            const world = new World(option);

            return world;
        },
        initialize: gameRenderer.initialize,
        start,
    };
})();
