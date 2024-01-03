import React from "react";
import Shape from "./Shape";

export default function Square(): JSX.Element {
    return Shape(<rect id="square" x="5" y="5" width="40" height="40" />);
}
