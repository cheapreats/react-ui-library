import React from 'react';
import { MiddleCanvas, MiddleCanvasProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';
import { TextFields } from '@styled-icons/material/TextFields';
import { ImageAlt } from '@styled-icons/boxicons-solid/ImageAlt';
import { Layout3 } from '@styled-icons/remix-fill/Layout3';
import { ListNumbered } from '@styled-icons/icomoon/ListNumbered';
import { Dollar } from '@styled-icons/boxicons-regular/Dollar';
import { Qrcode } from '@styled-icons/icomoon/Qrcode';
import { Settings } from '@styled-icons/ionicons-sharp/Settings';

export default {
    title: createStoryTitle('Middle Canvas'),
    component: MiddleCanvas,
    argTypes: { onDrag: { action: 'I have been dragged!' } },
    args: {
    }
} as Meta;

export const Basic: Story<MiddleCanvasProps> = (args) => (
    <MiddleCanvas {...args} />
);