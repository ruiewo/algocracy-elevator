import { Elevator } from './elevator';
import { Floor } from './floor';
import { gameRenderer } from './gameRenderer';
import { World, WorldOption } from './world';
import { WorldController } from './worldController';

export const gameManager = (() => {
    const worldController = new WorldController();
    let world: World;

    function run() {
        world = createWorld({
            seed: 0,
            floorCount: 4,
            elevatorCount: 2,
            elevatorCapacity: 4,
            spawnRate: 2,
            timeLimit: 10,
        });

        worldController.start(
            world,
            {
                initialize: (elevators: Elevator[], floors: Floor[]) => {},
                update: (dt: number, elevators: Elevator[], floors: Floor[]) => {},
            },
            window.requestAnimationFrame,
            false
        );
    }

    function createWorld(option: WorldOption) {
        const world = new World(option);
        gameRenderer.loadWorld(world);

        return world;
    }

    return {
        run,
    };
})();
