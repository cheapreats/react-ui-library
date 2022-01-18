import React from 'react';
import styled from 'styled-components';
import { CloudUploadAlt } from '@styled-icons/fa-solid/CloudUploadAlt';
import { MainInterface, Main } from '@Utils/BaseStyles';
import { flex } from '@Utils/Mixins';
import Dropzone, {
    useDropzone,
    DropEvent,
    FileRejection,
} from 'react-dropzone';

export interface IDropAreaProps
    extends MainInterface,
        React.HTMLAttributes<HTMLDivElement> {
    message?: string;
    buttonText?: string;
    onClick?: React.MouseEventHandler<HTMLElement> | undefined;
    onDragEnter?: React.DragEventHandler<HTMLElement> | undefined;
    onDragLeave?: React.DragEventHandler<HTMLElement> | undefined;
    onDropHandler?:
        | (<T extends File>(
              acceptedFiles: T[],
              fileRejections: FileRejection[],
              event: DropEvent,
          ) => void)
        | undefined;
    isDisabled?: boolean;
    width?: number;
}

export const DropArea: React.FC<IDropAreaProps> = ({
    message = 'Drag & Drop your files here',
    buttonText = 'Browse Files',
    onClick = () => null,
    onDragEnter = () => null,
    onDragLeave = () => null,
    onDropHandler = () => null,
    isDisabled = false,
    ...props
}): React.ReactElement => {
    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        onDragEnter,
        onDragLeave,
        onDrop: onDropHandler,
        disabled: isDisabled,
    });
    return (
        <Dropzone multiple>
            {() => (
                <RootDiv {...getRootProps()}>
                    <DropAreaBox isDragEnter={isDragActive} {...props}>
                        <Icon as={CloudUploadAlt} />
                        <MessageBox>{message}</MessageBox>
                        <OrBox>OR</OrBox>
                        <BrowseFiles>
                            {buttonText}
                            <input
                                {...getInputProps({
                                    onClick,
                                    disabled: isDisabled,
                                })}
                            />
                        </BrowseFiles>
                    </DropAreaBox>
                </RootDiv>
            )}
        </Dropzone>
    );
};

const RootDiv = styled.div`
    width: fit-content;
    pointer-events: none;
`;

const DropAreaBox = styled.div<
    MainInterface & { isDragEnter: boolean; width?: number }
>`
    width: fit-content;
    ${flex('column', 'center', 'center')}
    ${({ theme, isDragEnter, width, padding, ...props }): string => `
        ${width ? `min-width:${width}px;` : ''}
        border-radius:${theme.dimensions.radius};
        ${
    isDragEnter
        ? `
        background-color: ${theme.colors.input.success};
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
            border: 2px dashed ${theme.colors.occupancyStatusColors.Occupied};
`
}
${
    padding === undefined
        ? Main({ padding: theme.dimensions.padding.container, ...props })
        : Main({ padding, ...props })
}
`}
`;

const BrowseFiles = styled.div`
    ${({ theme }): string => `
        border-radius: ${theme.dimensions.radius};
        background-color: ${theme.colors.occupancyStatusColors.Occupied};
        padding: ${theme.dimensions.padding.default};
        color: ${theme.colors.background};
    `}
    overflow: hidden;
    position: relative;
    user-select: none;
    width: fit-content;
    font-weight: 700;
    pointer-events: initial;
    cursor: pointer;
`;

const OrBox = styled.div`
    margin: 10px;
    font-weight: 700;
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.occupancyStatusColors.Occupied};
`;

const MessageBox = styled.div`
    font-weight: 700;
    opacity: 0.7;
`;

const Icon = styled.svg`
    width: 60px;
    height: 60px;
    opacity: 0.6;
    color: ${({ theme }) => theme.colors.occupancyStatusColors.Occupied};
`;
