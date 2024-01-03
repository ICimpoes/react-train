import React from "react";
import Shape from "./Shape";

export default function Circle(): JSX.Element {
    return Shape(<circle id="circle" cx="25" cy="25" r="20" />);
}
