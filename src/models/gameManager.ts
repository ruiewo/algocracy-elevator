import { gameRenderer } from './gameRenderer';
import { World, WorldOption } from './world';

export const gameManager = (() => {
    return {
        createWorld: (option: WorldOption) => {
            const world = new World(option);

            return world;
        },
        initialize: gameRenderer.initialize,
    };
})();
