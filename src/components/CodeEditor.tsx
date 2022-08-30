import React from 'react';
import Editor from 'react-simple-code-editor';
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { Stack } from '@mui/material';

export default function CodeEditor() {
    const [code, setCode] = React.useState(`{\n    initialize: (elevators, floors) => {};\n    update: (deltaTime, elevators, floors) => {};\n};`);

    return (
        <Stack justifyContent={'center'} flexDirection={'row'}>
            <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    background: '#d5eee8',
                    width: '60rem',
                    minHeight: '20rem',
                }}
            />
        </Stack>
    );
}
