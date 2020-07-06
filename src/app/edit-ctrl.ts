
import { world } from './world-service';

import { ENTITY_ENUM, EntityEnum } from '../world/entities/entity-enum';
import { EDIT_MODES, EDITOR_STATES, EditModes, EditorStates } from './top-tools/top-tools';
import { EDIT_ACTIONS, EditActions } from './top-tools/edit-actions';
import { Point } from '../world/geometry/shapes';

export const editCtrl = {
  handleClick,
  getEditState,
};

interface HandleClickParams {
  evt: Point;
  editMode: keyof EditModes;
  editAction: keyof EntityEnum;
  editState: keyof EditorStates;
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
  editAction: keyof EntityEnum;
  editState: keyof EditorStates;
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
  editState: keyof EditorStates;
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

interface GetEditStateParams {
  editMode: keyof EditModes;
  editAction: keyof EntityEnum;
  editState: keyof EditorStates;
}

function getEditState({
  editMode,
  editAction,
  editState,
}: GetEditStateParams) {
  switch(editMode) {
    case EDIT_MODES.ADD:
      return getAddEditState({ editAction, editState });
  }
}

interface GetAddEditStateParams {
  editAction: keyof EntityEnum;
  editState: keyof EditorStates;
}

function getAddEditState({
  editAction,
  editState,
}: GetAddEditStateParams) {
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

function handleEditClick(evt: Point, editAction: keyof EditActions) {
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
