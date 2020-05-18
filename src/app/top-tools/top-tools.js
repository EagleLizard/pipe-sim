import React, { useState, useEffect } from 'react';
import { IconButton, Button } from '@material-ui/core';
import { PlayArrow, Pause } from '@material-ui/icons';

import { configService } from '../config-service';

import { AddDrawer } from './add-drawer/add-drawer';
import { EditDrawer } from './edit-drawer/edit-drawer';

export const EDIT_MODES = {
  ADD: 'ADD',
  EDIT: 'EDIT',
};

export const EDITOR_STATES = {
  DRAW: 'DRAW',
  PASSIVE: 'PASSIVE', // indicates no current action in-progress
};

const EDIT_BUTTONS = [
  {
    label: 'ADD',
    mode: EDIT_MODES.ADD,
  },
  {
    label: 'EDIT',
    mode: EDIT_MODES.EDIT,
  },
];

import './top-tools.scss';

export function TopTools(props) {

  const [ editMode, setEditMode ] = useState();
  const [ selectedAddItem, setSelectedAddItem ] = useState();
  const [ selectedEditItem, setSelectedEditItem ] = useState();

  const handleModeButtonClick = editButton => {
    setEditMode(editButton.mode);
    onEditorChange(editButton.mode);
  };

  const handlePlayClick = (evt) => {
    props.onPlayClick(evt);
  };

  const handleAddItemSelect = selectedItem => {
    console.log(selectedItem);
    setSelectedAddItem(selectedItem);
    onEditorChange(editMode, selectedItem);
  };

  const handleEditItemSelect = selectedItem => {
    console.log(selectedItem);
    setSelectedEditItem(selectedItem);
    onEditorChange(editMode, selectedItem);
  };

  const onEditorChange = (mode, selected) => {
    console.log('onEditorChange in topTools');
    if(mode === undefined) {
      mode = editMode;
    }
    if(selected === undefined) {
      switch(mode) {
        case EDIT_MODES.ADD:
          selected = selectedAddItem;
          break;
        case EDIT_MODES.EDIT:
          selected = selectedEditItem;
          break;
      }
    }
    props.onEditorChange(mode, selected);
    configService.setEditorConfig(mode, selected);
  };

  useEffect(() => {
    let editorConfig, mode, action;
    editorConfig = configService.getEditorConfig();
    if(editorConfig !== undefined) {
      mode = editorConfig.mode;
      action = editorConfig.action;
    }
    setEditMode(mode);
    setSelectedEditItem(action);
    onEditorChange(mode, action);
  }, []);

  const getDrawer = () => {
    switch(editMode) {
      case EDIT_MODES.ADD:
        return (
          <AddDrawer
            onSelect={handleAddItemSelect}
            selected={selectedAddItem}
          />
        );
      case EDIT_MODES.EDIT:
        return (
          <EditDrawer
            onSelect={handleEditItemSelect}
            selected={selectedEditItem}
          />
        )
      default:
        return (<div>Nothing Selected</div>);
    }
  };

  return (
    <div className="top-tools">
      <div className="edit-modes">
        {
          EDIT_BUTTONS.map((editButton, idx) => (
            <Button
              key={idx}
              variant="contained"
              disableElevation="true"
              className={`edit-mode-button ${(editButton.mode === editMode) ? 'selected' : ''}`}
              onClick={e => handleModeButtonClick(editButton)}>
              {
                editButton.label
              }
            </Button>
          ))
        }
      </div>
      <div className="drawer-container">
        {
          getDrawer()
        }
      </div>
      <div className="time-control">
        <IconButton onClick={e => handlePlayClick(e)}>
          {
            props.running
              ? <Pause/>
              : <PlayArrow/>
          }
        </IconButton>
      </div>
    </div>
  );
}
