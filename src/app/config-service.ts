
import store from 'store2';
import { EditModes } from './top-tools/top-tools';
import { AddDrawerItem } from './top-tools/add-drawer/add-drawer';
import { EditDrawerItem } from './top-tools/edit-drawer/edit-drawer';

export interface EditorConfig {
  mode: keyof EditModes;
  action: AddDrawerItem | EditDrawerItem;
}

const EDITOR_CONFIG_KEY = 'editorConfig';

export const configService = {
  setEditorConfig,
  getEditorConfig,
};

function setEditorConfig(mode: keyof EditModes, action: AddDrawerItem | EditDrawerItem) {
  store.set(EDITOR_CONFIG_KEY, {
    mode,
    // action,
  });
}

function getEditorConfig() {
  let editorConfig: EditorConfig;
  if(!store.has(EDITOR_CONFIG_KEY)) {
    return undefined;
  }
  editorConfig = store.get(EDITOR_CONFIG_KEY);
  return editorConfig;
}
