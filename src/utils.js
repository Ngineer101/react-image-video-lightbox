export const settle = (val, target, range) => {
  const lowerRange = val > target - range && val < target;
  const upperRange = val < target + range && val > target;
  return lowerRange || upperRange ? target : val;
}

export const getPointFromTouch = (touch) => {
  return {
    x: touch.clientX,
    y: touch.clientY
  };
}

export const getDistanceBetweenPoints = (pointA, pointB) => {
  return Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2));
}

export const between = (min, max, value) => {
  return Math.min(max, Math.max(min, value));
}
