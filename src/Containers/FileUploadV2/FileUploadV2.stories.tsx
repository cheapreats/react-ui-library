import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FileUploadV2, IFileUploadV2Props } from './FileUploadV2';

export default {
    title: 'Components/File Upload/FileUploadV2',
    component: FileUploadV2,
    args: {
        // onFile:(base64StringFile:string)=>{console.log(base64StringFile)},
        dropAreaProps: {
            width: 400,
        },
    },
} as Meta;

export const Basic: Story<IFileUploadV2Props> = (args) => (
    <FileUploadV2 {...args} />
);

export const PanelsAreNotSequentiallyAdded = Basic.bind({});
PanelsAreNotSequentiallyAdded.args = {
    ...Basic.args,
    isSequentially: false,
};

export const LongDelay = Basic.bind({});
LongDelay.args = {
    ...Basic.args,
    delay: 100,
};

export const TestIsFailure = Basic.bind({});
TestIsFailure.args = {
    ...Basic.args,
    isTestIsFailure: true,
};
