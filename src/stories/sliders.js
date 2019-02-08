import React from 'react';
import { storiesOf } from '@storybook/react';
import { BasicSlider } from '../components/sliders/sliders';
import {PRIMARY_COLOUR} from "../components/variables";

const railStyle = {
    backgroundColor: PRIMARY_COLOUR
  };

storiesOf('BasicSlider', module)
    .add('Basic slider', () => (
        <BasicSlider railStyle={railStyle} />
    ), {
        notes: `Basic Slider`
    })
    .add('Basic slider disabled', () => (
        <BasicSlider disabled railStyle={railStyle}/>
    ), {
        notes: `Basic Slider with handle fixed`
    })
    .add('Basic slider step with dots', () => (
        <BasicSlider dots step={20} defaultValue={100} railStyle={railStyle} />
    ), {
        notes: `Basic Slider，step=20, dots`
    })
    .add('Basic slider red track', () => (
        <BasicSlider />
    ), {
        notes: `Basic Slider，red track`
    });