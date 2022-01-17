import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { DropArea, IDropAreaProps } from './DropArea';

export default {
    title: 'Components/DropArea',
    component: DropArea,
    args: {},
} as Meta;

export const Basic: Story<IDropAreaProps> = (args) => {
    const [isDragEnter, setIsDragEnter] = useState(false);
    const onDragEnter = () => {
        setIsDragEnter(true);
    };
    const onDragLeave = () => {
        setIsDragEnter(false);
    };
    const onDrop = (acceptedFiles: File[]): void => {
        console.log(acceptedFiles);
        setIsDragEnter(false);
    };
    return (
        <DropArea
            {...args}
            isDragEnter={isDragEnter}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDropHandler={onDrop}
        />
    );
};
