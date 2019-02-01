import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';


const Div = styled.div`
    
    padding-top: 20px;
    padding-bottom: 10px;
    margin: 0;
   
`;

export const BasicSlider = () => {
  return (
    <Div>
    <Slider/>
  </Div>
  )
}

