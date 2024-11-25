// import { Canvas } from "@react-three/fiber";
// import { Button } from "primereact/button";
// import { Suspense, useState } from "react";
// import { Object3D } from "three";
// import Loader from "./component/Loader";
// import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
// import Editor from "./component/Editor";
// import { Panel } from "./component/MultiLeva";

// const STL = () => {
//   const [selected, setSelected] = useState<Object3D[]>();
//   const [selectedView, setSelectedView] = useState<string>("");
//   const [geometryData, setGeometryData] = useState<{
//     vertices: number[][];
//     faces: number[][];
//   } | null>(null); // Store the vertices and faces data

//   // Handle logging the geometry data to console
//   const logGeometryData = (vertices: number[][], faces: number[][]) => {
//     setGeometryData({ vertices, faces });
//   };

//   const handleLogClick = () => {
//     if (geometryData) {
//       console.log("Vertices:", geometryData.vertices);
//       console.log("Faces:", geometryData.faces);
//     } else {
//       console.log("No geometry data available.");
//     }
//   };

//   // Inline styles
//   const buttonContainerStyle: React.CSSProperties = {
//     position: "absolute",
//     top: "10px",
//     left: "10px",
//     zIndex: 10,
//     display: "flex",
//     flexDirection: "column" as "column", // Explicitly type 'column'
//   };

//   const buttonStyle: React.CSSProperties = {
//     marginBottom: "10px",
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         height: "100vh",
//         margin: 0,
//         overflow: "hidden",
//       }}
//     >
//       <div style={buttonContainerStyle}>
//         <Button
//           label="Overall"
//           style={buttonStyle}
//           onClick={() => setSelectedView("")}
//         />
//         <Button
//           label="Bone"
//           style={buttonStyle}
//           onClick={() => setSelectedView("bone")}
//         />
//         <Button
//           label="Heart"
//           style={buttonStyle}
//           onClick={() => setSelectedView("heart")}
//         />
//         <Button
//           label="LLL"
//           style={buttonStyle}
//           onClick={() => setSelectedView("LLL")}
//         />
//         <Button
//           label="Cube"
//           style={buttonStyle}
//           onClick={() => setSelectedView("cube")}
//         />
//         <Button
//           label="Tower"
//           style={buttonStyle}
//           onClick={() => setSelectedView("tower")}
//         />
//         <Button
//           label="Log Vertices and Faces"
//           style={buttonStyle}
//           onClick={handleLogClick} // Log vertices and faces on button click
//         />
//       </div>
//       <Canvas style={{ backgroundColor: "#C1D8C3" }}>
//         <Suspense fallback={<Loader />}>
//           <PerspectiveCamera
//             makeDefault
//             fov={60}
//             aspect={window.innerWidth / window.innerHeight}
//             position={[3, 0.15, 3]}
//             near={1}
//             far={5000}
//             position-z={600}
//           ></PerspectiveCamera>
//           <Editor
//             setSelected={setSelected}
//             selectedView={selectedView}
//             logGeometryData={logGeometryData} // Pass the callback to Editor
//           />
//           <directionalLight color={0xffddcc} position={[1, 0.75, 0.5]} />
//           <directionalLight color={0xccccff} position={[-1, 0.75, -0.5]} />
//         </Suspense>
//         <OrbitControls />
//       </Canvas>
//       <Panel selected={selected} />
//     </div>
//   );
// };

// export default STL;
