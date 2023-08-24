"use client";
import RadioButton from "@/components/RadioButton";
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
  NodeToolbar,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";

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

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
    style: { backgroundColor: "#6ede87", color: "white" },
  },

  {
    id: "2",
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
    style: { backgroundColor: "#ff0072", color: "white" },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
    style: { backgroundColor: "#6865A5", color: "white" },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

const initBgColor = "#1A192B";

export default function App() {
  const [isMinimapEnabled, setIsMinimapEnabled] = useState(false);
  const [isControlEnabled, setIsControlEnabled] = useState(false);
  const [selectedBackgroundVariant, setSelectedBackgroundVariant] = useState(
    BackgroundVariant.Dots
  );
  const [bgColor, setBgColor] = useState(initBgColor);
  const [isAutoBgColor, setIsAutoBgColor] = useState<"AUTO" | "MANUAL">("AUTO");
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
  const customStyle = {
    backgroundColor: bgColor,
  };
  return (
    <div className="flex flex-col w-screen h-screen">
      {/* <div className="w-full h-fit bg-white p-2">
        <Link
          className="bg-blue-200 py-1 px-2 rounded text-blue-700 border-blue-700 border"
          href={""}
        >
          Default
        </Link>
      </div> */}
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultEdgeOptions={defaultEdgeOptions}
          className={`${
            isAutoBgColor === "MANUAL"
              ? ``
              : " bg-slate-50 dark:bg-slate-950 "
          } transition-colors `}
          style={{ ...(isAutoBgColor === "MANUAL" ? customStyle : {}) }}
        >
          {isControlEnabled && <Controls />}

          {isMinimapEnabled && (
            <MiniMap
              nodeColor={nodeColor}
              nodeStrokeWidth={3}
              zoomable
              pannable
            />
          )}
          <NodeToolbar />
          <Panel
            className="bg-transparent flex flex-col gap-6 select-none"
            position="top-right"
          >
            <div className="bg-white  dark:bg-slate-900 pb-4  rounded-lg border-2 shadow-xl border-blue-500 dark:border-slate-500   flex flex-col gap-2 ">
              <div className="font-semibold mb-1 rounded-t-lg text-lg w-full border-b-2 py-1 text-blue-800 dark:text-slate-50 bg-blue-100  dark:bg-slate-800  border-blue-500 dark:border-slate-500 px-2 text-center ">
                Plugins
              </div>
              <div className=" px-4 flex flex-col gap-2  ">
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
              </div>
            </div>

            <div className="bg-white  dark:bg-slate-900 pb-4  rounded-lg border-2 shadow-xl border-blue-500 dark:border-slate-500   flex flex-col gap-2 ">
              <div className="font-semibold mb-1 rounded-t-lg text-lg w-full border-b-2 py-1 text-blue-800 dark:text-slate-50 bg-blue-100  dark:bg-slate-800  border-blue-500 dark:border-slate-500 px-2 text-center ">
                Texture
              </div>
              <div className=" px-4 flex flex-col gap-2  ">
                <RadioButton
                  label="Dots"
                  checkedValue={selectedBackgroundVariant}
                  groupName="BackgroundVariant"
                  setCheckedValue={setSelectedBackgroundVariant}
                  value={BackgroundVariant.Dots}
                />
                <RadioButton
                  label="Cross"
                  checkedValue={selectedBackgroundVariant}
                  groupName="BackgroundVariant"
                  setCheckedValue={setSelectedBackgroundVariant}
                  value={BackgroundVariant.Cross}
                />
                <RadioButton
                  label="Lines"
                  checkedValue={selectedBackgroundVariant}
                  groupName="BackgroundVariant"
                  setCheckedValue={setSelectedBackgroundVariant}
                  value={BackgroundVariant.Lines}
                />
              </div>
            </div>
            <div className="bg-white  dark:bg-slate-900 pb-4  rounded-lg border-2 shadow-xl border-blue-500 dark:border-slate-500   flex flex-col gap-2 ">
              <div className="font-semibold mb-1 rounded-t-lg text-lg w-full border-b-2 py-1 text-blue-800 dark:text-slate-50 bg-blue-100  dark:bg-slate-800  border-blue-500 dark:border-slate-500 px-2 text-center ">
                Background
              </div>
              <div className=" px-4 flex flex-col gap-2  ">
                <RadioButton
                  label="Auto"
                  checkedValue={isAutoBgColor}
                  groupName="BackgroundColorSelectMode"
                  setCheckedValue={setIsAutoBgColor}
                  value={"AUTO"}
                />
                <RadioButton
                  label="Manual"
                  checkedValue={isAutoBgColor}
                  groupName="BackgroundColorSelectMode"
                  setCheckedValue={setIsAutoBgColor}
                  value={"MANUAL"}
                />
                <div>
                  <input
                    className={`w-full p-0 m-0 outline-none stroke-none rounded-full  border-transparent outline-transparent  bg-transparent cursor-pointer `}
                    id="nativeColorPicker1"
                    type="color"
                    value={bgColor}
                    onChange={(ev) => {
                      setBgColor(ev.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </Panel>

          <Background
            variant={selectedBackgroundVariant}
            gap={12}
            size={
              selectedBackgroundVariant === BackgroundVariant.Dots
                ? 1.5
                : undefined
            }
            color={
              selectedBackgroundVariant === BackgroundVariant.Dots
                ? "gray"
                : "#ccc"
            }
          />
        </ReactFlow>
      </div>
    </div>
  );
}
