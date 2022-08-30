import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignIn from './signin';
import CodeEditor from './components/CodeEditor';
import TitleBar from './components/TitleBar';
import Game from './components/Game';
import { Copyright } from './components/Copyright';
// import { Copyright } from '@mui/icons-material';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <TitleBar />
        {/* <App /> */}
        <Game />
        <CodeEditor />
        {/* <SignIn /> */}
        <Copyright sx={{ mt: 8, mb: 4 }} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
