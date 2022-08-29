import React, { useContext, useState } from 'react';
import './Game.css';
import { GameResultContext, GameObjectsContext } from '../context/gameContext';
import { Box, Button, Stack } from '@mui/material';

export default function Game() {
    const gameResultInitial = {
        time: '00:00',
        unit: '0',
        unitPerSec: '0.0',
        waitingTimeAvg: '00:00',
        waitingTimeMax: '00:00',
    };

    const gameObjectsInitial = {
        time: '',
    };

    const [gameResult, setGameResult] = useState(gameResultInitial);
    const [gameObjects, setGameObjects] = useState(gameObjectsInitial);

    return (
        <GameResultContext.Provider value={gameResult}>
            <GameObjectsContext.Provider value={gameObjects}>
                <div className="gameArea">
                    <Screen />
                    <Result />
                </div>
            </GameObjectsContext.Provider>
        </GameResultContext.Provider>
    );
}

function Screen() {
    return <div></div>;
}

function Result() {
    const { time, unit, unitPerSec, waitingTimeAvg, waitingTimeMax } = useContext(GameResultContext);

    return (
        <Box className="resultArea" padding={2} sx={{ border: 1, borderColor: 'grey.500' }}>
            <Stack direction="row" justifyContent={'center'} spacing={2} paddingBottom={2}>
                <Button variant="contained">Start</Button>
                <Button variant="contained">Start</Button>
                <Button variant="contained">Start</Button>
            </Stack>
            <div>
                <span className="resultLabel">Time</span>
                <span className="resultValue">{time}</span>
            </div>
            <div>
                <span className="resultLabel">Uit</span>
                <span className="resultValue">{unit}</span>
            </div>
            <div>
                <span className="resultLabel">Unit/sec</span>
                <span className="resultValue">{unitPerSec}</span>
            </div>
            <div>
                <span className="resultLabel">Avg waiting time</span>
                <span className="resultValue">{waitingTimeAvg}</span>
            </div>
            <div>
                <span className="resultLabel">Max waiting time</span>
                <span className="resultValue">{waitingTimeMax}</span>
            </div>
        </Box>
    );
}
