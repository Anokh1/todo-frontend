import React, { useState, useEffect } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";

const fruitData = [
  { name: "Apple", size: "Medium", type: "Fruit" },
  { name: "Banana", size: "Small", type: "Fruit" },
  { name: "Orange", size: "Medium", type: "Fruit" },
  { name: "Grapes", size: "Small", type: "Fruit" },
  { name: "Watermelon", size: "Large", type: "Fruit" },
];

interface TreeNode {
  key: string;
  data: any;
}

export default function BasicDemo() {
  const [nodes, setNodes] = useState<TreeNode[]>([]);

  useEffect(() => {
    // Convert fruitData into TreeNode array
    const treeNodes: TreeNode[] = fruitData.map((fruit, index) => ({
      key: index.toString(),
      data: fruit,
    }));

    // Set the nodes state
    setNodes(treeNodes);
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="tree">
      <TreeTable value={nodes} tableStyle={{ minWidth: "10rem" }}>
        <Column field="name" header="Name" expander></Column>
        <Column field="size" header="Size"></Column>
      </TreeTable>
    </div>
  );
}
