import React from 'react';
import styled from 'styled-components';
import { transition } from '@Utils/Mixins';
import { LabelLayout, LabelLayoutProps } from '@Layouts';

export interface SliderProps extends LabelLayoutProps {
    max?: number;
    min?: number;
    step?: number;
    disabled?: boolean;
    value?: number;
}

export const Slider: React.FunctionComponent<SliderProps> = ({
    ...props
}): React.ReactElement => (
    <LabelLayout {...props}>
        <SliderElement {...props} />
    </LabelLayout>
);

const SliderElement = styled.input<LabelLayoutProps>`
    ${transition(['background-color', 'opacity', 'box-shadow'])}
    font-size: 0.85rem;
    font-weight: bold;
    outline: none;
    border: none;


    // Disabled
    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 15px;
        height: 15px;
        border:1px solid black;
        ...
    }
`;

export default Slider;