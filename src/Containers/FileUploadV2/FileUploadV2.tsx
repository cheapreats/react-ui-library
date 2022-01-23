import React from 'react';
import styled from 'styled-components';
import { MainInterface, Main } from '@Utils/BaseStyles';
import { Button } from '@Inputs/Button/Button';
import { useGetWidth } from '@Utils/Hooks';
import { PanelCard } from '../PanelCard/PanelCard';
import { DropArea, IDropAreaProps } from '../DropArea/DropArea';
import { useInformativePanels } from './useInformativePanels';

export interface IFileUploadV2Props
    extends MainInterface,
        React.HTMLAttributes<HTMLDivElement> {
    /** if true, failure message will appear even after success operation; its purpose is to test the appearance of the failure message during development */
    isTestIsFailure?: boolean;
    /**
     * function to process the file read and transformed to a base64 string; default: does nothing
     * @param {string} base64String the file read and transformed to a base64 string
     */
    onFile?: (base64String: string) => void;
    /** time in ms of the presence of the bottom panel informing the result of the operation (sucess or failure); default value: 1500  */
    messageDuration?: number;
    dropAreaProps?: IDropAreaProps;
}
/**
 * multiple file upload, in parallel, version 2
 */
export const FileUploadV2: React.FC<IFileUploadV2Props> = ({
    isTestIsFailure = false,
    onFile = (base64String: string) => null,
    messageDuration = 1500,
    dropAreaProps = {},
    ...props
}): React.ReactElement => {
    const [panels, onDrop, onCancelUploading] = useInformativePanels(
        isTestIsFailure,
        onFile,
        messageDuration,
    );
    const [dropAreaWidth, dropAreaRef] = useGetWidth();

    return (
        <FileUploadV2Container {...props}>
            <DropArea
                onDropHandler={onDrop}
                {...dropAreaProps}
                ref={dropAreaRef}
            />
            {panels.map((panel) => (
                <PanelCard
                    key={panel.name}
                    cancelButtonOnLoading={
                        <Button onClick={onCancelUploading(panel.name)}>
                            Cancel
                        </Button>
                    }
                    name={panel.name}
                    operationState={panel.operationState}
                    margin="10px 0"
                    style={{ width: dropAreaWidth, boxSizing: 'border-box' }}
                />
            ))}
        </FileUploadV2Container>
    );
};

const FileUploadV2Container = styled.div<MainInterface>`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.dimensions.radius};
    width: fit-content;
    ${({ theme, ...props }): string =>
        Main({ padding: theme.dimensions.padding.container, ...props })}
`;
