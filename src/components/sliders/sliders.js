import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';



const wrapperStyle ={
  margin: 50 
};


export const BasicSlider = ({disabled,dots,step,defaultValue,railStyle,trackStyle,handleStyle}) => {
  
  
  return (
    <div style={wrapperStyle}>
    <Slider disabled={disabled} dots={dots} step={step} defaultValue={defaultValue} railStyle={railStyle}
    trackStyle={trackStyle} handleStyle={handleStyle}/>
  </div>
  )
}
