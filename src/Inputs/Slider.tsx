import React from 'react';
import styled from 'styled-components';
import { LabelLayout, LabelLayoutProps } from '@Layouts';

export interface SliderProps extends LabelLayoutProps {
    max?: number;
    min?: number;
    step?: number;
    disabled?: boolean;
    value?: number;
    trackColor?: string;
    buttonColor?: string;
}

export const Slider: React.FunctionComponent<SliderProps> = ({
    ...props
}): React.ReactElement => (
    <LabelLayout {...props}>
        <SliderElement {...props} type="range"/>
    </LabelLayout>
);

const SliderElement = styled.input<SliderProps>`
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
    // Disabled
    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
    &:focus {
      outline: none;
    }
    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 6px;
      cursor: pointer;
      animate: 0.2s;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: #3071a9;
      border-radius: 10px;
      border: 0.2px solid ${props => props.trackColor || '#010101'};
    }
    &::-webkit-slider-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1px solid #000000;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: ${props => props.buttonColor || '#ffffff'};
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -5px;
    }
    &:focus::-webkit-slider-runnable-track {
      background: #367ebd;
    }
    &::-moz-range-track {
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      animate: 0.2s;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: #3071a9;
      border-radius: 1.3px;
      border: 0.2px solid #010101;
    }
    &::-moz-range-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1px solid #000000;
      height: 36px;
      width: 16px;
      border-radius: 50%;
      background: #ffffff;
      cursor: pointer;
    }
`;

export default Slider;