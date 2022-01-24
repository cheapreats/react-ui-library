import React,{useCallback} from 'react';
import styled from 'styled-components';
import { MainInterface, Main } from '@Utils/BaseStyles';
import { Button } from '@Inputs/Button/Button';
import { useGetWidth } from '@Utils/Hooks';
import { DropArea, IDropAreaProps } from '../DropArea/DropArea';
import { PanelListWrapper as PLW } from '../PanelListWrapper/PanelListWrapper';
import { IPanelCardProps } from '../PanelCard/PanelCard';
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
    isSequentially?:boolean;
    delay?:number;
}
/**
 * multiple file upload, in parallel, version 2
 */
export const FileUploadV2: React.FC<IFileUploadV2Props> = ({
    isTestIsFailure = false,
    onFile = (base64String: string) => null,
    messageDuration = 1500,
    dropAreaProps = {},
    isSequentially=true,
    delay=15,
    ...props
}): React.ReactElement => {
    const [panels, onDrop, onCancelUploading] = useInformativePanels(
        isTestIsFailure,
        onFile,
        messageDuration,
    );
    const [dropAreaWidth, dropAreaRef] = useGetWidth();

    const panelPropertiesMapper=useCallback(():IPanelCardProps[]=>panels.map((panel) => {
        const mappedPanel= ({
            name: panel.name,
            operationState: panel.operationState,
            cancelButtonOnLoading: (
                <Button onClick={onCancelUploading(panel.name)}>
                    Cancel
                </Button>
            )
        })

        return mappedPanel;
    }),[panels])

    return (
        <FileUploadV2Container {...props}>
            <DropArea
                onDropHandler={onDrop}
                {...dropAreaProps}
                ref={dropAreaRef}
            />
            <PanelListWrapper
                panels={panelPropertiesMapper()}
                verticalSpacing={10}
                width={dropAreaWidth}
                isSequentially={isSequentially}
                delay={delay}
            />
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

const PanelListWrapper = styled(PLW)<{ width?: number }>`
    box-sizing: border-box;
    ${({ width }) => `
${width ? `width:${width}px;` : ''}
`}
`;
