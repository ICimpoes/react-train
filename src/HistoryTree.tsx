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
            const now = new Date().getTime();
            const item = history.items[idx];
            const node = {
                name: item.action,
                children: [],
                attributes: {
                    idx: idx,
                    time: timeDiff(now - item.time),
                },
            } as RawNodeDatum;
            if (idx === history.current) {
                node.attributes!["current"] = true;
            }
            for (const i of history.links[idx].next) {
                node.children?.push(historyToTree(i));
            }
            return node;
        },
        [history, timeDiff]
    );

    const handleNodeClick = React.useCallback(
        (node: HierarchyPointNode<TreeNodeDatum>) => {
            if (node.data.attributes === undefined) {
                return;
            }
            const idx = Number(node.data.attributes["idx"]);
            dispatch(setFromHistory(idx));
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

function timeDiff(diffMs: number): string {
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
