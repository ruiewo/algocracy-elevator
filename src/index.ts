import { CountDown } from './components/countDown';
import { createHeader } from './components/header';

const root = document.getElementById('root')!;
const countDown = new CountDown();

createHeader();
root.appendChild(countDown);
