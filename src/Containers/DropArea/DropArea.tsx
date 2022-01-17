import React from 'react';
import styled from 'styled-components';
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
    onClick?: React.MouseEventHandler<HTMLElement>|undefined;
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
    message = 'Drag & Drop your files here',
    onClick=()=>null,
    onDragEnter = () => null,
    onDragLeave = () => null,
    onDropHandler = () => null,
    isDragEnter = false,
    ...props
}): React.ReactElement => {
    const { getInputProps, getRootProps } = useDropzone({
        onDragEnter,
        onDragLeave,
        onDrop: onDropHandler,
    });
    return (
        <Dropzone multiple>
            {() => (
                <div
                    {...getRootProps({
                        onClick: (e: React.MouseEvent) => {
                            e.stopPropagation();
                        },
                    })}
                >
                    <DropAreaBox isDragEnter={isDragEnter} {...props}>
                        <MessageBox>{message}</MessageBox>
                        <OrBox>OR</OrBox>
                        <BrowseFiles>
                            browse files
                            <input
                                {...getInputProps({
                                    onClick,
                                    style: {
                                        display: 'initial',
                                        visibility: 'initial',
                                        width: '2000px',
                                        height: '2000px',
                                        backgroundColor: 'red',
                                        opacity: 0,
                                        zIndex: 99999999,
                                        cursor: 'pointer',
                                        top: -1000,
                                        left: -1000,
                                        position: 'absolute',
                                    },
                                })}
                            />
                        </BrowseFiles>
                    </DropAreaBox>
                </div>
            )}
        </Dropzone>
    );
};

const DropAreaBox = styled.div<MainInterface & { isDragEnter: boolean }>`
    width: fit-content;
    ${flex('column', 'center', 'center')}
    ${({ theme, isDragEnter, padding, ...props }): string => `
border-radius:${theme.dimensions.radius};
${
    isDragEnter
        ? `
        background-color:${theme.colors.input.success};
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
border:2px dashed ${theme.colors.border};
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
    border-radius:${theme.dimensions.radius};
    background-color:${theme.colors.occupancyStatusColors.Occupied};
    padding:${theme.dimensions.padding.default};
    color:${theme.colors.background};
    `}
    overflow: hidden;
    position: relative;
    user-select: none;
    width: fit-content;
    font-weight: 700;
`;

const OrBox = styled.div`
    margin: 10px;
    font-weight: 700;
`;

const MessageBox = styled.div`
    font-weight: 700;
`;
