import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { FileUpload, IFileUploadProps } from '../../index';


export default {
    title: 'Components/File Upload/FileUpload',
    component: FileUpload,
    args: {
        subTitle: 'Supports: JPG, JPEG2000, PNG',
        title: 'Drop your image here, or click to browse',
        minHeight: 100,
        setBase64: (base64StringFile: string) => {
            console.log(base64StringFile);
        },
        successMessage: 'Completed',
        failureMessage: 'Something went wrong',
        disabled: false,
    },
} as Meta;

const useStateProps = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    return {
        isFailure,
        isSuccess,
        isUploading,
        setIsFailure,
        setIsSuccess,
        setIsUploading,
    };
};

export const Basic: Story<IFileUploadProps> = (args) => (
    <FileUpload {...args} {...useStateProps()} />
);

export const VeryLongMessageDuration: Story<IFileUploadProps> = (args) => (
    <FileUpload {...args} messageDuration={20000} {...useStateProps()} />
);

export const VeryShortMessageDuration: Story<IFileUploadProps> = (args) => (
    <FileUpload {...args} messageDuration={200} {...useStateProps()} />
);
