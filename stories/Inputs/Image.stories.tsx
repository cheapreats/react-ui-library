import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import {createStoryTitle} from "../Constants";
import { Image, ImageProps } from '../../src';

export default {
    title: createStoryTitle('Image'),
    component: Image,
    argTypes: { onImageReturn: { action: 'Image uploaded' } },
    args: {
        accept: '',
        aspect: 0,
    },
} as Meta;

export const Basic: Story<ImageProps> = (args) => (
    <Image {...args}></Image>
)
