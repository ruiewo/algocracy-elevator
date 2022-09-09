import { createEditor } from './components/editor';
import { createFooter, createHeader } from './components/domHelper';
import { gameManager } from './models/gameManager';

function initialize() {
    createHeader();
    const editor = createEditor();
    createFooter();

    gameManager.run(editor);
}

initialize();
