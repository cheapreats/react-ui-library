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

const processFiles=(event:React.DragEvent<HTMLDivElement>)=>{
    event.preventDefault();
    if(event.dataTransfer.items){
        for (let i = 0; i < event.dataTransfer.items.length; i+=1) {
            // If dropped items aren't files, reject them
            if (event.dataTransfer.items[i].kind === 'file') {
                const file = event.dataTransfer.items[i].getAsFile();
                if(file){
                // console.log(`... file[${i}].name = ${file.name}`);
                }
            }
        }
    }
}

const preventDefault=(event:Event | React.DragEvent<HTMLDivElement>)=>{
    event.preventDefault();
    event.stopPropagation();
}

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
        onDrop:processFiles,
        onDragOver:preventDefault,
    }
} as Meta;

export const Basic: Story<IFileUploadProps> = (args) => <FileUpload {...args} />;


