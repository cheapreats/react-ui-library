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
                    onChange={target => {
                        setState(target);
                    }}
                    values={state}
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
                    hasRail={boolean('hasRail', true)}
                    onChange={target => {
                        setState(target);
                    }}
                    values={state}
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
                    hasPopup={boolean('hasPopup', true)}
                    onChange={target => {
                        console.log(target);
                        setState(target);
                    }}
                    values={{ rightValue: 30 }}
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
                    hasTwoKnobs={boolean('twoinputs', true)}
                    hasRail={boolean('hasRail', true)}
                    hasPopup={boolean('hasPopup', true)}
                    min={100}
                    max={300}
                    step={50}
                    onChange={target => {
                        console.log(target);
                        setState(target);
                    }}
                    padding="50px"
                    marks={[
                        { key: 100, mark: '100' },
                        { key: 150, mark: '150' },
                        { key: 250, mark: '250' },
                        { key: 300, mark: '300' },
                        { key: 200, mark: '200' },
                    ]}
                ></Slider>
            ),
            '',
        ),
    );
