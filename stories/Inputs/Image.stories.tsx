import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import {createStoryTitle} from "../Constants";
import { Image, ImageProps } from '../../src';

export default {
    title: createStoryTitle('Image'),
    component: Image,
} as Meta;

export const Basic: Story<ImageProps> = () => {
    const [src, setSrc] = useState('');
    
    function addImage(data) {
        setSrc(data);
    }

    return (
        <div>
            <Image onImageReturn={data => addImage(data)} />
            <img style={{ marginTop: '30px' }} src={src} alt='' />
        </div>
    )
};
