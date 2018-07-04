import React from 'react';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const SETTLE_RANGE = 0.001;
const ADDITIONAL_LIMIT = 0.2;
const DOUBLE_TAP_THRESHOLD = 300;
const ANIMATION_SPEED = 0.08;
const RESET_ANIMATION_SPEED = 0.08;
const INITIAL_X = 0;
const INITIAL_Y = 0;
const INITIAL_SCALE = 1;

const settle = (val, target, range) => {
    const lowerRange = val > target - range && val < target;
    const upperRange = val < target + range && val > target;
    return lowerRange || upperRange ? target : val;
};

const getPointFromTouch = (touch) => {
    return {
        x: touch.clientX,
        y: touch.clientY
    };
};

const getDistanceBetweenPoints = (pointA, pointB) => (
    Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2))
);

const between = (min, max, value) => Math.min(max, Math.max(min, value));

class ReactMobileLightbox extends React.Component {

    constructor() {
        super(...arguments);

        this.state = {
            x: INITIAL_X,
            y: INITIAL_Y,
            scale: INITIAL_SCALE,
            width: this.props.width,
            height: this.props.height,
            index: this.props.startIndex,
            swiping: false
        };

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    zoomTo(scale) {
        const frame = () => {
            if (this.state.scale === scale) return null;

            const distance = scale - this.state.scale;
            const targetScale = this.state.scale + (ANIMATION_SPEED * distance);

            this.zoom(settle(targetScale, scale, SETTLE_RANGE));
            this.animation = requestAnimationFrame(frame);
        };

        this.animation = requestAnimationFrame(frame);
    }

    reset() {
        const frame = () => {
            if (this.state.scale === INITIAL_SCALE && this.state.x === INITIAL_X && this.state.y === INITIAL_Y) return null;

            const scaleDelta = INITIAL_SCALE - this.state.scale;
            const targetScale = settle(this.state.scale + (RESET_ANIMATION_SPEED * scaleDelta), INITIAL_SCALE, SETTLE_RANGE);

            const nextWidth = this.props.width * targetScale;
            const nextHeight = this.props.height * targetScale;

            this.setState({
                scale: targetScale,
                width: nextWidth,
                height: nextHeight,
                x: INITIAL_X,
                y: INITIAL_Y
            }, () => {
                this.animation = requestAnimationFrame(frame);
            });
        };

        this.animation = requestAnimationFrame(frame);
    }

    handleTouchStart(event) {
        this.animation && cancelAnimationFrame(this.animation);
        if (event.touches.length === 2) this.handlePinchStart(event);
        if (event.touches.length === 1) this.handleTapStart(event);
    }

    handleTouchMove(event) {
        if (event.touches.length === 2) this.handlePinchMove(event);
        if (event.touches.length === 1) this.handlePanMove(event);
    }

    handleTouchEnd(event) {
        if (event.touches.length > 0) return null;

        if (this.state.scale > MAX_SCALE) return this.zoomTo(MAX_SCALE);
        if (this.state.scale < MIN_SCALE) return this.zoomTo(MIN_SCALE);

        if (this.lastTouchEnd && this.lastTouchEnd + DOUBLE_TAP_THRESHOLD > event.timeStamp) {
            this.reset();
        }

        if (this.state.swiping && this.state.scale === 1) {
            this.handleSwipe(event);
        }

        this.lastTouchEnd = event.timeStamp;
    }

    handleSwipe(event) {
        if (event.changedTouches[0].clientX < this.swipeStartX) {
            this.swipeRight(event.target);
        }

        if (event.changedTouches[0].clientX > this.swipeStartX) {
            this.swipeLeft(event.target);
        }
    }

    swipeLeft(target) {
        var currentIndex = this.state.index;
        if (currentIndex > 0) {
            this.setState({
                index: currentIndex - 1,
                swiping: false,
                x: INITIAL_X
            });
        } else {
            this.reset();
        }
    }

    swipeRight(target) {
        var currentIndex = this.state.index;
        var imageCount = this.props.imageUrls.length;
        if (currentIndex < (imageCount - 1)) {
            target.style.transform = 'translate(-100% 0px)';
            this.setState({
                index: currentIndex + 1,
                swiping: false,
                x: INITIAL_X
            });
        } else {
            this.reset();
        }
    }

    handleTapStart(event) {
        var currentScale = this.state.scale;
        this.swipeStartX = event.touches[0].clientX;
        this.swipeStartY = event.touches[0].clientY;
        if (currentScale === 1) {
            this.setState({
                swiping: true
            });
        }
    }

    handlePanMove(event) {
        if (this.state.scale === 1) {
            this.setState({
                x: event.touches[0].clientX - this.swipeStartX
            });
        } else {
            event.preventDefault();
            this.setState({
                x: event.touches[0].clientX - this.swipeStartX,
                y: event.touches[0].clientY - this.swipeStartY
            });
        }
    }

    handlePinchStart(event) {
        const pointA = getPointFromTouch(event.touches[0]);
        const pointB = getPointFromTouch(event.touches[1]);
        this.lastDistance = getDistanceBetweenPoints(pointA, pointB);
    }

    handlePinchMove(event) {
        event.preventDefault();
        const pointA = getPointFromTouch(event.touches[0]);
        const pointB = getPointFromTouch(event.touches[1]);
        const distance = getDistanceBetweenPoints(pointA, pointB);
        const scale = between(MIN_SCALE - ADDITIONAL_LIMIT, MAX_SCALE + ADDITIONAL_LIMIT, this.state.scale * (distance / this.lastDistance));
        this.zoom(scale);
        this.lastDistance = distance;
    }

    zoom(scale) {
        const nextWidth = this.props.width * scale;
        const nextHeight = this.props.height * scale;

        this.setState({
            width: nextWidth,
            height: nextHeight,
            scale
        });
    }

    getIs() {
        let items = [];
        for (var i = 0; i < this.props.imageUrls.length; i++) {
            items.push(<img key={i}
                alt=""
                src={this.props.imageUrls[i]}
                style={{
                    pointerEvents: this.state.scale === 1 ? 'auto' : 'none',
                    transform: `translate(${this.state.x}px, ${this.state.y}px) scale(${this.state.scale})`,
                    transition: 'transform 0.5s ease-out',
                    backgroundImage: '/../loader_dark.gif'
                }} />);
        }

        return items;
    }

    render() {
        let i = this.getIs();
        return (
            <div
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
                style={{
                    overflow: 'hidden',
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.9)'
                }}
            >
                {
                    i[this.state.index]
                    /* <img alt=""
                    src={i[this.state.index]}
                    style={{
                        pointerEvents: this.state.scale === 1 ? 'auto' : 'none',
                        transform: `translate(${this.state.x}px, ${this.state.y}px) scale(${this.state.scale})`,
                        
                    }} /> */}
            </div>
        );
    }
}

export default ReactMobileLightbox;