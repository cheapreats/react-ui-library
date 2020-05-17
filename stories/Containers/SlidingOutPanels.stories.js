import React from 'react';
import { storiesOf } from '@storybook/react';
import { SlidingOutPanels } from '../../src';

storiesOf('Sliding Out Panel', module).add('with default', () => (
    <SlidingOutPanels images={images} />
));

const images = [
    {
        key: 1,
        alt: 'Display Image',
        imageLink:
            'https://stripe.com/img/docs/billing/hosted-invoice-page.png',
    },
    {
        key: 2,
        alt: 'Display Image',
        imageLink:
            'https://stripe.com/img/docs/billing/hosted-invoice-page.png',
    },
    {
        key: 3,
        alt: 'Display Image',
        imageLink:
            'https://stripe.com/img/docs/billing/hosted-invoice-page.png',
    },
    {
        key: 4,
        alt: 'Display Image',
        imageLink:
            'https://stripe.com/img/docs/billing/hosted-invoice-page.png',
    },
];
