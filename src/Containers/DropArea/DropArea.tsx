import React from 'react';
import styled from 'styled-components';
import { MainInterface, Main } from '@Utils/BaseStyles';

export interface IDropAreaProps
    extends MainInterface,
        React.HTMLAttributes<HTMLDivElement> {
    message?: string;
    isDragEnter?: boolean;
    onClick?: () => void;
}

export const DropArea: React.FC<IDropAreaProps> = ({
    message = 'Drag and drop your files or click here to select',
    isDragEnter = false,
    padding = '10px',
    onClick = () => null,
    ...props
}): React.ReactElement => (
    <DropAreaBox
        isDragEnter={isDragEnter}
        padding={padding}
        onClick={onClick}
        {...props}
    >
        {message}
    </DropAreaBox>
);

const DropAreaBox = styled.div<
    Pick<IDropAreaProps, 'isDragEnter' | 'padding' | 'margin'>
>`
    width: fit-content;
    cursor: pointer;
    ${({ theme, isDragEnter, ...props }): string => `
border-radius:${theme.dimensions.radius};
${
    isDragEnter
        ? `
`
        : `
border:2px dashed grey;
`
}

${Main({ ...props })}
`}
`;
