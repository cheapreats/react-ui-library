import React,{useState} from 'react';
import { Meta, Story } from '@storybook/react';
import { FileUpload, IFileUploadProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('FileUpload'),
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

export const Basic: Story<IFileUploadProps> = (args) => {
    const [isUploading,setIsUploading]=useState(false)
    const [isSuccess,setIsSuccess]=useState(false)
    const [isFailure,setIsFailure]=useState(false)

    const componentProps={
        isUploading,isSuccess,isFailure,setIsUploading,setIsSuccess,setIsFailure
    }

    return (
        <FileUpload {...args} {...componentProps} />
    )
};
