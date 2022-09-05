import { createEditor } from './components/editor';
import { createFooter, createHeader } from './components/header';
import { gameManager } from './models/gameManager';

function initialize() {
    createHeader();
    createEditor();
    createFooter();

    gameManager.run();
}

initialize();
