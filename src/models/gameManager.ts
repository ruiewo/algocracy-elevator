import { Editor, UserCode } from '../components/editor';
import { Elevator } from './elevator';
import { AppEvent } from './events';
import { Floor } from './floor';
import { gameRenderer } from './gameRenderer';
import { World, WorldOption } from './world';
import { worldController } from './worldController';

export const gameManager = (() => {
    let world: World;

    function run(editor: Editor) {
        world = createWorld({
            seed: 0,
            floorCount: 4,
            elevatorCount: 2,
            elevatorCapacity: 4,
            spawnRate: 2,
            timeLimit: 30,
        });

        let userCode: UserCode;
        if (true) {
            userCode = editor.getCode();
            console.log(userCode);
        } else {
            userCode = {
                initialize: (elevators: Elevator[], floors: Floor[]) => {
                    elevators.forEach((elevator, i) => {
                        elevator.on(AppEvent.idle, () => {
                            for (let i = 0; i < floors.length; i++) {
                                const state = floors[i].getState();
                                if (state.up || state.down) {
                                    elevator.destinationQUeue.enqueue(i);
                                }
                            }
                        });
                    });
                },
                update: (dt: number, elevators: Elevator[], floors: Floor[]) => {},
            };
        }

        worldController.start(world, userCode, window.requestAnimationFrame, false);
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
