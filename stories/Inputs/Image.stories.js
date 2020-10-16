import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Image } from '../../src';
import { createStoryTitle } from '../Constants';

storiesOf(createStoryTitle('Image'), module)
    .addDecorator(withKnobs)
    .add('with default', () => {
        const [src, setSrc] = useState('');
        const addImage = (event) => {
            setSrc(event);
        };
        return (
            <div>
                <Image onImageReturn={(data) => addImage(data)} />
                <img style={{ marginTop: '30px' }} src={src}></img>
            </div>
        );
    });
