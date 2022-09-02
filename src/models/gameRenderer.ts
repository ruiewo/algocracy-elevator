import { World } from './world';

type GameObjects = {
    time: string;
};

export const gameRenderer = (() => {
    const game = document.querySelector('.game')!;
    const rect = game.getBoundingClientRect();
    const gameWidth = rect.width;

    const floorHight = 60; // px
    function createFloor(index: number) {
        return `<div class="floor" style="bottom: ${
            floorHight * index
        }px"><span class="label">${index}</span><span class="indicator up active">▲</span><span class="indicator down">▼</span></div>`;
    }

    const elevatorWidth = 60; // px
    function createElevator(index: number, padLeft: number) {
        return `<div class="elevator" style="left: ${
            padLeft + elevatorWidth * index
        }px; bottom: 0px"><span class="label">${index}</span><span class="indicator up active">▲</span><span class="indicator down">▼</span></div>`;
    }

    function createWorld(world: World) {
        let html = ``;
        for (let i = 0; i < world.floors.length; i++) {
            html += createFloor(i);
        }

        const elevatorCount = world.elevators.length;
        const padLeft = (gameWidth - elevatorWidth * elevatorCount) / 2;
        for (let i = 0; i < elevatorCount; i++) {
            html += createElevator(i, padLeft);
        }

        game.innerHTML = html;
    }

    return {
        createWorld,
    };
})();
