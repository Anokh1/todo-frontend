import React, { useState, useEffect } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { getDates } from "../services/read";

interface TreeNode {
  key: string;
  data: any;
}

interface TableTreeProps {
  triggerUpdate: boolean; // Specify the type as boolean
  setTriggerUpdate: React.Dispatch<React.SetStateAction<boolean>>; // Type of the setter function
}

export default function TableTree({
  triggerUpdate,
  setTriggerUpdate,
}: TableTreeProps) {
  const [nodes, setNodes] = useState<TreeNode[]>([]);

  useEffect(() => {
    getDates((data) => {
      const treeNodes: TreeNode[] = Object.entries(data).map(
        ([date, titles], index) => ({
          key: index.toString(),
          data: { date: date },
          children: titles.map((title, i) => ({
            key: `${index}-${i}`,
            data: { date: title },
          })),
        })
      );

      setNodes(treeNodes);
    });
  }, [triggerUpdate]); // Listen for changes in triggerUpdate

  return (
    <div className="tree">
      <TreeTable value={nodes} tableStyle={{ minWidth: "10rem" }}>
        <Column field="date" header="Date" expander></Column>
        {/* <Column field="title" header="Title"></Column> */}
      </TreeTable>
    </div>
  );
}
