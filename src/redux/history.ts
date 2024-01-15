export interface Item {
    previous?: number;
    next: number[];
}

export interface History<T> {
    items: {
        value: T;
        time: number;
        action: string;
    }[];
    links: Item[];
    current: number;
}

export function newHistory<T>(initial: T): History<T> {
    return {
        items: [
            {
                action: "start",
                value: initial,
                time: new Date().getTime(),
            },
        ],
        links: [{ next: [] }],
        current: 0,
    };
}

export function historyCurrent<T>(history: History<T>): T {
    return history.items[history.current].value;
}

export function addHitory<T>(history: History<T>, action: string, value: T) {
    const next = history.items.length;
    const item = {
        action: action,
        value: value,
        time: new Date().getTime(),
    };
    history.items.push(item);
    history.links[history.current].next.push(next);
    history.links.push({ previous: history.current, next: [] });
    history.current = next;
}

export function undoHistory<T>(history: History<T>): T | undefined {
    const currentLink = history.links[history.current];
    if (currentLink.previous === undefined) {
        return;
    }
    history.current = currentLink.previous;
    return historyCurrent(history);
}

export function reduHistory<T>(history: History<T>): T | undefined {
    const currentLink = history.links[history.current];
    if (currentLink.next.length === 0) {
        return;
    }
    history.current = currentLink.next[currentLink.next.length - 1];
    return historyCurrent(history);
}
