import React, { forwardRef } from 'react';
import styled from 'styled-components';
import {
    Main,
    MainInterface,
    MainProps,
    Responsive,
    ResponsiveInterface,
    ResponsiveProps,
} from '../Utils/BaseStyles';
import {
    __useImplicitProps,
    ImplicitPropsInterface,
    useTransition,
} from '../Utils/Hooks';
import { flex, transition } from '../Utils/Mixins';

export interface LabelLayoutProps
    extends ResponsiveInterface,
        MainInterface,
        ImplicitPropsInterface {
    name?: string;
    label?: string;
    description?: React.ReactNode;
    error?: boolean | string;
    success?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const LabelLayout: React.ForwardRefExoticComponent<LabelLayoutProps> =
    forwardRef<HTMLDivElement, LabelLayoutProps>(
        (
            {
                name,
                label,
                description,
                error,
                success,
                children,
                className,
                ...props
            },
            ref,
        ): React.ReactElement => {
            const [, mount, animation] = useTransition(!!error, {
                end: 250,
            });
            const implicitProps = __useImplicitProps(props, [
                ...MainProps,
                ...ResponsiveProps,
            ]);
            const layoutProps = {
                description,
                success,
                className,
            };

            return (
                <Layout ref={ref} {...layoutProps} {...implicitProps}>
                    {label && <Label htmlFor={name}>{label}</Label>}
                    {description && (
                        <Info id={`${name}-info`}>{description}</Info>
                    )}
                    {children}
                    {mount && (
                        <ErrorLabel id={`${name}-error`} error={animation}>
                            {error}
                        </ErrorLabel>
                    )}
                </Layout>
            );
        },
    );

const Layout = styled.div<ResponsiveInterface & MainInterface>`
    ${transition(['opacity'])}
    ${flex('column')}
    ${(props): string => Main({ margin: '0 0 15px', ...props })}
    ${Responsive}
`;

const Label = styled.label`
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 5px;
`;

const ErrorLabel = styled(Label)<{
    error?: boolean;
}>`
    ${transition(['max-height', 'opacity'])}
    overflow: hidden;
    margin-top: 5px;
    max-height: 0;
    opacity: 0;
    color: red;

    ${({ error }): string =>
        error
            ? `
        max-height: 20px;
        opacity: 1;
    `
            : ''}
`;

const Info = styled.span`
    font-size: 0.9rem;
    font-weight: bold;
    opacity: 0.7;
    margin: -5px 0 5px;
`;

export default LabelLayout;
