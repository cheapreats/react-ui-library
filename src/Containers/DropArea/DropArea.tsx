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
        background-color:#cce6ff;
        @keyframes border-dance {
            0% {
              background-position: left top, right bottom, left bottom, right   top;
            }
            100% {
              background-position: left 15px top, right 15px bottom , left bottom 15px , right   top 15px;
            }
          }
          background-image: linear-gradient(90deg, #3399ff 50%, transparent 50%), linear-gradient(90deg, #3399ff 50%, transparent 50%), linear-gradient(0deg, #3399ff 50%, transparent 50%), linear-gradient(0deg, #3399ff 50%, transparent 50%);
          background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
          background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
          background-position: left top, right bottom, left bottom, right   top;
          animation: border-dance .3s infinite linear;
`
        : `
border:2px dashed grey;
`
}

${Main({ ...props })}
`}
`;
