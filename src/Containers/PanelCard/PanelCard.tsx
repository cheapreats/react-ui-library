import React from 'react';
import { Button } from '@Inputs/Button/Button';
import { CardProps, Card } from '../Card/Card';

export interface IPanelCardProps extends CardProps {
    /** callback for cancel loading file */
    onCancelLoading?: () => void;
    isFailureMessage?: string;
    isSuccessMessage?: string;
    isLoadingMessage?: string;
    cancelLoadingText?: string;
}

export const PanelCard: React.FC<IPanelCardProps> = ({
    onCancelLoading = () => null,
    isFailureMessage = '',
    isLoadingMessage = '',
    isSuccessMessage = '',
    cancelLoadingText = 'Cancel',
    ...props
}): React.ReactElement => (
    <Card {...props}>
        <div>{isFailureMessage || isLoadingMessage || isSuccessMessage}</div>
        {isLoadingMessage && (
            <Button onClick={onCancelLoading}>{cancelLoadingText}</Button>
        )}
    </Card>
);
