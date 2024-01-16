import { ShapeType } from "./Shapes";

export interface Point {
    x: number;
    y: number;
}

export interface CanvasItem {
    id: string;
    shape: ShapeType;
    point: Point;
    active?: boolean;
}

export function classNames(...names: (string | false)[]): string {
    const name = names.reduce((prev, curr) => {
        if (!curr) {
            return prev;
        }
        if (!prev) {
            return curr;
        }
        return prev + " " + curr;
    });
    return name ? name : "";
}
