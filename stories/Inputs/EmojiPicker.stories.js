import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { EmojiPicker, Paragraph } from '../../src';
import { mockElement } from '../Tools';

storiesOf('EmojiPicker', module)
    .addDecorator(withKnobs)
    .add(
        'with default',
        mockElement(([emoji, setEmoji]) => {
            return (
                <>
                    <EmojiPicker
                        text={emoji || undefined}
                        onChange={_ => setEmoji(_)}
                    />
                </>
            );
        }, ''),
    );
