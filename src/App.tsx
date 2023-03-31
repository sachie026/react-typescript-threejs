import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import useWebSocket from "react-use-websocket";

import Cube from "./components/cube";
import Cylinder from "./components/cylinder";
import Sphere from "./components/sphere";

import "./App.css";

import {
  COLOR,
  DEFAULT_GEOMETRY_SIZE,
  GEOMETRY_UPDATE_INTERVAL_TIME,
} from "./constants";

function App() {
  const [, setForceUpdate] = useState(Date.now());
  const sizeRef = useRef(DEFAULT_GEOMETRY_SIZE);

  const updateCurrentSize = (event: MessageEvent<any>) => {
    try {
      sizeRef.current = parseFloat(event.data);
    } catch (e) {
      sizeRef.current = DEFAULT_GEOMETRY_SIZE;
    }
    setForceUpdate(Date.now());
  };

  const { sendMessage } = useWebSocket("ws://localhost:7890", {
    onMessage: updateCurrentSize,
  });

  useEffect(() => {
    const geometryUpdateIntervalId = setInterval(() => {
      sendMessage("size_request");
    }, GEOMETRY_UPDATE_INTERVAL_TIME);

    return () => clearInterval(geometryUpdateIntervalId); // Important to clear the interval id
  }, [sendMessage]);

  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 15, 10]} angle={0.5} />

      <Cube color={COLOR} width={sizeRef.current} />
      <Cylinder color={COLOR} height={sizeRef.current} />
      <Sphere color={COLOR} radius={sizeRef.current} />
    </Canvas>
  );
}
export default App;
