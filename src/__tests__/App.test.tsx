import React from "react";
import ReactThreeTestRenderer from "@react-three/test-renderer";
import Cube from "../components/cube";
import Cylinder from "../components/cylinder";
import Sphere from "../components/sphere";

test("Cube should render peoperly with mesh to have two childrens", async () => {
  const renderer = await ReactThreeTestRenderer.create(<Cube />);
  const mesh = renderer.scene.children[0].allChildren;
  expect(mesh.length).toBe(2);
});

test("Cylinder should render peoperly with to have two childrens", async () => {
  const renderer = await ReactThreeTestRenderer.create(<Cylinder />);
  const mesh = renderer.scene.children[0].allChildren;
  expect(mesh.length).toBe(2);
});

test("Sphere should render peoperly with to have two childrens", async () => {
  const renderer = await ReactThreeTestRenderer.create(<Sphere />);
  const mesh = renderer.scene.children[0].allChildren;
  expect(mesh.length).toBe(2);
});
