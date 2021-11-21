import React from 'react';
export interface IFileUploadProps {
    title: string;
    subTitle: string;
    minHeight: number;
    minWidth?: number;
    setBase64: (base64StringFile: string) => void;
    isUploading: boolean;
    isSuccess: boolean;
    isFailure: boolean;
    successMessage: string;
    failureMessage: string;
    disabled: boolean;
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFailure: React.Dispatch<React.SetStateAction<boolean>>;
    messageDuration?: number;
}
export declare const FileUpload: React.FC<IFileUploadProps>;
