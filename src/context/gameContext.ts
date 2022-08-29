import { createContext } from 'react';

type GameResultType = {
    time: string;
    unit: string;
    unitPerSec: string;
    waitingTimeAvg: string;
    waitingTimeMax: string;
};

type GameObjectsType = {
    time: string;
};

const gameResult = {
    time: '00:01',
    unit: '1',
    unitPerSec: '0.1',
    waitingTimeAvg: '00:01',
    waitingTimeMax: '00:01',
};

const gameObjects = {
    time: '',
};

export const GameResultContext = createContext<GameResultType>(gameResult);
export const GameObjectsContext = createContext<GameObjectsType>(gameObjects);
