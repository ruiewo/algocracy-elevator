import { Elevator } from './elevator';
import { Floor } from './floor';
import { gameRenderer } from './gameRenderer';
import { resultBoard } from './resultBoard';
import { World, WorldOption } from './world';
import { WorldController } from './worldController';

export const gameManager = (() => {
    const worldController = new WorldController();
    let world: World;

    const startButton = document.querySelector('.startButton') as HTMLElement;
    startButton.onclick = worldController.togglePlayingState;

    resultBoard.initialize(worldController);

    function run() {
        world = createWorld({
            seed: 0,
            floorCount: 3,
            elevatorCount: 2,
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
        const world = new World(option);
        gameRenderer.createWorld(world);

        return world;
    }

    function toggle() {
        worldController.togglePlayingState();
    }

    return {
        createWorld,
        run,
        toggle,
        get worldSetting() {
            return world.setting;
        },
    };
})();
