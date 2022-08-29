type SetGameObjects = React.Dispatch<
    React.SetStateAction<{
        time: string;
    }>
>;

type SetGameResult = React.Dispatch<
    React.SetStateAction<{
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

    function update() {
        setGameObjects({
            time: '',
        });

        setGameResult({
            time: '00:00',
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
