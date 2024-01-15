import { HierarchyPointNode } from "d3-hierarchy";
import React, { SyntheticEvent } from "react";
import Tree, { RawNodeDatum, TreeNodeDatum } from "react-d3-tree";
import { setFromHistory } from "./redux/canvasSlice";
import { History } from "./redux/history";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectHistoryItems } from "./redux/store";

interface HistoryTreeProps {
    hidden: boolean;
}
export default function HistoryTree(
    props: HistoryTreeProps
): React.JSX.Element {
    const dispatch = useAppDispatch();
    const historyItems = useAppSelector(selectHistoryItems);

    const handleNodeClick = (node: HierarchyPointNode<TreeNodeDatum>) => {
        if (node.data.attributes === undefined) {
            return;
        }
        const idx = Number(node.data.attributes["idx"]);
        dispatch(setFromHistory(idx));
    };

    return (
        <div id="treeWrapper" style={{ width: "50em" }} hidden={props.hidden}>
            <Tree
                collapsible={false}
                onNodeClick={handleNodeClick as any}
                data={historyToTree(0, historyItems)}
                orientation={"vertical"}
                rootNodeClassName="history node"
                branchNodeClassName="history node"
                leafNodeClassName="history node"
            />
        </div>
    );
}

type H = History<unknown>;

function historyToTree(idx: number, history: H): RawNodeDatum {
    const now = new Date().getTime();
    const historyItem = history.items[idx];
    const diff = now - historyItem.time;
    const node = {
        name: historyItem.action,
        children: [],
        attributes: {
            idx: idx,
            time: timeDiff(diff),
        },
    } as RawNodeDatum;
    if (idx === history.current) {
        node.attributes!["current"] = true;
    }
    for (const i of history.links[idx].next) {
        node.children?.push(historyToTree(i, history));
    }
    return node;
}

function timeDiff(diffMs: number): string {
    const diffSec = Math.round(diffMs / 1000);
    if (diffSec < 1) {
        return "0";
    }
    const diffMins = Math.round(diffSec / 60);
    if (diffMins < 1) {
        return `${diffSec} S`;
    }
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 1) {
        return `${diffMins} M`;
    }
    return `${diffHours} H`;
}
