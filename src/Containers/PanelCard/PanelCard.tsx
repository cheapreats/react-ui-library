import React, { useCallback,useMemo } from 'react';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { CheckCircle } from '@styled-icons/fa-solid/CheckCircle';
import { TimesCircle } from '@styled-icons/fa-solid/TimesCircle';
import {FileIcon, defaultStyles} from 'react-file-icon';
import { MainTheme } from '@Themes';
import { flex } from '@Utils/Mixins';
import { CardProps, Card } from '../Card/Card';
import { Loading as L } from '../Loading/Loading';

const LAST_ARRAY_ELEMENT=-1;
const FILE_EXTENSION_SEPARATOR='.';
const FIRST_ARRAY_ELEMENT=0;

export enum OperationState {
    isFailure,
    isSuccess,
    isLoading,
    isUnknown,
}

export interface IPanelCardProps extends CardProps {
    /** name of the file */
    name?: string;
    isFailureMessage?: string;
    isSuccessMessage?: string;
    isLoadingMessage?: string;
    operationState?: OperationState;
    isSuccessIcon?: StyledIcon;
    isFailureIcon?: StyledIcon;
    isSuccessIconColor?: string;
    isFailureIconColor?: string;
    /** icons width and height */
    iconHeight?: number;
    dismissButtonOnSuccess?: React.ReactElement;
    retryButtonOnFailure?: React.ReactElement;
    cancelButtonOnLoading?: React.ReactElement;
    /** horizontal margin for is loading bar */
    isLoadingSpace?:number;
}

export const PanelCard: React.FC<IPanelCardProps> = ({
    isFailureMessage = 'Something went wrong',
    isSuccessMessage = 'Completed',
    name = '',
    isLoadingMessage = `Loading file ${name}...`,
    operationState = OperationState.isUnknown,
    isSuccessIcon = CheckCircle,
    isFailureIcon = TimesCircle,
    iconHeight = 35,
    isSuccessIconColor = MainTheme.colors.statusColors.green,
    isFailureIconColor = MainTheme.colors.statusColors.red,
    retryButtonOnFailure,
    cancelButtonOnLoading,
    dismissButtonOnSuccess,
    isLoadingSpace=20,
    ...props
}): React.ReactElement => {
    const extension=useMemo(():string=>name.split(FILE_EXTENSION_SEPARATOR).slice(LAST_ARRAY_ELEMENT)[FIRST_ARRAY_ELEMENT],[name])

    const renderContentForIsSuccessAndIsFailure = useCallback(
        (
            icon: StyledIcon,
            height: number,
            color: string,
            message: string,
            button: React.ReactElement|undefined,
        ) => (
            <ContentContainer>
                <IconContainer>
                    <Icon as={icon} height={height} color={color} />
                    <MessageContainer>{message}</MessageContainer>
                </IconContainer>
                {button}
            </ContentContainer>
        ),
        [],
    );

    const renderContent = useCallback((): React.ReactNode => {
        switch (operationState) {
        case OperationState.isFailure:
            return renderContentForIsSuccessAndIsFailure(isFailureIcon,iconHeight,isFailureIconColor,isFailureMessage,retryButtonOnFailure);
        case OperationState.isSuccess:
            return renderContentForIsSuccessAndIsFailure(isSuccessIcon,iconHeight,isSuccessIconColor,isSuccessMessage,dismissButtonOnSuccess);
        case OperationState.isLoading:
            return (
                <ContentContainer>
                    <FileIconContainer width={iconHeight}>
                        <FileIcon extension={extension} {...defaultStyles[extension]} />
                    </FileIconContainer>
                    <Loading
                        message={isLoadingMessage}
                        isNavigationPageLoader
                        loading
                        horizontalMargin={isLoadingSpace}
                    />
                    {cancelButtonOnLoading}
                </ContentContainer>
            );
        default:
            return null;
        }
    }, [
        isFailureMessage,
        isLoadingMessage,
        isSuccessMessage,
        operationState,
        isSuccessIcon,
        isFailureIcon,
        iconHeight,
        isSuccessIconColor,
        isFailureIconColor,
        cancelButtonOnLoading,
        retryButtonOnFailure,
        dismissButtonOnSuccess,
        renderContentForIsSuccessAndIsFailure,
        isLoadingSpace,
    ]);
    return <Card {...props}>{renderContent()}</Card>;
};

const Icon = styled.svg<{ height: number; color?: string }>`
    height: ${({ height }) => height}px;
    ${({ color }) => `
    ${color ? `color:${color};` : ''}
    `}
`;

const MessageContainer = styled.span`
    margin: 5px;
    font-weight: 700;
`;

const ContentContainer = styled.div`
    ${flex('space-between')}
`;

const Loading = styled(L)<{horizontalMargin:number}>`
    flex: 1;
    margin:0 ${({horizontalMargin})=>horizontalMargin}px;
`;

const IconContainer=styled.div`
${flex('center')}
`

const FileIconContainer=styled.div<{width:number}>`
width:${({width})=>width}px;
`
