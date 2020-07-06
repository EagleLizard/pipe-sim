import './app.scss';
import React, { useState, useEffect, useRef } from 'react';

import { world } from './world-service';
import { Runtime } from '../world/runtime';
import { editCtrl } from './edit-ctrl';

import { SimView } from './sim-view/sim-view';
import {
  TopTools,
  EDIT_MODES,
  EDITOR_STATES,
} from './top-tools/top-tools';
import { ENTITY_ENUM } from '../world/entities/entity-enum';
import { BoundingRect } from '../world/entities/debug/bounding-rect';
import { Point } from '../world/geometry/shapes';
import { Entity } from '../world/entities/entity';
import { Pipe } from '../world/entities/pipe/pipe';
import { EditDrawerItem } from './top-tools/edit-drawer/edit-drawer';
import { AddDrawerItem } from './top-tools/add-drawer/add-drawer';
import { EDIT_ACTIONS } from './top-tools/edit-actions';

export function App() {
  const [ entities, _setEntities ] = useState([]);
  const [ debugEntities, setDebugEntities ] = useState([]);
  const [ running, setRunning ] = useState(world.running);
  const [ epochMs, setEpochMs ] = useState(world.epochMs);
  const [ drawRt, setDrawRt ] = useState(null);

  const [ editMode, setEditMode ] = useState(null);
  const [ editState, setEditState ] = useState<EDITOR_STATES>(EDITOR_STATES.PASSIVE);
  const [ editAction, setEditAction ] = useState(null);

  const [ pipeOrigin, setPipeOrigin ] = useState({});
  const pipeRef = useRef<Pipe>();

  const setEntities = (entities: Entity[]) => {
    // always perform an array copy to tell child components to update
    _setEntities(entities.slice());
  };

  useEffect(() => {
    let worldDeregisterCb: () => unknown, drawDeregisterCb: () => unknown, _drawRt;
    _drawRt = new Runtime({
      tickInterval: 1000 / 60 // 60 fps
    });
    setDrawRt(_drawRt);

    worldDeregisterCb = world.onTick(() => {
      setEpochMs(world.epochMs);
    });
    drawDeregisterCb = _drawRt.onTick(() => {
      setEntities(world.entities);
    });

    _drawRt.start();

    return () => {
      world.pause();
      drawRt.pause();
      worldDeregisterCb();
      drawDeregisterCb();
    };
  }, []);

  const handleClick = (evt: Point) => {
    let nextEditState: EDITOR_STATES, ctrlResult;
    nextEditState = editCtrl.getEditorState({
      editMode,
      editAction,
      editState,
    });
    setEditState(nextEditState);
    ctrlResult = editCtrl.handleClick({
      evt,
      editMode,
      editAction,
      editState: nextEditState,
    });
    switch(editAction) {
      case ENTITY_ENUM.PIPE:
        if(ctrlResult && ctrlResult.entityType === ENTITY_ENUM.PIPE) {
          pipeRef.current = ctrlResult;
        }
        break;
    }
  };

  const handleMouseMove = (evt: Point) => {
    switch(editState) {
      case EDITOR_STATES.DRAW:
        handleDrawMouseMove(evt);
        break;
      case EDITOR_STATES.PASSIVE:
        handlePassiveMouseMove(evt);
        break;
      case EDITOR_STATES.SELECTING:
        handlePassiveMouseMove(evt);
        break;
    }

    function handleDrawMouseMove(evt: Point) {
      switch(editAction) {
        case ENTITY_ENUM.PIPE:
          handlePipeDrawMouseMove(evt);
          break;
      }
      function handlePipeDrawMouseMove(evt: Point) {
        if(pipeRef.current && (pipeRef.current.entityType === ENTITY_ENUM.PIPE)) {
          pipeRef.current.setEndPoint(evt.x, evt.y);
        }
      }
    };

    function handlePassiveMouseMove(evt: Point) {
      let collidedEntities, boundingRects;
      switch(editAction) {
        case ENTITY_ENUM.PIPE:
          handlePipePassiveMouseMove(evt);
          break;
        case EDIT_ACTIONS.DELETE:

      }
      collidedEntities = world.getBoundingCollisionsByPoint(evt);
      boundingRects = collidedEntities.map(entity => {
        return new BoundingRect(entity.id, {
          boundingRect: entity.boundingRect
        });
      });
      setDebugEntities(boundingRects);
      
      function handlePipePassiveMouseMove(evt: Point) {
        
      }

    }
  };

  const handlePlayClick = () => {
    world.running
      ? world.pause()
      : world.play();
    setRunning(world.running);
  };

  const handleEditorChange = (mode: EDIT_MODES, selected: AddDrawerItem | EditDrawerItem) => {
    let selectedEditAction: ENTITY_ENUM | EDIT_ACTIONS, nextEditState: EDITOR_STATES;
    if(selected !== undefined) {
      switch(mode) {
        case EDIT_MODES.ADD:
          selectedEditAction = (selected as AddDrawerItem).entityType;
          break;
        case EDIT_MODES.EDIT:
          selectedEditAction = (selected as EditDrawerItem).editType;
          break;
      }
    }
    nextEditState = editCtrl.getEditorState({
      editMode: mode,
      editAction: selectedEditAction,
      editState,
    });
    setEditMode(mode);
    setEditState(nextEditState);
    setEditAction(selectedEditAction);
  };

  return (
    <div className="sim-app">
      <TopTools
        running={running}
        onPlayClick={handlePlayClick}
        onEditorChange={handleEditorChange}
      />
      <div>
        Runtime: { epochMs / 1000 }s
      </div>
      <div>
        <div>
          Edit Action: { editAction }
        </div>
        <div>
          Edit State: { editState }
        </div>
      </div>
      <div className="view-container">
        <SimView
          onClick={(e) => handleClick(e)}
          onMouseMove={(e) => handleMouseMove(e)}
          entities={entities}
          debugEntities={debugEntities}
        />
      </div>
    </div>
  );
}
