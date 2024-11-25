// import { FC, Suspense, useMemo, useEffect } from "react";
// import { Center, Select } from "@react-three/drei";
// import { useLoader } from "@react-three/fiber";
// import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

// import Label from "./Label"; // Import the Label component
// import Loader from "./Loader";
// import Stls from "./Stls";

// const files = ["bone", "heart", "LLL", "cube", "tower"];
// const color = ["#9c9ea1", "#781e14", "#d66154", "#7695FF", "#FFEAC5"];
// const opacity = [1, 1, 1];

// interface Props {
//   setSelected: any;
//   selectedView: string;
//   logGeometryData: (vertices: number[][], faces: number[][]) => void; // Add callback prop
// }

// const Editor: FC<Props> = ({ setSelected, selectedView, logGeometryData }) => {
//   // Determine which STL file to load based on `selectedView`
//   const stlFile = files.find((file) => file === selectedView);

//   // Load the STL file
//   const stl = useLoader(
//     STLLoader,
//     stlFile
//       ? [`${stlFile}.stl`]
//       : ["bone.stl", "heart.stl", "LLL.stl", "cube.stl", "tower.stl"]
//   );

//   // Find the index of the current STL file in the `files` array
//   const index = files.indexOf(stlFile ? stlFile : "bone");

//   // Extract vertices and faces for logging
//   useEffect(() => {
//     if (stl) {
//       stl.forEach((geometry) => {
//         // Extract vertices
//         const vertices = geometry.attributes.position.array;
//         const vertexList: number[][] = [];
//         for (let i = 0; i < vertices.length; i += 3) {
//           vertexList.push([vertices[i], vertices[i + 1], vertices[i + 2]]);
//         }

//         // Extract faces (indices)
//         const indices = geometry.index?.array || [];
//         const faceList: number[][] = [];
//         for (let i = 0; i < indices.length; i += 3) {
//           faceList.push([indices[i], indices[i + 1], indices[i + 2]]);
//         }

//         // Use the passed function to send vertices and faces to the parent
//         logGeometryData(vertexList, faceList);
//       });
//     }
//   }, [stl, logGeometryData]);

//   return (
//     <Suspense fallback={<Loader />}>
//       <Center>
//         <Select onChange={setSelected}>
//           <group rotation={[-Math.PI / 2, 0, 0]} dispose={null}>
//             {stl.map((stl, idx) => (
//               <Stls
//                 key={stlFile ? index : idx}
//                 opacity={opacity[stlFile ? index : idx]}
//                 organName={files[stlFile ? index : idx]}
//                 stl={stl}
//                 color={color[stlFile ? index : idx]}
//               />
//             ))}

//             {/* Labels positioned near the relevant objects */}
//             {/* <Label text="Bone" position={[0, 50, 0]} />
//             <Label text="Heart" position={[100, 0.5, 0]} />
//             <Label text="LLL" position={[2, 0.5, 0]} /> */}
//           </group>
//         </Select>
//       </Center>
//     </Suspense>
//   );
// };

// export default Editor;
