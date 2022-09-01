import { createEditor } from './components/editor';
import { createFooter, createHeader } from './components/header';
import { gameManager } from './models/gameManager';

function initialize() {
    createHeader();
    createEditor();
    createFooter();

    const gameScreen = document.querySelector('.gameScreen')!;

    const defaultSetting = {
        seed: 0,
        floorCount: 3,
        elevatorCount: 2,
        elevatorCapacity: 4,
        spawnRate: 0,
    };

    gameManager.createWorld(defaultSetting);
}

initialize();
