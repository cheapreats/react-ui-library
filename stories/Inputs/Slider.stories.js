import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { Slider,SmallText } from '../../src';

storiesOf('Slider', module)
    .addDecorator(withKnobs)
    .add('basic', () => (
        <Slider
            min={1}
            max={100}
            value={20}
        ></Slider>
    ))
    .add('with rail', () => (
        <Slider
            min={1}
            max={100}
            value={20}
            rail={boolean('rail', true)}
        ></Slider>
    ))
    .add('disabled', () => (
        <Slider
            disabled={boolean('disabled', true)}
        ></Slider>
    )) 
    .add('with popup', () => (
        <Slider
            min={20}
            max={50}
            padding="50px"
            value={25}
            popup={boolean('popup', true)}
        ></Slider>
    ))   
    .add('with two input', () => (
        <Slider
            min={0}
            max={200}
            step={10}
            padding="50px"
            twoinputs={boolean('twoinputs', true)}
            rail={boolean('rail', true)}
            value={85}
            valuestart={80}
            popup={boolean('popup', true)}
            marks={[{key:0,mark:'min'},{key:200,mark:'max'},{key:100,mark:'100'}]}
        >
        </Slider>
    ))   
    ;
