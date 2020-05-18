
import { world } from './world-service';

import { ENTITY_ENUM } from '../world/entities/entity-enum';
import { EDIT_MODES, EDITOR_STATES } from './top-tools/top-tools';
import { EDIT_ACTIONS } from './top-tools/edit-actions';

export const editCtrl = {
  handleClick,
  getEditState,
};

function handleClick({
  evt,
  editMode,
  editAction,
  editState,
}) {
  if(!editMode || !editAction) {
    return;
  }
  switch(editMode) {
    case EDIT_MODES.ADD:
      return handleAddClick({
        evt,
        editAction,
        editState,
      });
    case EDIT_MODES.EDIT:
      // return handleEditClick(event, editAction);
  }
}

function handleAddClick({
  evt,
  editAction,
  editState,
}) {
  console.log('handleAddClick');
  console.log(`editAction: ${editAction}`);
  switch(editAction) {
    case ENTITY_ENUM.PIPE:
      return handleAddPipeClick({ evt, editState });
  }
}

function handleAddPipeClick({ evt, editState }) {
  switch(editState) {
    case EDITOR_STATES.DRAW:
      return world.createPipe(evt.x, evt.y);
  }
}

function getEditState({
  editMode,
  editAction,
  editState,
}) {
  switch(editMode) {
    case EDIT_MODES.ADD:
      return getAddEditState({ editAction, editState });
  }
}

function getAddEditState({ editAction, editState }) {
  switch(editAction) {
    case ENTITY_ENUM.PIPE:
      if(!editState || editState === EDITOR_STATES.PASSIVE) {
        return EDITOR_STATES.DRAW;
      }
      if(editState === EDITOR_STATES.DRAW) {
        return EDITOR_STATES.PASSIVE;
      }
      break;
    case ENTITY_ENUM.RESERVOIR:
      break;
  }
}

function handleEditClick(evt, editAction) {
  const { x, y } = evt;
  switch(editAction) {
    case EDIT_ACTIONS.SELECT:
      return select(x, y);
    case EDIT_ACTIONS.MOVE:
      break;
    case EDIT_ACTIONS.LINE:
      break;
    case EDIT_ACTIONS.MARQUEE:
      break;
    case EDIT_ACTIONS.DELETE:
      break;
    case EDIT_ACTIONS.PAN:
      break;
  }
}

function select(x, y) {
  
}
