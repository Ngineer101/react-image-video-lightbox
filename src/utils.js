module.exports = {

    settle: (val, target, range) => {
        const lowerRange = val > target - range && val < target;
        const upperRange = val < target + range && val > target;
        return lowerRange || upperRange ? target : val;
    },

    getPointFromTouch: (touch) => {
        return {
            x: touch.clientX,
            y: touch.clientY
        };
    },

    getDistanceBetweenPoints: (pointA, pointB) => (Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2))),

    between: (min, max, value) => Math.min(max, Math.max(min, value))
    
};
