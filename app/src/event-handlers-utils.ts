export function eventListenerDecorator(handler: Function, event: Event, ...args: any[]) {
    if (!event.keyCode || (event.keyCode !== 13 && event.keyCode !== 39)) {
        handler(event, ...args);
    }
}
