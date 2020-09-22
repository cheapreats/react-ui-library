import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Navigation, NavigationFootnote } from '../../src';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('Navigation'), module)
    .addDecorator(withKnobs)
    .add('with default', () => <Navigation />)
    .add('with footer', () => (
        <Navigation
            footer={<NavigationFootnote url="" text="To Other Place" />}
        />
    ));
