import React from 'react';
import styled from 'styled-components';
import {Main} from '@Utils/BaseStyles';
import {IDropAreaProps} from '../FileUploadV2/FileUploadV2';

const MESSAGE='Drag and drop your files here or click to select';

export {IDropAreaProps};

export const DropArea: React.FC<IDropAreaProps> = ({
    isDragEnter=false,
    message=MESSAGE,
    ...props
}) => (
    <DropAreaContainer isDragEnter={isDragEnter} {...props}>
        {message}
    </DropAreaContainer>
);

const DropAreaContainer = styled.div<IDropAreaProps>`
    border-radius: 10px;
    width:fit-content;
    ${({ isDragEnter,...props }): string => `
    ${Main({...props})}
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
        : 'border: 2px dashed grey;'
}
    `}
`;