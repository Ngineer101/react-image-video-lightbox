import { ICoordinate } from './interfaces/ICoordinate';

export const settle = (val: number, target: number, range: number): number => {
  const lowerRange = val > target - range && val < target;
  const upperRange = val < target + range && val > target;
  return lowerRange || upperRange ? target : val;
}

export const getPointFromTouch = (touch: { clientX: number, clientY: number }): ICoordinate => {
  return {
    x: touch.clientX,
    y: touch.clientY
  };
}

export const getDistanceBetweenPoints = (pointA: ICoordinate, pointB: ICoordinate): number => {
  return Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2));
}

export const between = (min: number, max: number, value: number): number => {
  return Math.min(max, Math.max(min, value));
}
