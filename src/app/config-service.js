
import store from 'store2';

const EDITOR_CONFIG_KEY = 'editorConfig';

export const configService = {
  setEditorConfig,
  getEditorConfig,
};

function setEditorConfig(mode, action) {
  console.log('mode');
  console.log(mode);
  console.log('action');
  console.log(action);
  store.set(EDITOR_CONFIG_KEY, {
    mode,
    // action,
  });
}

function getEditorConfig(mode, action) {
  if(!store.has(EDITOR_CONFIG_KEY)) {
    return undefined;
  }
  return store.get(EDITOR_CONFIG_KEY);
}

