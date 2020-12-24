import React from 'react';
import { Meta, Story } from '@storybook/react';
import {Image} from '@styled-icons/fa-solid/Image';
import { FileUpload,IFileUploadProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('FileUpload'),
    component: FileUpload,
    args: {
        subTitle:'Supports: JPG, JPEG2000, PNG',
        Image,
        title:'Drop your image here, or click to browse',
        minHeight:100,
        setBase64:(base64StringFile:string)=>{
            console.log(base64StringFile)
        },
        isUploading:false
    }
} as Meta;

export const Basic: Story<IFileUploadProps> = (args) => <FileUpload {...args} />;


