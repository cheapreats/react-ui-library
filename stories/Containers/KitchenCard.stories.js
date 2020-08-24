import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';
import { KitchenCard } from '../../src';
import {Button} from '../../src/Inputs/Button'
import styled from 'styled-components';

const sampleOrder = {
    _id: '5f15ff0d1689a01c4b9cc72f',
    status: 'preparing',
    items: [
        {
            name: 'Cool Sandwich',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'This is a very long Sandwich Name',
            _id: '5e8a23d1b0bd74723d927706',
        },
    ],
    customer: {
        name: 'Ralph Maamari',
    },
    order_type: 'EAT_IN',
};
const sampleOrderMany = {
    _id: '5f15ff0d1689a01c4b9cc72f',
    status: 'preparing',
    items: [
        {
            name: 'Cool Sandwich',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'This is a very long Sandwich Name',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'Cool Sandwich',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'This is a very long Sandwich Name',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'Cool Sandwich',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'This is a very long Sandwich Name',
            _id: '5e8a23d1b0bd74723d927706',
        },
    ],
    customer: {
        name: 'Ralph Maamari',
    },
    order_type: 'EAT_IN',
};

const StatusModifierComponent = <><Button loading={false} margin="0 6px 5px 0">Hello</Button><Button loading={false} margin="0 6px 0 0">Hello</Button></>


storiesOf('KitchenCard', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <KitchenCard
            cardWidth={230}
            cardMargin={10}
            cardHeight={400}
            modifiers={[
                array('Modifiers 1', ['Add Lettuce', 'Mayo']),
                array('Modifiers 2', ['No Ketchup', 'Add Bacon']),
            ]}
            isFullName={boolean('displayFullName', false)}
            TimeComponent={text('Time', '10:00')}
            orderType={sampleOrder.order_type}
            {...sampleOrder}
        />
    ))
    .add('Disable FullName', () => (
        <KitchenCard
            cardWidth={230}
            cardMargin={10}
            cardHeight={400}
            modifiers={[
                array('Modifiers 1', ['Add Lettuce', 'Mayo']),
                array('Modifiers 2', ['No Ketchup', 'Add Bacon']),
            ]}
            isFullName={boolean('displayFullName', true)}
            TimeComponent={text('Time', '10:00')}
            orderType={sampleOrder.order_type}
            {...sampleOrder}
        />
    ))
    .add('Many Items', () => (
        <KitchenCard
            cardWidth={230}
            cardMargin={10}
            cardHeight={400}
            modifiers={[
                ['Add Lettuce', 'Mayo'],
                ['No Ketchup', 'Add Bacon', 'Add Olives'],
                [],
                ['Add Lettuce'],
                [],
                ['No Ketchup'],
                [],
            ]}
            isFullName={boolean('displayFullName', true)}
            TimeComponent={text('Time', '10:00')}
            orderType={sampleOrder.order_type}
            {...sampleOrderMany}
        />
    ))
    .add('StatusModifier Component', () => (
        <KitchenCard
            cardWidth={230}
            cardMargin={10}
            cardHeight={400}
            modifiers={[
                ['Add Lettuce', 'Mayo'],
                ['No Ketchup', 'Add Bacon', 'Add Olives'],
                [],
                ['Add Lettuce'],
                [],
                ['No Ketchup'],
                [],
            ]}
            isFullName={boolean('displayFullName', true)}
            TimeComponent={text('Time', '10:00')}
            StatusModifierComponent={StatusModifierComponent}
            orderType={sampleOrder.order_type}
            {...sampleOrderMany}
        />
    ));
