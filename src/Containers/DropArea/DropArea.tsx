import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { CloudUploadAlt } from '@styled-icons/fa-solid/CloudUploadAlt';
import { MainInterface, Main } from '@Utils/BaseStyles';
import { flex } from '@Utils/Mixins';
import Dropzone, {
    useDropzone,
    DropEvent,
    FileRejection,DropzoneProps,DropzoneRef
} from 'react-dropzone';
import Lottie from 'react-lottie';
import { animationData } from './animationData';

const ICON_OPACITY = 0.7;
const OPACITY_WHEN_DISABLED = 0.4;
const ICON_HEIGHT = 60;

/**
 * options for the lottie animation that occurs instead of
 * the icon when dragging over the dropArea component
 */
const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

type DropzoneType=DropzoneProps & React.RefAttributes<DropzoneRef>

export interface IDropAreaProps
    extends DropzoneType {
    message?: string;
    buttonText?: string;
    onClickHandler?: (this: GlobalEventHandlers, ev: MouseEvent) => any; // React.MouseEventHandler<HTMLElement> | undefined;
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
    /** minimum width for the drop area */
    width?: number;
    /** props for the drop area container */
    dropAreaProps?:MainInterface&React.HTMLAttributes<HTMLDivElement>;
}

export const DropArea: React.FC<IDropAreaProps> = ({
    message = 'Drag & Drop your files here',
    buttonText = 'Browse Files',
    onClickHandler = () => null,
    onDragEnter = () => null,
    onDragLeave = () => null,
    onDropHandler = () => null,
    isDisabled = false,
    dropAreaProps={},
    width,
    ...props
}): React.ReactElement => {
    const { getInputProps, getRootProps, isDragActive, inputRef } = useDropzone(
        {
            onDragEnter,
            onDragLeave,
            onDrop: onDropHandler,
            disabled: isDisabled,
        },
    );

    const getLottieAnimationOrIcon = useCallback(
        (isDragEnter: boolean): JSX.Element => {
            if (isDragEnter)
                return (
                    <Lottie
                        options={lottieOptions}
                        width={140}
                        height={ICON_HEIGHT}
                    />
                );
            return <Icon as={CloudUploadAlt} />;
        },
        [],
    );

    const fireEventOnInput = () => {
        if (inputRef.current) {
            inputRef.current.dispatchEvent(
                new MouseEvent('click', { bubbles: false }),
            );
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.onclick = onClickHandler;
        }
    }, [onClickHandler]);

    return (
        <Dropzone multiple {...props}>
            {() => (
                <RootDiv
                    {...getRootProps({})}
                    onClick={() => null}
                    isDisabled={isDisabled}
                >
                    <DropAreaBox isDragEnter={isDragActive} width={width} {...dropAreaProps}>
                        {getLottieAnimationOrIcon(isDragActive)}
                        <MessageBox>{message}</MessageBox>
                        <OrBox>OR</OrBox>
                        <BrowseFiles onClick={fireEventOnInput}>
                            {buttonText}
                            <input
                                {...getInputProps({
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

const RootDiv = styled.div<{ isDisabled: boolean }>`
    width: fit-content;
    ${({ isDisabled }): string => `
        ${isDisabled ? `opacity:${OPACITY_WHEN_DISABLED};` : ''}
    `}
`;

// const Input = styled.input`
//     opacity: 0;
//     display: initial !important;
//     visibility: initial;
//     position: absolute;
//     z-index: 99999999;
//     cursor: ${({disabled})=>disabled?'initial':'pointer'};
//     width: 2000px;
//     height: 2000px;
//     top: -1000px;
//     left: -1000px;
// `;

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
          background-image: linear-gradient(90deg, ${theme.colors.occupancyStatusColors.Occupied} 50%, transparent 50%), linear-gradient(90deg, ${theme.colors.occupancyStatusColors.Occupied} 50%, transparent 50%), linear-gradient(0deg, ${theme.colors.occupancyStatusColors.Occupied} 50%, transparent 50%), linear-gradient(0deg, ${theme.colors.occupancyStatusColors.Occupied} 50%, transparent 50%);
          background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
          background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
          background-position: left top, right bottom, left bottom, right   top;
          animation: border-dance .3s infinite linear;
          border: 2px dashed ${theme.colors.background};
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
    --position: relative;
    --overflow: hidden;
    user-select: none;
    width: fit-content;
    font-weight: 700;
    cursor: pointer;
`;

const OrBox = styled.div`
    margin: 10px;
    font-weight: 700;
    opacity: ${ICON_OPACITY};
    color: ${({ theme }) => theme.colors.occupancyStatusColors.Occupied};
    user-select: none;
`;

const MessageBox = styled.div`
    font-weight: 700;
    opacity: ${ICON_OPACITY};
    user-select: none;
`;

const Icon = styled.svg`
    width: ${ICON_HEIGHT}px;
    height: ${ICON_HEIGHT}px;
    opacity: ${ICON_OPACITY};
    color: ${({ theme }) => theme.colors.occupancyStatusColors.Occupied};
`;
