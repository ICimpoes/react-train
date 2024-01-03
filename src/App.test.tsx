import React from "react";
import {
    getAllByTestId,
    getByTestId,
    render,
    screen,
} from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
    beforeEach(() => {
        render(<App />);
    });

    describe("#render", () => {
        it("has editor", () => {
            const editor = screen.getByTestId("editor");

            expect(editor).toBeDefined();
        });
    });

    describe("editor", () => {
        const editor = (): HTMLElement => {
            return screen.getByTestId("editor");
        };

        it("has palette", () => {
            const palette = getByTestId(editor(), "palette");

            expect(palette).toBeDefined();

            const shapes = getAllByTestId(palette, "shape");

            expect(shapes).toHaveLength(3);
        });

        it("has workspace", () => {
            const workspace = getAllByTestId(editor(), "workspace");

            expect(workspace).toHaveLength(1);
        });
    });
});
