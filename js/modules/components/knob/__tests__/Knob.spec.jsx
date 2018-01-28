import React from 'react';
import { shallow } from 'enzyme';
import Knob from './../Knob';

describe('Knob component', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(<Knob onChange={() => {}} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should convert degrees to radians', () => {
        expect(Knob.degreesToRadians(180)).toBeCloseTo(3.14, 2);
    });

    it('should calculate start angle', () => {
        expect(Knob.calculateStartAngle(20)).toBeCloseTo(5.1, 1);
    });

    it('should calculate end angle', () => {
        expect(Knob.calculateEndAngle(180, 20)).toBeCloseTo(8.2, 1);
    });
});
