
import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import _debounce from 'lodash.debounce';

import { Point } from '../../world/geometry/shapes';
import { EventBusy } from '@material-ui/icons';
import { Entity } from '../../world/entities/entity';

interface SimViewProps {
  onClick: (e: Point) => unknown;
  onMouseMove: (e: Point) => unknown; 
  entities: Entity[];
  debugEntities: Entity[];
}

export function SimView(props: SimViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ width, setWidth ] = useState(600);
  const [ height, setHeight ] = useState(600 / (4 / 3));
  const [ context, setContext ] = useState<CanvasRenderingContext2D>(null);

  const onClick = props.onClick || (() => {});
  const onMouseMove = props.onMouseMove || (() => {});

  useEffect(() => {
    setContext(canvasRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    if(canvasRef.current !== null && context !== null) {
      clearView(context, canvasRef.current);
      drawEntities(context, props.entities);
      drawEntities(context, props.debugEntities);
    }
  }, [ props.entities, props.debugEntities ]);

  const handleClick = (evt: MouseEvent<HTMLCanvasElement>) => {
    let eventData: Point, canvasRect;
    canvasRect = canvasRef.current.getBoundingClientRect();
    eventData = {
      x: evt.clientX - canvasRect.left,
      y: evt.clientY - canvasRect.top,
    };
    onClick(eventData);
  };

  const handleMouseMove = (evt: MouseEvent<HTMLCanvasElement>) => {
    let eventData: Point, canvasRect;
    canvasRect = canvasRef.current.getBoundingClientRect();
    eventData = {
      x: evt.clientX - canvasRect.left,
      y: evt.clientY - canvasRect.top,
    };
    onMouseMove(eventData);
  };

  const debouncedMouseMove = _debounce(handleMouseMove, 50);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={(e) => handleClick(e)}
      onMouseMove={(e) => {
        e.persist();
        debouncedMouseMove(e);
      }}
    />
  );
}

function drawEntities(ctx: CanvasRenderingContext2D, entities: Entity[]) {
  entities.forEach(entity => entity.draw(ctx));
}

function clearView(ctx: CanvasRenderingContext2D, canvasEl: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
}
