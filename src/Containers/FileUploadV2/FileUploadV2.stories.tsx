import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FileUploadV2, IFileUploadV2Props } from '../../index';
import DropArea from './DropArea';


export default {
    title: 'Components/FileUploadV2',
    component: FileUploadV2,
    args: {
        DropArea,
    },
} as Meta;

export const Basic: Story<IFileUploadV2Props> = (args) => (
    <FileUploadV2 {...args} />
);

export const Basic2 = Basic.bind({});
Basic2.args = {
    ...Basic.args,
};
