import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Slider } from '../../src';
import { mockElement } from '../Tools';

storiesOf('Slider', module)
    .addDecorator(withKnobs)
    .add(
        'basic',
        mockElement(
            ([state, setState]) => (
                <Slider
                    min={1}
                    max={100}
                    value={20}
                    onChange={target => {
                        setState(target);
                    }}
                    result={state}
                ></Slider>
            ),
            '',
        ),
    )
    .add(
        'with rail',
        mockElement(
            ([state, setState]) => (
                <Slider
                    min={1}
                    max={100}
                    valuevalueFinish={20}
                    hasRail={boolean('hasRail', true)}
                    onChange={target => {
                        setState(target);
                    }}
                    result={state}
                ></Slider>
            ),
            '',
        ),
    )
    .add('disabled', () => (
        <Slider disabled={boolean('disabled', true)}></Slider>
    ))
    .add(
        'with popup',
        mockElement(
            ([state, setState]) => (
                <Slider
                    min={20}
                    max={50}
                    padding="50px"
                    valueFinish={25}
                    hasPopup={boolean('hasPopup', true)}
                    onChange={target => {
                        setState(target);
                    }}
                    result={state}
                ></Slider>
            ),
            '',
        ),
    )
    .add(
        'with two input',
        mockElement(
            ([state, setState]) => (
                <Slider
                    min={100}
                    max={300}
                    step={50}
                    padding="50px"
                    hasTwoInputs={boolean('twoinputs', true)}
                    hasRail={boolean('hasRail', true)}
                    valueFinish={200}
                    valueStart={100}
                    hasPopup={boolean('hasPopup', true)}
                    marks={[
                        { key: 100, mark: '100' },
                        { key: 150, mark: '150' },
                        { key: 250, mark: '250' },
                        { key: 300, mark: '300' },
                        { key: 200, mark: '200' },
                    ]}
                    onChange={target => {
                        setState(target);
                    }}
                    result={state}
                ></Slider>
            ),
            '',
        ),
    );
