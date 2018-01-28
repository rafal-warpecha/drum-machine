import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { PI } = Math;

export default class KnobCanvas extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        thickness: PropTypes.number.isRequired,
        fgColor: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
        angle: PropTypes.number.isRequired,
        startAngle: PropTypes.number.isRequired,
        endAngle: PropTypes.number.isRequired,
        offsetAngle: PropTypes.number.isRequired
    };

    constructor() {
        super();

        this.container = null;
        this.ctx = null;

        this.onClick = this.onClick.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    componentDidMount() {
        this.setContextScale();
        this.drawTrack();
        this.drawValue();
    }

    componentDidUpdate() {
        this.clear();
        this.drawTrack();
        this.drawValue();
    }

    onClick(event) {
        this.onChange(event);
    }

    onMouseMove(event) {
        this.onChange(event);
    }

    onMouseDown(event) {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);

        event.preventDefault();
        event.stopPropagation();
    }

    onMouseUp() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    onChange(event) {
        const { onChange } = this.props;
        const { pageX, pageY } = event;

        onChange(this.xyToVal(pageX, pageY));
    }

    setContext(canvas) {
        if (canvas) {
            this.container = canvas.parentNode;

            this.ctx = canvas.getContext('2d');
        }
    }

    setContextScale() {
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    xyToVal(x, y) {
        const {
            min,
            max,
            size,
            angle,
            offsetAngle
        } = this.props;

        const { offsetLeft, offsetTop } = this.container;

        let angleTo = Math.atan2(
            x - (offsetLeft + (size / 2)),
            -(y - offsetTop - (size / 2))
        ) - offsetAngle;

        if (angle !== (PI * 2) && (angleTo < 0) && (angleTo > -0.5)) {
            angleTo = 0;
        } else if (angleTo < 0) {
            angleTo += (PI * 2);
        }

        let value = ((angleTo * (max - min)) / angle) + min;

        value = Math.max(Math.min(value, max), min);

        return Math.round(value);
    }

    clear() {
        const { size } = this.props;

        this.ctx.clearRect(0, 0, size, size);
    }

    drawTrack() {
        const {
            size,
            thickness,
            bgColor,
            startAngle,
            endAngle
        } = this.props;

        this.ctx.lineWidth = thickness;

        this.ctx.beginPath();

        this.ctx.strokeStyle = bgColor;
        this.ctx.arc(size / 2, size / 2, (size - thickness) / 2, endAngle, startAngle, true);

        this.ctx.stroke();
    }

    drawValue() {
        const {
            min,
            max,
            value,
            size,
            thickness,
            fgColor,
            angle,
            startAngle
        } = this.props;

        const valueAngle = ((value - min) * angle) / (max - min);

        this.ctx.lineWidth = thickness;

        this.ctx.beginPath();

        this.ctx.strokeStyle = fgColor;
        this.ctx.arc(size / 2, size / 2, (size - thickness) / 2, startAngle, startAngle + valueAngle);

        this.ctx.stroke();
    }

    render() {
        const { size } = this.props;

        const sizeStyles = {
            width: `${size}px`,
            height: `${size}px`
        };

        return (
            <canvas
                width={size * window.devicePixelRatio}
                height={size * window.devicePixelRatio}
                style={sizeStyles}
                ref={canvas => this.setContext(canvas)}
                onClick={this.onClick}
                onMouseDown={this.onMouseDown}
            />
        );
    }
}
