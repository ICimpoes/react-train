interface Node {
    parent?: number;
    children: number[];
}

export interface History<T> {
    items: {
        value: T;
        time: number;
        action: string;
    }[];
    nodes: Node[];
    currentNode: number;
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
        nodes: [{ children: [] }],
        currentNode: 0,
    };
}

export function currentHistory<T>(history: History<T>): T {
    return history.items[history.currentNode].value;
}

export function addHitory<T>(history: History<T>, action: string, value: T) {
    const next = history.items.length;
    const item = {
        action: action,
        value: value,
        time: new Date().getTime(),
    };
    history.items.push(item);
    history.nodes[history.currentNode].children.push(next);
    history.nodes.push({ parent: history.currentNode, children: [] });
    history.currentNode = next;
}

export function undoHistory<T>(history: History<T>): T | undefined {
    const currentNode = history.nodes[history.currentNode];
    if (currentNode.parent === undefined) {
        return;
    }
    history.currentNode = currentNode.parent;
    return currentHistory(history);
}

export function redoHistory<T>(history: History<T>): T | undefined {
    const currentLink = history.nodes[history.currentNode];
    if (currentLink.children.length === 0) {
        return;
    }
    history.currentNode = currentLink.children[currentLink.children.length - 1];
    return currentHistory(history);
}
