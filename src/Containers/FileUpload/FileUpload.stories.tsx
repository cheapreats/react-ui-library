import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FileUpload, IFileUploadProps } from '../../index';

export default {
    title: 'Components/FileUpload',
    component: FileUpload,
    args: {
        doWithBase64StringFile: (base64StringFile: string) => {
            console.log(base64StringFile);
        },
    },
} as Meta;

export const Basic: Story<IFileUploadProps> = (args) => (
    <FileUpload {...args} />
);

export const LongMessageDuration = Basic.bind({});
LongMessageDuration.args = {
    ...Basic.args,
    messageDuration: 10000,
};

export const BigMinHeight = Basic.bind({});
BigMinHeight.args = {
    ...Basic.args,
    minHeight: 350,
};

export const BigMinWidth = Basic.bind({});
BigMinWidth.args = {
    ...Basic.args,
    minWidth: 600,
};

export const TestIsFailureTrue = Basic.bind({});
TestIsFailureTrue.args = {
    ...Basic.args,
    isTestIsFailure: true,
};

export const IsDisabled = Basic.bind({});
IsDisabled.args = {
    ...Basic.args,
    isDisabled: true,
};
