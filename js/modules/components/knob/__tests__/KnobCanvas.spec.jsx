import React from 'react';
import { shallow } from 'enzyme';
import KnobCanvas from './../KnobCanvas';

const props = {
    onChange: () => {},
    value: 0,
    min: 0,
    max: 100,
    size: 70,
    thickness: 14,
    fgColor: '',
    bgColor: '',
    angle: 4.4,
    startAngle: 2.5,
    endAngle: 6.9,
    offsetAngle: -2.2
};

describe('KnobCanvas component', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(<KnobCanvas {...props} />, { disableLifecycleMethods: true });

        expect(wrapper).toMatchSnapshot();
    });

    it('should convert mouse position to value', () => {
        const wrapper = shallow(<KnobCanvas {...props} />, { disableLifecycleMethods: true });
        const component = wrapper.instance();

        component.container = {
            offsetLeft: 100,
            offsetTop: 100
        };

        expect(component.xyToVal(20, 20)).toEqual(32);
    });
});
