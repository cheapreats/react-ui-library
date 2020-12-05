import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from '../../Inputs/Button';
import { Heading } from '../../Text/Heading';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex } from '../../Utils/Mixins';

export interface VendorsHeaderProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    headerText: string;
    rightButtonText: string;
    leftButtonProps: ButtonProps;
    rightButtonProps: ButtonProps;
}

export const VendorsHeader: React.FC<VendorsHeaderProps> = ({
    headerText,
    rightButtonText,
    leftButtonProps,
    rightButtonProps,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <Heading type="h1" bold>
                {headerText}
            </Heading>
            <Row>
                <Button {...leftButtonProps} />
                <Button {...rightButtonProps}>
                    {rightButtonText}
                </Button>
            </Row>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${flex('row', 'space-between')};
`;
const Row = styled.div`
    ${flex('row')};
`;