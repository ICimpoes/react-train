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
        if (curr && prev) {
            return prev + " " + curr;
        }
        return curr || prev;
    });
    return name ? name : "";
}
