import { App, ItemView, Modal, Notice, Plugin, PluginSettingTab, Setting, Workspace, WorkspaceLeaf } from 'obsidian';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DiceRoller from './components/DiceRoller';
import ReactView from './ReactView';

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

const VIEW_TYPE = "react-view2";

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	private view: ReactView;

	async onload() {
		console.log('loading plugin');

		this.registerView(
			VIEW_TYPE,
			(leaf: WorkspaceLeaf) => (this.view = new ReactView(leaf))
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
			id: 'app:open-new-canvas',
			name: 'Open New Canvas',
			callback: () => this.initLeaf(),
			hotkeys: []
		});

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	//TODO: Change this from a leaf to workspace editor (Figure out what that is)
	initLeaf() {
		if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length > 0) {
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