"use client";
import ToggleButton from "@/components/ToggleButton";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Connection,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  DefaultEdgeOptions,
  Panel,
  GetMiniMapNodeAttribute,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const nodeColor = (node: any) => {
  switch (node.type) {
    case "input":
      return "#6ede87";
    case "output":
      return "#6865A5";
    default:
      return "#ff0072";
  }
};

const nodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
];

const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

export default function App() {
  const [isMinimapEnabled, setIsMinimapEnabled] = useState(false);
  const [isControlEnabled, setIsControlEnabled] = useState(false);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  const defaultEdgeOptions: DefaultEdgeOptions = { animated: false };

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="w-full h-fit bg-white p-2">
        <Link
          className="bg-blue-200 py-1 px-2 rounded text-blue-700 border-blue-700 border"
          href={""}
        >
          Default
        </Link>
      </div>
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultEdgeOptions={defaultEdgeOptions}
          className="bg-slate-100"
        >
          <div className="w-32 h-64 bg-white  "></div>
          {isControlEnabled && <Controls />}

          {isMinimapEnabled && (
            <MiniMap
              nodeColor={nodeColor}
              nodeStrokeWidth={3}
              zoomable
              pannable
            />
          )}
          <Panel
            className="bg-white py-2 px-4 rounded-md border-2 shadow-xl border-blue-600 flex flex-col gap-2 "
            position="top-right"
          >
            <div className="font-semibold mb-1">Options</div>
            <ToggleButton
              checkedValue={isMinimapEnabled}
              setCheckedValue={setIsMinimapEnabled}
              label="Minimap"
            />
            <ToggleButton
              checkedValue={isControlEnabled}
              setCheckedValue={setIsControlEnabled}
              label="Controls"
            />
          </Panel>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
