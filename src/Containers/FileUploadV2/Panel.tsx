import React, { useCallback } from 'react';
import styled from 'styled-components';

enum OperationState {
    isSuccess,
    isFailure,
    isLoading,
    isUnknown
}

interface IPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    operationState?: OperationState;
    /** the name of the file */
    name?: string;
}

const Panel: React.FC<IPanelProps> = ({ operationState=OperationState.isUnknown, name='', ...props }) => {
    const getMessage = useCallback((): string => {
        switch (operationState) {
        case OperationState.isFailure:
            return 'something went wrong';
        case OperationState.isSuccess:
            return 'completed';
        case OperationState.isLoading:
            return `loading ${name} ...`;
        default:
            return '';
        }
    }, [name, operationState]);
    return <PanelContainer {...props}>{getMessage()}</PanelContainer>;
};

export default Panel;

const PanelContainer = styled.div``;
