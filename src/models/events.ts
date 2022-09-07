export const AppEvent = {
    floorStateChanged: 'floorStateChanged',
    playStateChanged: 'playStateChanged',
    elevatorButtonPressed: 'elevatorButtonPressed',
    userExited: 'userExited',
    arrived: 'arrived',
    userRemoved: 'userRemoved',
    userStateChanged: 'userStateChanged',
} as const;

export const triggerEvent = (event: string, element: HTMLElement) => {
    const evt = new Event(event, { bubbles: true, cancelable: true });
    return element.dispatchEvent(evt);
};
