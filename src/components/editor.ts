import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { solarizedDark } from '../lib/craftzdog/solarized-dark';

export const createEditor = () => {
    const codeEditor = document.querySelector('.codeEditor') as HTMLTextAreaElement;

    const editor = new EditorView({
        doc: `const defaultSetting = {
    seed: 0,
    floorCount: 3,
    elevatorCount: 1,
    elevatorCapacity: 4,
    spawnRate: 1,
};

gameManager.createWorld(defaultSetting);
`,
        extensions: [basicSetup, javascript(), solarizedDark],
        parent: codeEditor,
    });

    // editor.dispatch({
    //     changes: { from: 0, to: editor.state.doc.length, insert: 'New Test Text' },
    // });
};
