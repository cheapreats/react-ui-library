import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Image, ImageProps } from '../../index';

export default {
    title: 'Components/File Upload/Image',
    component: Image,
    argTypes: { onImageReturn: { action: 'Image Uploaded' } },
    args: {
        accept: '',
        aspect: 0,
    },
} as Meta;

export const Basic: Story<ImageProps> = (args) => <Image {...args} />;
