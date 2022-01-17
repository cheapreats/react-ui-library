import React, { useCallback } from 'react';
import { Button } from '@Inputs/Button/Button';
import { CardProps, Card } from '../Card/Card';

type OperationState = { isFailure: boolean } & { isLoading: boolean };

export interface IPanelCardProps extends CardProps {
    /** name of file being loaded */
    name?: string;
    /** state of the file loading operation */
    operationState?: OperationState;
    /** callback for cancel loading file */
    onCancelLoading?: () => void;
    isFailureMessage?: string;
    isSuccessMessage?: string;
    isLoadingMessage?: string;
}

export const PanelCard: React.FC<IPanelCardProps> = ({
    operationState = { isFailure: false, isSuccess: false, isLoading: false },
    name = '',
    onCancelLoading = () => null,
    isFailureMessage = 'Something went wrong',
    isLoadingMessage = `loading file ${name}...`,
    isSuccessMessage = 'Completed',
    ...props
}): React.ReactElement => {
    const renderContent = useCallback((): React.ReactNode => {
        if (operationState.isFailure) {
            return <div>{isFailureMessage}</div>;
        }
        if (operationState.isLoading) {
            return (
                <div>
                    <div>{isLoadingMessage}</div>
                    <Button onClick={onCancelLoading}>Cancel</Button>
                </div>
            );
        }
        return <div>{isSuccessMessage}</div>;
    }, [operationState, isFailureMessage, isSuccessMessage, isLoadingMessage]);

    return <Card {...props}>{renderContent()}</Card>;
};
