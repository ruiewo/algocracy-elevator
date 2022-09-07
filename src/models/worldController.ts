import { Elevator } from './elevator';
import { Floor, FloorState } from './floor';
import { World } from './world';
import { EventHandler } from './eventHandler';
import { AppEvent } from './events';
import { resultBoard } from './resultBoard';
import { gameRenderer } from './gameRenderer';

type UserCode = {
    initialize: (elevators: Elevator[], floors: Floor[]) => void;
    update: (dt: number, elevators: Elevator[], floors: Floor[]) => void;
};

export class WorldController extends EventHandler {
    private frame = 60;
    private frameSec = 1 / this.frame;
    private timeScale = 1.0;
    private isPlaying = false;

    private result = {
        unit: 0,
    };

    constructor() {
        super();
        this.initialize();
    }

    public start = (
        world: World,
        userCode: UserCode,
        requestAnimationFrame: (callback: FrameRequestCallback) => number,
        autoStart = false
    ) => {
        this.isPlaying = autoStart;
        resultBoard.reset(world.timeLimit);

        let lastUpdatedTime: number | null = null;
        let firstUpdate = true;

        world.floors.forEach((floor, i) => {
            floor.on(AppEvent.floorStateChanged, (state: FloorState) => {
                gameRenderer.updateFloorButton(i, state);
            });
        });

        // todo remove
        world.elevators.forEach((x, i) => x.goTo(i));

        world.elevators.forEach((x, i) => {
            x.on(AppEvent.userExited, (floorIndex: number) => {
                this.result.unit++;
                gameRenderer.updateElevatorButton(i, floorIndex, false);
            });

            x.on(AppEvent.elevatorButtonPressed, (floorIndex: number) => {
                gameRenderer.updateElevatorButton(i, floorIndex, true);
            });
        });

        // world.on('usercode_error', controller.handleUserCodeError);

        const updater = (time: number) => {
            if (this.isPlaying && !world.isEnded && lastUpdatedTime !== null) {
                if (firstUpdate) {
                    firstUpdate = false;
                    // This logic prevents infite loops in usercode from breaking the page permanently - don't evaluate user code until game is unpaused.
                    try {
                        userCode.initialize(world.elevators, world.floors);
                    } catch (e) {
                        this.handleError(e);
                    }
                }

                const deltaTime = time - lastUpdatedTime;
                let scaledDt = deltaTime * 0.001 * this.timeScale;
                scaledDt = Math.min(scaledDt, this.frameSec * 3 * this.timeScale); // Limit to prevent unhealthy substepping

                try {
                    userCode.update(scaledDt, world.elevators, world.floors);
                } catch (e) {
                    this.handleError(e);
                }

                while (scaledDt > 0.0 && !world.isEnded) {
                    const thisDt = Math.min(this.frameSec, scaledDt);
                    world.update(thisDt);
                    scaledDt -= this.frameSec;
                }

                world.elevators.forEach(gameRenderer.updateElevator);
                world.users.forEach(gameRenderer.updateUser);

                resultBoard.update({ elapsedTime: world.elapsedTime, unit: this.result.unit });
                // world.trigger('stats_display_changed'); // TODO: Trigger less often for performance reasons etc
            }

            lastUpdatedTime = time;

            if (!world.isEnded) {
                requestAnimationFrame(updater);
            }
        };

        requestAnimationFrame(updater);
    };

    public changePlayingState = (isPlaying: boolean) => {
        this.isPlaying = isPlaying;
        resultBoard.changeButtonState(this.isPlaying);
    };

    public togglePlayingState = () => {
        this.isPlaying = !this.isPlaying;
        resultBoard.changeButtonState(this.isPlaying);
    };

    public changeTimeScale = (timeScale: number) => {
        this.timeScale = timeScale;
        // controller.trigger('timescale_changed');
    };

    private handleError = (e: any) => {
        this.changePlayingState(false);
        console.log('User Code Error!');
        console.log(e);
    };

    private initialize = () => {
        resultBoard.startButton.onclick = this.togglePlayingState;
    };
}
