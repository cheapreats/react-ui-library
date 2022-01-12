import React from 'react';
import styled from 'styled-components';
import {IDropAreaProps} from './FileUploadV2';

const DropArea: React.FC<IDropAreaProps> = ({
    isDragEnter,
    ...props
}) => (
    <DropAreaContainer isDragEnter={isDragEnter} {...props}>
        Drag and drop your files here or click to select
    </DropAreaContainer>
);

export default DropArea

const DropAreaContainer = styled.div<IDropAreaProps>`
    border: 2px dashed grey;
    border-radius: 10px;
    padding: 10px;
    ${({ isDragEnter }): string => `
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
        : ''
}
    `}
`;