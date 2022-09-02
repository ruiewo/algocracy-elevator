import { CountDown } from '../components/countDown';
import { AppEvent } from './events';
import { WorldController } from './worldController';

type GameResult = {
    isPlaying: boolean;
    time: string;
    unit: string;
    unitPerSec: string;
    waitingTimeAvg: string;
    waitingTimeMax: string;
};

type Result = {
    elapsedTime: number;
};

export const resultBoard = (() => {
    const result = document.querySelector('.result')!;
    const startButton = result.querySelector('button')!;

    const time = result.querySelector<HTMLElement>('[data-tag="time"]')!;
    const unit = result.querySelector<HTMLElement>('[data-tag="unit"]')!;
    const unitPerSec = result.querySelector<HTMLElement>('[data-tag="unitPerSec"]')!;
    const waitingAvg = result.querySelector<HTMLElement>('[data-tag="waitingAvg"]')!;
    const waitingMax = result.querySelector<HTMLElement>('[data-tag="waitingMax"]')!;

    const countDown = new CountDown();
    result.appendChild(countDown);

    function update({ elapsedTime }: Partial<Result>) {
        if (elapsedTime != null) {
            const timeStr = convertTime(elapsedTime);
            time.textContent = timeStr;

            countDown.update(convertTime2(elapsedTime));
        }
    }

    function initialize(worldController: WorldController) {
        worldController.on(AppEvent.playStateChanged, (isPlaying: boolean) => {
            startButton.textContent = isPlaying ? 'Stop' : 'Start';
        });
    }

    return {
        initialize,
        update,
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
    if (timeSec < 0) {
        timeSec += 60 * 99 + 60;
    }

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
