import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FileUploadV2, IFileUploadV2Props } from './FileUploadV2';
import {PanelCard} from '../Panel/Panel';
import {DropArea} from '../DropArea/DropArea';
 
export default {
    title: 'Components/FileUploadV2',
    component: FileUploadV2,
    args: {
        DropArea,
        Panel:PanelCard,
        processFile:(base64StringFile:string)=>{console.log(base64StringFile)}
    },
} as Meta;

export const Basic: Story<IFileUploadV2Props> = (args) => (
    <FileUploadV2 {...args} />
);

export const TestIsFailure = Basic.bind({});
TestIsFailure.args = {
    ...Basic.args,
    isTestIsFailure:true
};
