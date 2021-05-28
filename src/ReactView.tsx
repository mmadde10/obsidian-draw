import { App, ItemView, Modal, Notice, Plugin, PluginSettingTab, Setting, Workspace, WorkspaceLeaf } from 'obsidian';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CanvasView from './CanvasView';


export default class ReactView extends ItemView {
	private reactComponent: React.ReactElement;
  
	getViewType(): string {
	  return "react-view2";
	}
  
	getDisplayText(): string {
	  return "Canvas View";
	}
  
    // TODO: Change Icon
	getIcon(): string {
	  return "pencil";
	}
  
	async onOpen(): Promise<void> {
	  this.reactComponent = React.createElement(CanvasView);
  
	  // eslint-disable-next-line @typescript-eslint/no-explicit-any
	  ReactDOM.render(this.reactComponent, (this as any).contentEl);
	}
}