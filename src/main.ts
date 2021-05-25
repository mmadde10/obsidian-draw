import { App, ItemView, Modal, Notice, Plugin, PluginSettingTab, Setting, Workspace, WorkspaceLeaf } from 'obsidian';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DiceRoller from './components/DiceRoller';

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

const VIEW_TYPE = "react-view2";

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	private view: MyReactView;

	async onload() {
		console.log('loading plugin');


		this.registerView(
			VIEW_TYPE,
			(leaf: WorkspaceLeaf) => (this.view = new MyReactView(leaf))
		  );

		this.addCommand({
			id: 'open-sample-modal',
			name: 'Open Sample Modal',
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						new SampleModal(this.app).open();
					}
					return true;
				}
				return false;
			}
		});

		this.addCommand({
			id: 'app:show-day-planner-timeline',
			name: 'Show the Day Planner Timeline',
			callback: () => this.initLeaf(),
			hotkeys: []
		});

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	//TODO: Change this from a leaf to workspace editor (Figure out what that is)
	initLeaf() {
		if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length > 0) {
			console.log("leafs exist", this.app.workspace.getLeavesOfType(VIEW_TYPE).length)
		  return;
		}
		this.app.workspace.getRightLeaf(false).setViewState({
		  type: VIEW_TYPE,
		});
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
	
}

class MyReactView extends ItemView {
	private reactComponent: React.ReactElement;
  
	getViewType(): string {
	  return VIEW_TYPE;
	}
  
	getDisplayText(): string {
	  return "Dice Roller";
	}
  
	getIcon(): string {
	  return "calendar-with-checkmark";
	}
  
	async onOpen(): Promise<void> {
	  this.reactComponent = React.createElement(DiceRoller);
  
	  // eslint-disable-next-line @typescript-eslint/no-explicit-any
	  ReactDOM.render(this.reactComponent, (this as any).contentEl);
	}
  }

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		let {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}
}