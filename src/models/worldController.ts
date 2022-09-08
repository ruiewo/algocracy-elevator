import { Elevator } from './elevator';
import { Floor, FloorState } from './floor';
import { World } from './world';
import { AppEvent } from './events';
import { resultBoard } from './resultBoard';
import { gameRenderer } from './gameRenderer';

type UserCode = {
    initialize: (elevators: Elevator[], floors: Floor[]) => void;
    update: (dt: number, elevators: Elevator[], floors: Floor[]) => void;
};

const frame = 60;
const frameSec = 1 / frame;
let timeScale = 1.0;
let isPlaying = false;

const result = {
    unit: 0,
};

export const worldController = (() => {
    initialize();

    function initialize() {
        resultBoard.startButton.onclick = togglePlayingState;
    }

    function start(
        world: World,
        userCode: UserCode,
        requestAnimationFrame: (callback: FrameRequestCallback) => number,
        autoStart = false
    ) {
        isPlaying = autoStart;
        resultBoard.reset(world.timeLimit);

        let lastUpdatedTime: number | null = null;
        let firstUpdate = true;

        world.floors.forEach((floor, i) => {
            floor.on(AppEvent.floorStateChanged, (state: FloorState) => {
                gameRenderer.updateFloorButton(i, state);
            });
        });

        // todo remove
        world.elevators.forEach((x, i) => x.goTo(0));

        world.elevators.forEach((x, i) => {
            x.on(AppEvent.userExited, (floorIndex: number) => {
                result.unit++;
                gameRenderer.updateElevatorButton(i, floorIndex, false);
            });

            x.on(AppEvent.elevatorButtonPressed, (floorIndex: number) => {
                gameRenderer.updateElevatorButton(i, floorIndex, true);
            });
        });

        // world.on('usercode_error', controller.handleUserCodeError);

        const updater = (time: number) => {
            if (isPlaying && !world.isEnded && lastUpdatedTime !== null) {
                if (firstUpdate) {
                    firstUpdate = false;
                    // This logic prevents infite loops in usercode from breaking the page permanently - don't evaluate user code until game is unpaused.
                    try {
                        userCode.initialize(world.elevators, world.floors);
                    } catch (e) {
                        handleError(e);
                    }
                }

                const deltaTime = time - lastUpdatedTime;
                let scaledDt = deltaTime * 0.001 * timeScale;
                scaledDt = Math.min(scaledDt, frameSec * 3 * timeScale); // Limit to prevent unhealthy substepping

                try {
                    userCode.update(scaledDt, world.elevators, world.floors);
                } catch (e) {
                    handleError(e);
                }

                while (scaledDt > 0.0 && !world.isEnded) {
                    const thisDt = Math.min(frameSec, scaledDt);
                    world.update(thisDt);
                    scaledDt -= frameSec;
                }

                world.elevators.forEach(gameRenderer.updateElevator);
                world.users.forEach(gameRenderer.updateUser);

                resultBoard.update({ elapsedTime: world.elapsedTime, unit: result.unit });
                // TODO: Trigger less often for performance reasons etc
            }

            lastUpdatedTime = time;

            if (world.isEnded) {
                changePlayingState(false);
                return;
            }

            requestAnimationFrame(updater);
        };

        requestAnimationFrame(updater);
    }

    function changePlayingState(_isPlaying: boolean) {
        isPlaying = _isPlaying;
        resultBoard.changeButtonState(isPlaying);
    }

    function togglePlayingState() {
        isPlaying = !isPlaying;
        resultBoard.changeButtonState(isPlaying);
    }

    function changeTimeScale(_timeScale: number) {
        timeScale = _timeScale;
        // controller.trigger('timescale_changed');
    }

    function handleError(e: any) {
        changePlayingState(false);
        console.log('User Code Error!');
        console.log(e);
    }

    return {
        start,
    };
})();
