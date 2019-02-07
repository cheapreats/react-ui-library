import React from 'react';
import { storiesOf } from '@storybook/react';
import { BasicSlider } from '../components/sliders/sliders';
import {PRIMARY_COLOUR} from "../components/variables";
import { Bluetooth } from 'styled-icons/feather';

const railStyle = {
    backgroundColor: PRIMARY_COLOUR
  };

const trackStyle = {
    backgroundColor: 'blue'
}

const handleStyle = {
    borderColor: 'blue',
    height: 28,
    width: 28,
    marginLeft: -14,
    marginTop: -9,
    backgroundColor: 'black',
}
storiesOf('BasicSlider', module)
    .add('Basic slider', () => (
        <BasicSlider railStyle={railStyle}/>
    ), {
        notes: `Basic Slider`
    })
    .add('Basic slider disabled', () => (
        <BasicSlider disabled/>
    ), {
        notes: `Basic Slider with handle fixed`
    })
    .add('Basic slider step with dots', () => (
        <BasicSlider dots step={20} defaultValue={100} railStyle={railStyle}/>
    ), {
        notes: `Basic Slider，step=20, dots`
    })
    .add('Basic slider blue trackstyle', () => (
        <BasicSlider trackStyle={trackStyle} />
    ), {
        notes: `Basic Slider，blue track`
    })
    .add('Basic slider custom handle', () => (
        <BasicSlider  handleStyle={handleStyle}/>
    ), {
        notes: `Basic Slider with custom handle`
    });