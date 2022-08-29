type SetGameObjects = React.Dispatch<
    React.SetStateAction<{
        time: string;
    }>
>;

type SetGameResult = React.Dispatch<
    React.SetStateAction<{
        isPlaying: boolean;
        time: string;
        unit: string;
        unitPerSec: string;
        waitingTimeAvg: string;
        waitingTimeMax: string;
    }>
>;

export const gameRenderer = (() => {
    let setGameObjects: SetGameObjects;
    let setGameResult: SetGameResult;

    function update(elapsedTime: number) {
        setGameObjects({
            time: '',
        });

        setGameResult({
            isPlaying: false,
            time: convertTime(elapsedTime),
            unit: '5',
            unitPerSec: '0.0',
            waitingTimeAvg: '00:00',
            waitingTimeMax: '00:00',
        });
    }

    return {
        update,

        initialize: (_setGameObjects: SetGameObjects, _setGameResult: SetGameResult) => {
            setGameObjects = _setGameObjects;
            setGameResult = _setGameResult;
        },
    };
})();

function convertTime(timeSec: number) {
    const min = Math.floor(timeSec / 60)
        .toString()
        .padStart(2, '0');
    const sec = Math.floor(timeSec % 60)
        .toString()
        .padStart(2, '0');

    return `${min}:${sec}`; // '00:00';
}
