import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from '@Inputs';
import { Heading } from '../../Text/Heading';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IVendorsHeaderProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    headerText: string;
    rightButtonText: string;
    leftButtonProps?: ButtonProps;
    rightButtonProps?: ButtonProps;
}

export const VendorsHeader: React.FC<IVendorsHeaderProps> = ({
    headerText,
    rightButtonText,
    leftButtonProps,
    rightButtonProps,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <Heading type="h1" bold>
            {headerText}
        </Heading>
        <Row>
            <Button {...leftButtonProps} />
            <Button {...rightButtonProps}>{rightButtonText}</Button>
        </Row>
    </Wrapper>
);

const Wrapper = styled.div`
    ${flex('row', 'space-between')};
    ${media(
        'phone',
        `
        ${flex('column', 'center')};
    `,
    )};
`;
const Row = styled.div`
    ${flex('row')};
`;
