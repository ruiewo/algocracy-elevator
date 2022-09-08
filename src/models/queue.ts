export class Queue<T> {
    private queue: T[] = [];

    public enqueue = (...args: T[]) => {
        for (let i = 0, count = args.length; i < count; i++) {
            this.queue.push(args[i]);
        }
    };

    public dequeue = () => {
        return this.queue.shift();
    };

    public checkFirstQueue = () => {
        return this.queue.length === 0 ? undefined : this.queue[0];
    };

    public clear = () => {
        this.queue = [];
    };

    public get length() {
        return this.queue.length;
    }
}
