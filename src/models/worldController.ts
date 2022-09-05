import { Elevator } from './elevator';
import { Floor } from './floor';
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

    public start = (world: World, userCode: UserCode, requestAnimationFrame: any, autoStart = false) => {
        this.isPlaying = autoStart;

        let lastUpdatedTime: number | null = null;
        let firstUpdate = true;

        // todo remove
        world.elevators.forEach(x => x.goTo(1));

        // world.on('usercode_error', controller.handleUserCodeError);

        const updater = (time: number) => {
            if (this.isPlaying && !world.isEnded && lastUpdatedTime !== null) {
                if (firstUpdate) {
                    firstUpdate = false;
                    // This logic prevents infite loops in usercode from breaking the page permanently - don't evaluate user code until game is unpaused.
                    try {
                        userCode.initialize(world.elevators, world.floors);
                        // world.init();
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

                // todo render elevator and user.

                world.elevators.forEach(gameRenderer.updateElevator);
                world.users.forEach(gameRenderer.updateUser);
                // world.users.forEach(x => x.update(deltaTime));

                resultBoard.update({ elapsedTime: world.elapsedTime });
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
        this.trigger(AppEvent.playStateChanged, isPlaying);
    };

    public togglePlayingState = () => {
        this.isPlaying = !this.isPlaying;
        this.trigger(AppEvent.playStateChanged, this.isPlaying);
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
}
