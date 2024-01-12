import React from "react";
import PaletteShape from "./PaletteShape";
import { ShapeTypes } from "./Shapes";

export default function Palette() {
    return (
        <div data-testid="palette" className="palette">
            {ShapeTypes.map((shapeType) => {
                return <PaletteShape key={shapeType} shapeType={shapeType} />;
            })}
        </div>
    );
}
