import React, { useState, useEffect } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { getDates } from "../services/read";

interface TreeNode {
  key: string;
  data: any;
}

export default function BasicDemo() {
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
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="tree">
      <TreeTable value={nodes} tableStyle={{ minWidth: "10rem" }}>
        <Column field="date" header="Date" expander></Column>
        {/* <Column field="title" header="Title"></Column> */}
      </TreeTable>
    </div>
  );
}
