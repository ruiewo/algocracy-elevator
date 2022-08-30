import React, { useContext, useState } from 'react';
import './Game.css';
import { GameResultContext, GameObjectsContext } from '../context/gameContext';
import { Box, Button, Stack } from '@mui/material';
import { gameManager } from '../models/gameManager';
import { WorldSetting } from '../models/world';

export default function Game() {
    const gameResultInitial = {
        isPlaying: false,
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

    gameManager.initialize(setGameObjects, setGameResult);

    const worldSetting = gameManager.worldSetting;

    return (
        <GameResultContext.Provider value={gameResult}>
            <GameObjectsContext.Provider value={gameObjects}>
                <Stack className="gameArea" direction="row" justifyContent={'center'}>
                    <Screen setting={worldSetting} />
                    <Result start={gameManager.toggle} />
                </Stack>
            </GameObjectsContext.Provider>
        </GameResultContext.Provider>
    );
}

function Screen(props: { setting: WorldSetting }) {
    const floors = [...new Array(props.setting.floorCount)].map((_, i) => Floor(i));

    return (
        <Stack className="screenArea" flexDirection={'column'} justifyContent={'center'} sx={{ border: 1, borderColor: 'grey.500' }}>
            <Stack flexDirection={'column-reverse'}>{floors}</Stack>
        </Stack>
    );
}

function Floor(index: number) {
    return (
        <Box key={index} sx={{ border: 1, color: 'snow', borderColor: 'green', height: '5rem', position: 'relative' }}>
            Floor {index + 1}
        </Box>
    );
}

function Result(props: { start: () => void }) {
    const { isPlaying, time, unit, unitPerSec, waitingTimeAvg, waitingTimeMax } = useContext(GameResultContext);

    return (
        <Box className="resultArea" padding={2} sx={{ border: 1, borderColor: 'grey.500' }}>
            <Stack direction="row" justifyContent={'center'} spacing={2} paddingBottom={2}>
                <Button variant="contained" onClick={props.start}>
                    {isPlaying ? 'stop' : 'start'}
                </Button>
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
