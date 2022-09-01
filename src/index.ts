import { CountDown } from './components/countDown';
import { createFooter, createHeader } from './components/header';
import { gameManager } from './models/gameManager';

function initialize() {
    createHeader();
    createFooter();

    const gameScreen = document.querySelector('.gameScreen')!;
    const codeEditor = document.querySelector('.codeEditor')!;

    const countDown = new CountDown();
    gameScreen.appendChild(countDown);

    const defaultSetting = {
        seed: 0,
        floorCount: 3,
        elevatorCount: 1,
        elevatorCapacity: 4,
        spawnRate: 0,
    };

    gameManager.createWorld(defaultSetting);
}

initialize();
