import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from '../../Inputs/Button/Button';
import { Heading, HeadingProps } from '../../Text/Heading';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IVendorsHeaderProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    headerText: string;
    rightButtonText: string;
    leftButtonText?: string;
    leftButtonProps?: ButtonProps;
    rightButtonProps?: ButtonProps;
    headingProps?: HeadingProps;
}

export const VendorsHeader: React.FC<IVendorsHeaderProps> = ({
    headerText,
    rightButtonText,
    leftButtonText,
    leftButtonProps,
    rightButtonProps,
    headingProps,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <Heading type="h1" bold {...headingProps}>
            {headerText}
        </Heading>
        <Row>
            <Button {...leftButtonProps}>{leftButtonText}</Button>
            <Button {...rightButtonProps}>{rightButtonText}</Button>
        </Row>
    </Wrapper>
);

const Wrapper = styled.div`
    ${flex('row', 'space-between')};
    padding: 10px;
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
