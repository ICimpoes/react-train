import React from "react";
import {
    getAllByTestId,
    getByTestId,
    render,
    screen,
} from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { shapesStore } from "./redux/store";

jest.mock("./HistoryTree", () => () => {
    return <></>;
});

describe("<App />", () => {
    beforeEach(() => {
        render(
            <Provider store={shapesStore}>
                <App />
            </Provider>
        );
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
