import { CountDown } from '../components/countDown';
import { AppEvent } from './events';
import { World } from './world';
import { WorldController } from './worldController';

type GameObjects = {
    time: string;
};
type GameResult = {
    isPlaying: boolean;
    time: string;
    unit: string;
    unitPerSec: string;
    waitingTimeAvg: string;
    waitingTimeMax: string;
};

export const gameRenderer = (() => {
    const game = document.querySelector('.game')!;
    const rect = game.getBoundingClientRect();
    const gameWidth = rect.width;

    const result = document.querySelector('.result')!;
    const startButton = result.querySelector('button')!;

    const time = result.querySelector<HTMLElement>('[data-tag="time"]')!;
    const unit = result.querySelector<HTMLElement>('[data-tag="unit"]')!;
    const unitPerSec = result.querySelector<HTMLElement>('[data-tag="unitPerSec"]')!;
    const waitingAvg = result.querySelector<HTMLElement>('[data-tag="waitingAvg"]')!;
    const waitingMax = result.querySelector<HTMLElement>('[data-tag="waitingMax"]')!;

    const countDown = new CountDown();
    result.appendChild(countDown);

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

    function update(elapsedTime: number) {
        // setGameResult({
        //     isPlaying: false,
        //     time: convertTime(elapsedTime),
        //     unit: '5',
        //     unitPerSec: '0.0',
        //     waitingTimeAvg: '00:00',
        //     waitingTimeMax: '00:00',
        // });
        const timeStr = convertTime(elapsedTime);
        time.textContent = timeStr;

        countDown.update(convertTime2(elapsedTime));
    }

    function initialize(worldController: WorldController) {
        worldController.on(AppEvent.playStateChanged, (isPlaying: boolean) => {
            startButton.textContent = isPlaying ? 'Stop' : 'Start';
        });
    }

    return {
        initialize,
        update,
        createWorld,
    };
})();

function convertTime(timeSec: number) {
    const min = Math.floor(timeSec / 60)
        .toString()
        .padStart(2, '0');
    const sec = Math.floor(timeSec % 60)
        .toString()
        .padStart(2, '0');

    return `${min}:${sec}`; // '00:00';
}

function convertTime2(timeSec: number) {
    timeSec = 60 - timeSec;

    const min = Math.floor(timeSec / 60)
        .toString()
        .padStart(2, '0');
    const sec = Math.floor(timeSec % 60)
        .toString()
        .padStart(2, '0');
    const millisecond = getDecimal(timeSec);

    return `${min}:${sec}:${millisecond}`; // '00:00';
}

function getDecimal(timeSec: number) {
    const numStr = timeSec.toString();
    const index = numStr.indexOf('.');
    return index > 0 ? numStr.substring(index + 1, index + 3) : '00';
}
