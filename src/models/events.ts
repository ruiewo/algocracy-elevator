export const AppEvent = {
    floorStateChanged: 'floorStateChanged',
    playStateChanged: 'playStateChanged',
} as const;

export const triggerEvent = (event: string, element: HTMLElement) => {
    const evt = new Event(event, { bubbles: true, cancelable: true });
    return element.dispatchEvent(evt);
};
