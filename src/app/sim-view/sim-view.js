
import React, { useRef, useState, useEffect } from 'react';

export function SimView(props) {
  const canvasRef = useRef(null);
  const [ width, setWidth ] = useState(600);
  const [ height, setHeight ] = useState(600 / (4 / 3));
  const [ context, setContext ] = useState(null);

  const onClick = props.onClick || (() => {});
  const onMouseMove = props.onMouseMove || (() => {});

  useEffect(() => {
    setContext(canvasRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    if(canvasRef.current !== null && context !== null) {
      clearView(context, canvasRef.current);
      drawEntities(context, props.entities);
    }
  }, [ props.entities ]);

  const handleClick = (evt) => {
    let eventData, canvasRect;
    canvasRect = canvasRef.current.getBoundingClientRect();
    eventData = {
      x: evt.clientX - canvasRect.left,
      y: evt.clientY - canvasRect.top,
    };
    onClick(eventData);
  };

  const handleMouseMove = (evt) => {
    let eventData, canvasRect;
    canvasRect = canvasRef.current.getBoundingClientRect();
    eventData = {
      x: evt.clientX - canvasRect.left,
      y: evt.clientY - canvasRect.top,
    };
    onMouseMove(eventData);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={(e) => handleClick(e)}
      onMouseMove={(e) => handleMouseMove(e)}
    />
  );
}

function drawEntities(ctx, entities) {
  entities.forEach(entity => entity.draw(ctx));
}

function clearView(ctx, canvasEl) {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
}
