import React from 'react';
import { storiesOf } from '@storybook/react';
import { SlidingOutPanels } from '../../src';

const image = 'https://stripe.com/img/docs/billing/hosted-invoice-page.png';

storiesOf('Sliding Out Panel', module)
.add('with default', () => (
    <SlidingOutPanels imageLink={image} />
));
