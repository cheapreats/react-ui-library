import React from 'react';
import { Meta, Story } from '@storybook/react';
import {Image} from '@styled-icons/fa-solid/Image';
import {TextLayout} from '@Layouts';
import styled from 'styled-components'
import { FileUpload,IFileUploadProps } from '../../index';
import { createStoryTitle } from '../../Constants';

const A=styled.a`
color:LightBlue;
text-decoration:none;
`

export default {
    title: createStoryTitle('FileUpload'),
    component: FileUpload,
    args: {
        subTitle:'Supports: JPG, JPEG2000, PNG',
        Image,
        Title:
    <TextLayout bold color='DarkBlue'>
        Drop your image here, or &nbsp;
        <A href='http://google.com'>browse</A>
    </TextLayout>,
        minHeight:100,
    }
} as Meta;

export const Basic: Story<IFileUploadProps> = (args) => <FileUpload {...args} />;


