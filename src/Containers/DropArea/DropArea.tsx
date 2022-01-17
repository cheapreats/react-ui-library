import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { MainInterface, Main } from '@Utils/BaseStyles';
import Dropzone, {
    useDropzone,
    DropEvent,
    FileRejection,
} from 'react-dropzone';

export interface IDropAreaProps
    extends MainInterface,
        React.HTMLAttributes<HTMLDivElement> {
    message?: string;
    onDragEnter?: React.DragEventHandler<HTMLElement> | undefined;
    onDragLeave?: React.DragEventHandler<HTMLElement> | undefined;
    onDropHandler?:
        | (<T extends File>(
              acceptedFiles: T[],
              fileRejections: FileRejection[],
              event: DropEvent,
          ) => void)
        | undefined;
    isDragEnter?: boolean;
}

export const DropArea: React.FC<IDropAreaProps> = ({
    message = 'Drag and drop your files or click here to select',
    onDragEnter=()=>null,
    onDragLeave=()=>null,
    onDropHandler=()=>null,
    isDragEnter = false,
    padding,
    ...props
}): React.ReactElement => {
    const theme = useTheme();
    const defaultPadding = useMemo((): string | number => {
        if (padding === undefined) {
            return theme.dimensions.padding.container;
        }
        return padding;
    }, [padding, theme]);
    const { getInputProps, getRootProps } = useDropzone({
        onDragEnter,
        onDragLeave,
        onDrop: onDropHandler,
    });
    return (
        <Dropzone multiple>
            {() => (
                <div {...getRootProps()}>
                    <DropAreaBox
                        isDragEnter={isDragEnter}
                        padding={defaultPadding}
                        {...props}
                    >
                        {message}
                    </DropAreaBox>
                    <input {...getInputProps()} />
                </div>
            )}
        </Dropzone>
    );
};

const DropAreaBox = styled.div<MainInterface & { isDragEnter: boolean }>`
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
