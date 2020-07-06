
import { world } from './world-service';

import { ENTITY_ENUM } from '../world/entities/entity-enum';
import { EDIT_MODES, EDITOR_STATES } from './top-tools/top-tools';
import { EDIT_ACTIONS } from './top-tools/edit-actions';
import { Point } from '../world/geometry/shapes';

export const editCtrl = {
  handleClick,
  getEditorState,
};

interface HandleClickParams {
  evt: Point;
  editMode: EDIT_MODES;
  editAction: ENTITY_ENUM;
  editState: EDITOR_STATES;
}

function handleClick({
  evt,
  editMode,
  editAction,
  editState,
}: HandleClickParams) {
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

interface HandleAddClickParams {
  evt: Point;
  editAction: ENTITY_ENUM;
  editState: EDITOR_STATES;
}

function handleAddClick({
  evt,
  editAction,
  editState,
}: HandleAddClickParams) {
  console.log('handleAddClick');
  console.log(`editAction: ${editAction}`);
  switch(editAction) {
    case ENTITY_ENUM.PIPE:
      return handleAddPipeClick({ evt, editState });
  }
}

interface HandleAddPipeClickParams {
  evt: Point;
  editState: EDITOR_STATES;
}

function handleAddPipeClick({
  evt,
  editState,
}: HandleAddPipeClickParams) {
  switch(editState) {
    case EDITOR_STATES.DRAW:
      return world.createPipe(evt.x, evt.y);
  }
}

interface GetEditorStateParams {
  editMode: EDIT_MODES;
  editAction: ENTITY_ENUM | EDIT_ACTIONS;
  editState: EDITOR_STATES;
}

function getEditorState({
  editMode,
  editAction,
  editState,
}: GetEditorStateParams) {
  switch(editMode) {
    case EDIT_MODES.ADD:
      editAction = (editAction as ENTITY_ENUM);
      return getAddEditState({ editAction, editState });
    case EDIT_MODES.EDIT:
      editAction = (editAction as EDIT_ACTIONS);
      return getEditState({ editAction, editState })
  }
}

interface GetAddEditStateParams {
  editAction: ENTITY_ENUM;
  editState: EDITOR_STATES;
}

function getAddEditState({
  editAction,
  editState,
}: GetAddEditStateParams) {
  switch(editAction) {
    case ENTITY_ENUM.PIPE:
      if(!editState) {
        return EDITOR_STATES.PASSIVE;
      }
      if(editState === EDITOR_STATES.PASSIVE) {
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

interface GetEditStateParams {
  editAction: EDIT_ACTIONS;
  editState: EDITOR_STATES;
}

function getEditState({
  editAction,
  editState,
}: GetEditStateParams) {
  switch(editAction) {
    case EDIT_ACTIONS.SELECT:
      if(!editState || editState === EDITOR_STATES.PASSIVE) {
        return EDITOR_STATES.SELECTING;
      }
      if(editState === EDITOR_STATES.SELECTING) {
        return EDITOR_STATES.SELECTING;
      }
      break;
  }
}

function handleEditClick(evt: Point, editAction: EDITOR_STATES & ENTITY_ENUM) {
  switch(editAction) {
    case EDIT_ACTIONS.SELECT:
      return select(evt);
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

function select(evt: Point) {
  
}
