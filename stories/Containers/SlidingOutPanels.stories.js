import React from 'react';
import { storiesOf } from '@storybook/react';
import { SlidingOutPanels } from '../../src';

storiesOf('Sliding Out Panel', module).add('with default', () => (
    <SlidingOutPanels images={images} />
));

const images = [
    {
        id: '1',
        alt: 'Display Image',
        imageLink:
            'https://stripe.com/img/docs/billing/hosted-invoice-page.png',
    },
    {
        id: '2',
        alt: 'Display Image',
        imageLink:
            'https://stripe.com/img/docs/billing/hosted-invoice-page.png',
    },
    {
        id: '3',
        alt: 'Display Image',
        imageLink:
            'https://stripe.com/img/docs/billing/hosted-invoice-page.png',
    },
    {
        id: '4',
        alt: 'Display Image',
        imageLink:
            'https://stripe.com/img/docs/billing/hosted-invoice-page.png',
    },
];
