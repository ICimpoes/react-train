import * as React from "react";
import "./App.css";
import Editor from "./editor/Editor";

export default class App extends React.Component {
    public render(): JSX.Element {
        return <Editor />;
    }
}
