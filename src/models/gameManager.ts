import { Elevator } from './elevator';
import { Floor } from './floor';
import { gameRenderer } from './gameRenderer';
import { World, WorldOption } from './world';
import { WorldController } from './worldController';

export const gameManager = (() => {
    const worldController = new WorldController();
    let world: World;

    run();

    function run() {
        world = createWorld({
            seed: 0,
            floorCount: 3,
            elevatorCount: 1,
            elevatorCapacity: 4,
            spawnRate: 0,
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
        return new World(option);
    }

    function toggle() {
        worldController.togglePlayingState();
    }

    return {
        createWorld: (option: WorldOption) => {
            const world = new World(option);

            return world;
        },
        initialize: gameRenderer.initialize,
        toggle,
        get worldSetting() {
            return world.setting;
        },
    };
})();
