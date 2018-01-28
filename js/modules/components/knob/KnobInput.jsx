import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Knob.css';

export default class KnobInput extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    };

    constructor() {
        super();

        this.onInputChange = this.onInputChange.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
    }

    onInputChange(event) {
        const { min, max, onChange } = this.props;

        let { value } = event.target;

        if (value === '') {
            value = '';
        } else {
            value = Math.round(Math.max(Math.min(value, max), min));
        }

        onChange(value);
    }

    onInputBlur(event) {
        const { min, onChange } = this.props;

        if (event.target.value === '') {
            onChange(min);
        }
    }

    render() {
        const { min, max, value } = this.props;

        return (
            <input
                className={styles.input}
                type="number"
                value={value}
                min={min}
                max={max}
                onChange={this.onInputChange}
                onBlur={this.onInputBlur}
            />
        );
    }
}
