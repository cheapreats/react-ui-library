import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { Image, ImageProps } from '../../index';

export default {
    title: createStoryTitle('Image'),
    component: Image,
    args: {
        accept: '',
        aspect: 0,
        onImageReturn: (image: any) => console.log(image),
    },
} as Meta;

export const Basic: Story<ImageProps> = (args) => <Image {...args} />;
