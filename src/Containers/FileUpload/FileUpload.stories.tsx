import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FileUpload,IFileUploadProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('FileUpload'),
    component: FileUpload,
    args: {
        subTitle:'Supports: JPG, JPEG2000, PNG',
        title:'Drop your image here, or click to browse',
        minHeight:100,
        setBase64:(base64StringFile:string)=>{
            console.log(base64StringFile)
        },
        isUploading:false,
        isSuccess:false,
        successMessage:'Completed',
        failureMessage:'Something went wrong'
    }
} as Meta;

export const Basic: Story<IFileUploadProps> = (args) => <FileUpload {...args} />;

// export const IsSuccessDefined= Basic.bind({});

// IsSuccessDefined.args={
//     ...IsSuccessDefined.args,
//     isSuccess:false
// }


