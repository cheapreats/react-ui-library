import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {PRIMARY_COLOUR} from "../variables";

const handleStyle = {
  borderColor: PRIMARY_COLOUR,
  backgroundColor: PRIMARY_COLOUR,
};
const trackStyle = {
  backgroundColor: PRIMARY_COLOUR
};
const dotStyle={
  backgroundColor: PRIMARY_COLOUR,
  borderColor: PRIMARY_COLOUR
}
const activeDotStyle ={
  backgroundColor: PRIMARY_COLOUR
}
const wrapperStyle ={
  margin: 50 
};


export const BasicSlider = ({
  disabled,
  dots,
  step,
  defaultValue,
  railStyle
}) => {
  return (
    <div style={wrapperStyle}>
      <Slider 
        disabled={disabled} 
        dots={dots} 
        step={step} 
        defaultValue={defaultValue} 
        railStyle={railStyle}
        trackStyle={trackStyle} 
        handleStyle={handleStyle} 
        dotStyle={dotStyle} 
        activeDotStyle={activeDotStyle}
      />
  </div>
  )
}
