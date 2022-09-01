import { CountDown } from './components/countDown';
import { createFooter, createHeader } from './components/header';
import { gameManager } from './models/gameManager';
// import * as CodeMirror from 'codemirror';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
// import { oneDark } from '@codemirror/theme-one-dark';
import { solarizedDark } from './lib/craftzdog/solarized-dark';

function initialize() {
    createHeader();
    createFooter();
    const gameScreen = document.querySelector('.gameScreen')!;
    const codeEditor = document.querySelector('.codeEditor') as HTMLTextAreaElement;
    codeEditor.value = `
        const defaultSetting = {
            seed: 0,
            floorCount: 3,
            elevatorCount: 1,
            elevatorCapacity: 4,
            spawnRate: 0,
        };

        gameManager.createWorld(defaultSetting);
    `;

    const editor = new EditorView({
        doc: `const defaultSetting = {
    seed: 0,
    floorCount: 3,
    elevatorCount: 1,
    elevatorCapacity: 4,
    spawnRate: 0,
};

gameManager.createWorld(defaultSetting);
`,
        extensions: [basicSetup, javascript(), solarizedDark],
        parent: codeEditor,
    });

    // editor.dispatch({
    //     changes: { from: 0, to: editor.state.doc.length, insert: 'New Test Text' },
    // });

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
