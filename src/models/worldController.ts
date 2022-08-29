export class WorldController {
    private frame = 60;
    private frameSec = 1 / this.frame;
    private timeScale = 1.0;
    private isPlaying = false;

    constructor() {}

    public start = (world, codeObj, requestAnimationFrame) => {
        this.isPlaying = false;

        let lastUpdatedTime: number | null = null;
        let firstUpdate = true;

        // world.on('usercode_error', controller.handleUserCodeError);

        let updater = (time: number) => {
            if (this.isPlaying && !world.challengeEnded && lastUpdatedTime !== null) {
                if (firstUpdate) {
                    firstUpdate = false;
                    // This logic prevents infite loops in usercode from breaking the page permanently - don't evaluate user code until game is unpaused.
                    try {
                        codeObj.init(world.elevatorInterfaces, world.floors);
                        world.init();
                    } catch (e) {
                        this.handleError(e);
                    }
                }

                const deltaTime = time - lastUpdatedTime;
                let scaledDt = deltaTime * 0.001 * this.timeScale;
                scaledDt = Math.min(scaledDt, this.frameSec * 3 * this.timeScale); // Limit to prevent unhealthy substepping

                try {
                    codeObj.update(scaledDt, world.elevators, world.floors);
                } catch (e) {
                    this.handleError(e);
                }

                while (scaledDt > 0.0 && !world.challengeEnded) {
                    const thisDt = Math.min(this.frameSec, scaledDt);
                    world.update(thisDt);
                    scaledDt -= this.frameSec;
                }

                world.updateDisplayPositions();
                world.trigger('stats_display_changed'); // TODO: Trigger less often for performance reasons etc
            }

            lastUpdatedTime = time;

            if (!world.challengeEnded) {
                requestAnimationFrame(updater);
            }
        };

        requestAnimationFrame(updater);
    };

    public changePlayingState = (isPlaying: boolean) => {
        this.isPlaying = isPlaying;
        // controller.trigger('timescale_changed');
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