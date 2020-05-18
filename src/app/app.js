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

import './app.scss';
import { ENTITY_ENUM } from '../world/entities/entity-enum';
import { BoundingRect } from '../world/entities/debug/bounding-rect';

export function App() {
  const [ entities, _setEntities ] = useState([]);
  const [ debugEntities, setDebugEntities ] = useState([]);
  const [ running, setRunning ] = useState(world.running);
  const [ epochMs, setEpochMs ] = useState(world.epochMs);
  const [ drawRt, setDrawRt ] = useState(null);

  const [ editMode, setEditMode ] = useState(null);
  const [ editState, setEditState ] = useState(EDITOR_STATES.PASSIVE);
  const [ editAction, setEditAction ] = useState(null);

  const [ pipeOrigin, setPipeOrigin ] = useState({});
  const pipeRef = useRef();

  const setEntities = (entities) => {
    // always perform an array copy to tell child components to update
    _setEntities(entities.slice());
  };

  useEffect(() => {
    let worldDeregisterCb, drawDeregisterCb, _drawRt;
    _drawRt = new Runtime({
      tickInterval: 1000 / 120 // 120 fps
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

  const handleClick = (evt) => {
    let nextEditState, ctrlResult;
    nextEditState = editCtrl.getEditState({
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

  const handleMouseMove = (evt) => {
    switch(editState) {
      case EDITOR_STATES.DRAW:
        handleDrawMouseMove(evt);
        break;
      case EDITOR_STATES.PASSIVE:
        handlePassiveMouseMove(evt);
        break;
    }

    function handleDrawMouseMove(evt) {
      switch(editAction) {
        case ENTITY_ENUM.PIPE:
          handlePipeDrawMouseMove(evt);
          break;
      }
      function handlePipeDrawMouseMove(evt) {
        if(pipeRef.current && (pipeRef.current.entityType === ENTITY_ENUM.PIPE)) {
          pipeRef.current.setEndPoint(evt.x, evt.y);
        }
      }
    };

    function handlePassiveMouseMove(evt) {
      switch(editAction) {
        case ENTITY_ENUM.PIPE:
          handlePipePassiveMouseMove(evt);
          break;
      }
      function handlePipePassiveMouseMove(evt) {
        let collidedEntities, boundingRects;
        collidedEntities = world.getBoundingCollisionsByPoint(evt);
        boundingRects = collidedEntities.map(entity => {
          return new BoundingRect(entity.id, {
            boundingRect: entity.boundingRect
          });
        });
        setDebugEntities(boundingRects);
      }
    }
  };

  const handlePlayClick = () => {
    world.running
      ? world.pause()
      : world.play();
    setRunning(world.running);
  };

  const handleEditorChange = (mode, selected) => {
    let selectedEditAction;
    if(selected !== undefined) {
      switch(mode) {
        case EDIT_MODES.ADD:
          selectedEditAction = selected.entityType;
          break;
        case EDIT_MODES.EDIT:
          selectedEditAction = selected.editType;
          break;
      }
    }
    setEditMode(mode);
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
