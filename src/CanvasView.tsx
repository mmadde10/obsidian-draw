import { FileView, TFile, ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import SketchCanvas from "./components/SketchCanvas";

export default function CanvasView(): JSX.Element{
  return (
    <>
    <div className="CanvasViewContainer">
      <SketchCanvas></SketchCanvas>
    </div>
    </>
  )
}