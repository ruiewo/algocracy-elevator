import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { solarizedDark } from '../lib/craftzdog/solarized-dark';
import { Elevator } from '../models/elevator';
import { Floor } from '../models/floor';

export type Editor = { getCode: () => UserCode };
export type UserCode = {
    initialize: (elevators: Elevator[], floors: Floor[]) => void;
    update: (dt: number, elevators: Elevator[], floors: Floor[]) => void;
};

export const createEditor = () => {
    const codeEditor = document.querySelector('.codeEditor') as HTMLElement;

    const editor = new EditorView({
        doc: `
        {
            initialize: (elevators, floors) => {
                elevators.forEach((elevator, i) => {
                    elevator.on("idle", () => {
                        for (let i = 0; i < floors.length; i++) {
                            const state = floors[i].getState();
                            if (state.up || state.down) {
                                elevator.destinationQUeue.enqueue(i);
                            }
                        }
                    });
                });
            },
            update: (dt, elevators, floors) => {},
        }
        `,
        extensions: [basicSetup, javascript(), solarizedDark],
        parent: codeEditor,
    });

    // editor.dispatch({
    //     changes: { from: 0, to: editor.state.doc.length, insert: 'New Test Text' },
    // });

    function getCode() {
        let codeStr = editor.state.doc.toString().trim();

        if (codeStr.slice(0, 1) == '{' && codeStr.slice(-1) == '}') {
            codeStr = '(' + codeStr + ')';
        }

        const codeObj = eval(codeStr) as UserCode;

        if (typeof codeObj.initialize !== 'function') {
            throw 'Code must contain an init function';
        }
        if (typeof codeObj.update !== 'function') {
            throw 'Code must contain an update function';
        }
        return codeObj;
    }

    return { getCode };
};
