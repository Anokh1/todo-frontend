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
    getDates((response) => {
      const { data } = response;

      if (data) {
        const treeNodes: TreeNode[] = Object.entries(data).map(
          ([date, array], index) => {
            // Ensure array is treated as an array of strings
            const arrayAsStrings = Array.isArray(array) ? array : [array];

            // date is the key (date)
            // array is the value (array)
            const childrenNodes: TreeNode[] = arrayAsStrings.map(
              (title: string, i: number) => ({
                key: `${index}-${i}`,
                data: { date: title },
              })
            );

            return {
              key: date,
              data: { date },
              children: childrenNodes,
            };
          }
        );
        setNodes(treeNodes);
      }
    });
  }, [triggerUpdate]);

  return (
    <div className="tree">
      <TreeTable value={nodes} tableStyle={{ minWidth: "10rem" }}>
        <Column field="date" header="Date" expander></Column>
        {/* <Column field="title" header="Title"></Column> */}
      </TreeTable>
    </div>
  );
}
