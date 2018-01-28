import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KnobCanvas from './KnobCanvas';
import KnobInput from './KnobInput';
import styles from './Knob.css';

const { PI } = Math;

export default class Knob extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        min: PropTypes.number,
        max: PropTypes.number,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        size: PropTypes.number,
        thickness: PropTypes.number,
        angle: PropTypes.number,
        offsetAngle: PropTypes.number,
        fgColor: PropTypes.string,
        bgColor: PropTypes.string
    };

    static defaultProps = {
        min: 0,
        max: 100,
        value: 0,
        size: 70,
        thickness: 14,
        angle: 250,
        offsetAngle: -125,
        fgColor: '#ff0000',
        bgColor: '#aaaaaa'
    };

    static degreesToRadians(value) {
        return (value * PI) / 180;
    }

    static calculateStartAngle(offset) {
        return (1.5 * PI) + Knob.degreesToRadians(offset);
    }

    static calculateEndAngle(angle, offset) {
        return (1.5 * PI) + Knob.degreesToRadians(angle) + Knob.degreesToRadians(offset);
    }

    render() {
        const {
            onChange,
            value,
            min,
            max,
            size,
            thickness,
            angle,
            offsetAngle,
            fgColor,
            bgColor
        } = this.props;

        const sizeStyles = {
            width: `${size}px`,
            height: `${size}px`
        };

        return (
            <div className={styles.container} style={sizeStyles}>
                <KnobCanvas
                    onChange={onChange}
                    value={value}
                    min={min}
                    max={max}
                    size={size}
                    thickness={thickness}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    angle={Knob.degreesToRadians(angle)}
                    startAngle={Knob.calculateStartAngle(offsetAngle)}
                    endAngle={Knob.calculateEndAngle(angle, offsetAngle)}
                    offsetAngle={Knob.degreesToRadians(offsetAngle)}
                />
                <KnobInput
                    onChange={onChange}
                    value={value}
                    min={min}
                    max={max}
                />
            </div>
        );
    }
}
