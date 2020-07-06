
import './top-tools.scss';
import React, { useState, useEffect, MouseEvent } from 'react';
import { IconButton, Button } from '@material-ui/core';
import { PlayArrow, Pause } from '@material-ui/icons';

import { configService, EditorConfig } from '../config-service';

import { AddDrawer, AddDrawerItem } from './add-drawer/add-drawer';
import { EditDrawer, EditDrawerItem } from './edit-drawer/edit-drawer';

export enum EDIT_MODES {
  ADD = 'ADD',
  EDIT = 'EDIT',
};

export enum EDITOR_STATES {
  DRAW = 'DRAW',
  PASSIVE = 'PASSIVE', // indicates no current action in-progress
  SELECTING = 'SELECTING',
  SELECTED = 'SELECTED',
};

interface EditButton {
  label: string;
  mode: EDIT_MODES;
}

const EDIT_BUTTONS: EditButton[] = [
  {
    label: 'ADD',
    mode: EDIT_MODES.ADD,
  },
  {
    label: 'EDIT',
    mode: EDIT_MODES.EDIT,
  },
];

interface TopToolsProps {
  running: boolean;
  onEditorChange: (mode: EDIT_MODES, selected?: AddDrawerItem | EditDrawerItem) => unknown;
  onPlayClick: (evt: MouseEvent) => unknown;
}

export function TopTools(props: TopToolsProps) {

  const [ editMode, setEditMode ] = useState<EDIT_MODES>();
  const [ selectedAddItem, setSelectedAddItem ] = useState<AddDrawerItem>();
  const [ selectedEditItem, setSelectedEditItem ] = useState<EditDrawerItem>();

  const handleModeButtonClick = (editButton: EditButton) => {
    setEditMode(editButton.mode);
    onEditorChange(editButton.mode);
  };

  const handlePlayClick = (evt: MouseEvent) => {
    props.onPlayClick(evt);
  };

  const handleAddItemSelect = (selectedItem: AddDrawerItem) => {
    console.log(selectedItem);
    setSelectedAddItem(selectedItem);
    onEditorChange(editMode, selectedItem);
  };

  const handleEditItemSelect = (selectedItem: EditDrawerItem) => {
    console.log(selectedItem);
    setSelectedEditItem(selectedItem);
    onEditorChange(editMode, selectedItem);
  };

  const onEditorChange = (mode: EDIT_MODES, selected?: AddDrawerItem | EditDrawerItem) => {
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
    let editorConfig: EditorConfig, mode: EDIT_MODES, action: AddDrawerItem | EditDrawerItem;
    editorConfig = configService.getEditorConfig();
    if(editorConfig !== undefined) {
      mode = editorConfig.mode;
      action = editorConfig.action;
    }
    setEditMode(mode);
    switch(mode) {
      case EDIT_MODES.ADD:
        setSelectedAddItem(action as AddDrawerItem);
      case EDIT_MODES.EDIT:
        setSelectedEditItem(action as EditDrawerItem);
    }
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
              disableElevation={true}
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
