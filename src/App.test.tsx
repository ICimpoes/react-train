import { render, screen } from '@testing-library/react';
import App from './App';

describe("<App />", () => {
    const app = (): HTMLElement => {
        const { container } = render(<App />);
        return container;
    }

    describe("#render", () => {
        it("does not crash", () => {
            app();
            expect(screen).toBeDefined();
        });

        it("has editor", () => {
            const editor = app().getElementsByClassName('editor');

            expect(editor.length).toBe(1);
        });
    });

    describe("editor", () => {
        const editor = (): Element => {
            return app().getElementsByClassName('editor')[0];
        }

        it("has palette", () => {
            const palette = editor().getElementsByClassName('palette');

            expect(palette).toHaveLength(1);

            const shapes = palette[0].getElementsByClassName('shape');

            expect(shapes).toHaveLength(3);
        });

        it("has workspace", () => {
            const workspace = editor().getElementsByClassName('workspace');

            expect(workspace).toHaveLength(1);
        });
    });
});
