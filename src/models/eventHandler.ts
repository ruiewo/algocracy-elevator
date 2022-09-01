type Callback = (...params: any[]) => void;

type EventListener = {
    event: string;
    callbacks: Callback[];
};

export class EventHandler {
    private listeners: EventListener[] = [];

    public on(event: string, callback: Callback) {
        const listener = this.getListener(event);

        if (listener === undefined) {
            this.listeners.push({ event, callbacks: [callback] });
        } else {
            listener.callbacks.push(callback);
        }
    }

    public off(event: string, callback: Callback) {
        const listener = this.getListener(event);
        if (listener === undefined) {
            return;
        }

        const index = listener.callbacks.indexOf(callback);
        if (index === -1) {
            return;
        }

        listener.callbacks.splice(index, 1);
    }

    public trigger(event: string, ...params: any[]) {
        const listener = this.getListener(event);
        if (listener === undefined) {
            return;
        }

        listener.callbacks.forEach(callback => callback(...params));
    }

    private getListener(event: string): EventListener | undefined {
        return this.listeners.find(listener => listener.event === event);
    }
}
