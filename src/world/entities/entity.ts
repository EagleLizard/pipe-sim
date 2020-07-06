
import { ENTITY_ENUM } from './entity-enum';

export interface EntityBoundingRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export abstract class Entity {
  id: number | string;
  entityType: keyof typeof ENTITY_ENUM;
  constructor(id: number | string, entityType: keyof typeof ENTITY_ENUM) {
    this.id = id;
    this.entityType = entityType;
  }

  abstract get boundingRect(): EntityBoundingRect;

  abstract draw(ctx: CanvasRenderingContext2D): unknown;
}
