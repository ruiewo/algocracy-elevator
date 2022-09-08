import { CountDown } from '../components/countDown';

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
    unit: number;
};

export const resultBoard = (() => {
    const result = document.querySelector('.result')!;
    const startButton = result.querySelector('button')!;

    const score = result.querySelector<HTMLElement>('[data-tag="unit"]')!;
    const unitPerSec = result.querySelector<HTMLElement>('[data-tag="unitPerSec"]')!;
    const waitingAvg = result.querySelector<HTMLElement>('[data-tag="waitingAvg"]')!;
    const waitingMax = result.querySelector<HTMLElement>('[data-tag="waitingMax"]')!;

    const countDown = new CountDown(60);
    result.appendChild(countDown);

    function update({ elapsedTime, unit }: Result) {
        countDown.update(elapsedTime);

        score.textContent = unit.toString();
        unitPerSec.textContent = (unit / elapsedTime!).toFixed(2);
    }

    function changeButtonState(isPlaying: boolean) {
        startButton.textContent = isPlaying ? 'Stop' : 'Start';
    }

    function reset(timeLimit: number) {
        countDown.reset(timeLimit);
        score.textContent = '0';
        unitPerSec.textContent = '0.00';
    }

    return {
        startButton,
        update,
        changeButtonState,
        reset,
    };
})();
