import { HierarchyPointNode } from "d3-hierarchy";
import React from "react";
import Tree, { RawNodeDatum, TreeNodeDatum } from "react-d3-tree";
import { setFromHistory } from "./redux/canvasSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectHistoryItems } from "./redux/store";

interface HistoryTreeProps {
    hidden: boolean;
}
export default function HistoryTree(
    props: HistoryTreeProps
): React.JSX.Element {
    const dispatch = useAppDispatch();
    const history = useAppSelector(selectHistoryItems);

    const historyToTree = React.useCallback(
        (idx: number): RawNodeDatum => {
            const item = history.items[idx];
            return {
                name: item.action,
                children: history.nodes[idx].children.map(historyToTree),
                attributes: {
                    idx: idx,
                    time: timeDiff(item.time),
                    current: idx == history.currentNode,
                },
            };
        },
        [history, timeDiff]
    );

    const handleNodeClick = React.useCallback(
        (node: HierarchyPointNode<TreeNodeDatum>) => {
            const idx = node.data.attributes?.["idx"];
            if (idx) {
                dispatch(setFromHistory(Number(idx)));
            }
        },
        [dispatch, setFromHistory]
    );

    return (
        <div className="history tree" hidden={props.hidden}>
            <Tree
                collapsible={false}
                onNodeClick={handleNodeClick}
                data={historyToTree(0)}
                orientation={"vertical"}
                rootNodeClassName="history node"
                branchNodeClassName="history node"
                leafNodeClassName="history node"
            />
        </div>
    );
}

function timeDiff(timeMs: number): string {
    const now = new Date().getTime();
    const diffMs = now - timeMs;
    const diffSec = Math.round(diffMs / 1000);
    if (diffSec < 1) {
        return "0";
    }
    const diffMins = Math.round(diffSec / 60);
    if (diffMins < 1) {
        return `${diffSec} sec`;
    }
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 1) {
        return `${diffMins} min`;
    }
    return `${diffHours} hour`;
}
