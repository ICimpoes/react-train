import React from "react";
import { useAppDispatch } from "./redux/hooks";
import { drag, resetDrag } from "./redux/reducers";
import { Shapes, ShapeTypes, ShapeType } from "./Shapes";

export default function Palette() {
    return (
        <div data-testid="palette" className="palette">
            {ShapeTypes.map((shapeType) => {
                return <PaletteShape key={shapeType} shapeType={shapeType} />;
            })}
        </div>
    );
}

interface ShapeProps {
    shapeType: ShapeType;
}

function PaletteShape(props: ShapeProps) {
    const dispatch = useAppDispatch();

    const handleDragStart = React.useCallback(() => {
        dispatch(drag(props.shapeType));
    }, [props.shapeType]);

    const handleDragEnd = React.useCallback(() => {
        dispatch(resetDrag());
    }, [props.shapeType]);

    const Shape = Shapes[props.shapeType];

    return (
        <div data-testid="shape" className="shape">
            <div
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                draggable={true}
            >
                <svg
                    width="50"
                    height="50"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <Shape point={{ x: 25, y: 25 }} />
                </svg>
            </div>
        </div>
    );
}
