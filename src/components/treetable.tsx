// import React, { useState, useEffect } from "react";
// import { TreeTable } from "primereact/treetable";
// import { Column } from "primereact/column";
// import { getDates } from "../services/read";

// const fruitData = [
//   { name: "Apple", size: "Medium", type: "Fruit" },
//   { name: "Banana", size: "Small", type: "Fruit" },
//   { name: "Orange", size: "Medium", type: "Fruit" },
//   { name: "Grapes", size: "Small", type: "Fruit" },
//   { name: "Watermelon", size: "Large", type: "Fruit" },
// ];

// const dates = ["13-03-2024", "12-03-2024", "NaN-NaN-NaN"];

// interface TreeNode {
//   key: string;
//   data: any;
// }

// interface DateList {
//   date: string;
// }

// export default function BasicDemo() {
//   const [nodes, setNodes] = useState<TreeNode[]>([]);
//   const [date, setDate] = useState<DateList[]>([]);

//   useEffect(() => {
//     // Convert fruitData into TreeNode array
//     // const treeNodes: TreeNode[] = fruitData.map((fruit, index) => ({
//     //   key: index.toString(),
//     //   data: fruit,
//     // }));

//     getDates(setDate);

//     const treeNodes: TreeNode[] = date.map((date, index) => ({
//       key: index.toString(),
//       data: { date: date },
//     }));

//     // Set the nodes state
//     setNodes(treeNodes);
//   }, []); // Empty dependency array to run the effect only once

//   return (
//     <div className="tree">
//       <TreeTable value={nodes} tableStyle={{ minWidth: "10rem" }}>
//         <Column field="date" header="Date" expander></Column>
//         <Column field="name" header="Name" expander></Column>
//         {/* <Column field="size" header="Size"></Column> */}
//       </TreeTable>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { getDates } from "../services/read";

interface TreeNode {
  key: string;
  data: any;
}

interface DateList {
  date: string;
}

export default function BasicDemo() {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [dates, setDates] = useState<DateList[]>([]);

  const extraData = [
    { id: 1, name: "Extra Data 1", value: "Value 1" },
    { id: 2, name: "Extra Data 2", value: "Value 2" },
    { id: 3, name: "Extra Data 3", value: "Value 3" },
  ];

  const someData = ["exampleData1", "exampleData2", "exampleData3"];
  const someData1 = ["2024-03-14", "exampleData2", "exampleData3"];

  useEffect(() => {
    // Fetch dates from the service
    getDates((data: DateList[]) => {
      //   console.log(data);
      // Update the state with the fetched dates
      setDates(data);
    });
  }, []); // Empty dependency array to run the effect only once

  //   useEffect(() => {
  //     // Convert fetched dates into TreeNode array
  //     const treeNodes: TreeNode[] = dates.map((date, index) => ({
  //       key: index.toString(),
  //       data: { date: date }, // Use date.date to access the date property
  //       children: [
  //         {
  //           //   key: `${index}-expander`,
  //           //   data: {
  //           //     // Add properties with data to display in the expander
  //           //     date: "egg",
  //           //   },
  //           key: `${index}-expander`,
  //           data: {
  //             // Add properties with data to display in the expander
  //             date: someData[0],
  //           },
  //         },
  //         {
  //           key: `${index}-expander`,
  //           data: {
  //             date: someData[1],
  //           },
  //         },
  //       ],
  //     }));

  //     // Set the nodes state
  //     setNodes(treeNodes);
  //   }, [dates]); // Update the nodes state when the dates state changes

  //   useEffect(() => {
  //     // Convert fetched dates into TreeNode array
  //     const treeNodes: TreeNode[] = dates.map((date, index) => {
  //       let children: TreeNode[] = [];
  //       dates.forEach((dateObj) => {
  //         console.log(dates);
  //         if (dateObj.date === "2024-03-14") {
  //           // Add children for specificDate1
  //           children = [
  //             {
  //               key: `${index}-expander`,
  //               data: {
  //                 // Add properties with data to display in the expander
  //                 date: someData[0],
  //               },
  //             },
  //             {
  //               key: `${index}-expander`,
  //               data: {
  //                 // Add properties with data to display in the expander
  //                 date: someData[1],
  //               },
  //             },
  //           ];
  //         } else {
  //           // Add children for specificDate2
  //           children = [
  //             {
  //               key: `${index}-expander`,
  //               data: {
  //                 // Add properties with data to display in the expander
  //                 date: "egg",
  //               },
  //             },
  //             {
  //               key: `${index}-expander`,
  //               data: {
  //                 // Add properties with data to display in the expander
  //                 date: someData[1],
  //               },
  //             },
  //           ];
  //         }
  //       });

  //       return {
  //         key: index.toString(),
  //         data: { date: date }, // Use date.date to access the date property
  //         children: children,
  //       };
  //     });

  //     // Set the nodes state
  //     setNodes(treeNodes);
  //   }, [dates]);

  //   const createdDates: DateList[] = dates;
  //   console.log(dates);

  useEffect(() => {
    // Convert fetched dates into TreeNode array
    // console.log(dates);

    dates.forEach((date, index) => {
      console.log(`Date at index ${index}: ${date}`);
    });

    const treeNodes: TreeNode[] = dates.map((date, index) => {
      let children: TreeNode[] = [];
      //   console.log(date);
      //   let checkDate: string = dates[0];
      //   console.log(dates[0]);
      //   console.log(date);
      //   console.log(checkDate);

      // const dateValue: string = date.date;
      //   console.log(date);

      //   const dateStrings: string[] = dates.map((date) => date);
      //   console.log(dateStrings);

      //   const dateStringArray: string[] = dates.map(date);

      // Determine children based on date
      // if (dates.date === date.date) {
      if (date.date === someData1[0]) {
        // Add children for specificDate1
        children = [
          {
            key: `${index}-expander-1`,
            data: {
              // Add properties with data to display in the expander
              date: someData[0],
            },
          },
          //   {
          //     key: `${index}-expander-2`,
          //     data: {
          //       // Add properties with data to display in the expander
          //       date: someData[1],
          //     },
          //   },
        ];
      } else {
        // Add children for specificDate2
        children = [
          {
            key: `${index}-expander-1`,
            data: {
              // Add properties with data to display in the expander
              date: "egg",
            },
          },
          {
            key: `${index}-expander-2`,
            data: {
              // Add properties with data to display in the expander
              date: someData[1],
            },
          },
        ];
      }

      return {
        key: index.toString(),
        data: { date: date }, // Use date.date to access the date property
        children: children,
      };
    });

    // Set the nodes state
    setNodes(treeNodes);
  }, [dates]);

  const columns = [
    { field: "date", header: "Date", expander: true },
    // { field: "extraData", header: "Extra Data", expander: false },
    // { field: "description", header: "Description", expander: false },
  ];

  return (
    <div className="tree">
      <TreeTable value={nodes} tableStyle={{ minWidth: "10rem" }}>
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            expander={col.expander}
          >
            {/* Custom content for the expander column */}
            {/* {col.field === "extraData" && (
              <span>This is extra data for {nodes.length} items.</span>
            )} */}
          </Column>
        ))}
      </TreeTable>
    </div>
  );
}
