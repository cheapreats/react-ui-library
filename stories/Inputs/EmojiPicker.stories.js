import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { EmojiPicker } from '../../src';

storiesOf('EmojiPicker', module)
    .addDecorator(withKnobs)
    .add('with default', () => {
        return (
            <div>
                <EmojiPicker />
            </div>
        );
    });
