import { FileView, TFile, ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Canvas from "./components/Canvas";

export default class CanvasView extends ItemView{
  
    constructor(leaf: WorkspaceLeaf) {
      super(leaf);
    }
  
    getViewType(): string {
      return "Canvas View";
    }
    getDisplayText(): string {
      return "Canvas"
    }

    constructCanvas(){
        ReactDOM.unmountComponentAtNode(this.contentEl);
        ReactDOM.render(
            <Canvas/>,
            this.contentEl
        )
    }
  }