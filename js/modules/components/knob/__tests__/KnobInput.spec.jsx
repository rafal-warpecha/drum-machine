import React from 'react';
import { shallow } from 'enzyme';
import KnobInput from './../KnobInput';

const props = {
    onChange: () => {},
    value: 0,
    min: 0,
    max: 100
};

describe('KnobInput component', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(<KnobInput {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should set value', () => {
        const onChangeSpy = spyOn(props, 'onChange');
        const wrapper = shallow(<KnobInput {...props} />);

        wrapper.simulate('change', { target: { value: '50' } });

        expect(onChangeSpy).toHaveBeenCalledWith(50);
    });

    it('should set empty string when user delete input value', () => {
        const onChangeSpy = spyOn(props, 'onChange');
        const wrapper = shallow(<KnobInput {...props} />);

        wrapper.simulate('change', { target: { value: '' } });

        expect(onChangeSpy).toHaveBeenCalledWith('');
    });

    it('should set min value when user delete input value', () => {
        const onChangeSpy = spyOn(props, 'onChange');
        const wrapper = shallow(<KnobInput {...props} />);

        wrapper.simulate('blur', { target: { value: '' } });

        expect(onChangeSpy).toHaveBeenCalledWith(props.min);
    });
});
