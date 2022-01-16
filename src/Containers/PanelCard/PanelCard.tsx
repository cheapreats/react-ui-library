import React, { useCallback } from 'react';
import { Button } from '@Inputs/Button/Button';
import { CardProps, Card } from '../Card/Card';

export enum OperationState {
    isLoading,
    isFailure,
    isSuccess,
    isUnknown,
}

export interface IPanelCardProps extends CardProps {
    messageIsFailure?: string;
    messageIsSuccess?: string;
    messageIsLoading?: string;
    /** name of file being loaded */
    name?: string;
    /** state of the file loading operation */
    operationState?: OperationState;
    /** callback for cancel loading file */
    onCancelLoading?: () => void;
}

export const PanelCard: React.FC<IPanelCardProps> = ({
    operationState = OperationState.isUnknown,
    name = '',
    messageIsFailure = 'Something went wrong',
    messageIsLoading = `loading file ${name}...`,
    messageIsSuccess = 'Completed',
    onCancelLoading = () => null,
    ...props
}): React.ReactElement => {
    const renderContent = useCallback((): React.ReactNode => {
        switch (operationState) {
            case OperationState.isFailure:
                return <div>{messageIsFailure}</div>;
            case OperationState.isSuccess:
                return <div>{messageIsSuccess}</div>;
            case OperationState.isLoading:
                return (
                    <div>
                        <div>{messageIsLoading}</div>
                        <Button onClick={onCancelLoading}>Cancel</Button>
                    </div>
                );
            default:
                return null;
        }
    }, [operationState, messageIsFailure, messageIsSuccess, messageIsLoading]);

    return <Card {...props}>{renderContent()}</Card>;
};
