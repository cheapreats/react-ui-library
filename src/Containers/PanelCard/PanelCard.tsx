import React, { useCallback } from 'react';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { CheckCircle } from '@styled-icons/fa-solid/CheckCircle';
import { TimesCircle } from '@styled-icons/fa-solid/TimesCircle';
import { MainTheme } from '@Themes';
import { flex } from '@Utils/Mixins';
import { CardProps, Card } from '../Card/Card';
import { Loading as L } from '../Loading/Loading';

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
    ...props
}): React.ReactElement => {
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
                    <Loading
                        message={isLoadingMessage}
                        isNavigationPageLoader
                        loading
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

const Loading = styled(L)`
    flex: 1;
`;

const IconContainer=styled.div`
${flex('center')}
`
