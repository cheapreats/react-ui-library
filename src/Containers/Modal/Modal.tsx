import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { useTheme } from 'styled-components';
import { flex, position, scroll, transition } from '@Utils/Mixins';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '@Utils/BaseStyles';
import { useTransition } from '@Utils/Hooks';

export interface ModalProps
    extends ResponsiveInterface,
        MainInterface,
        React.HTMLAttributes<HTMLDivElement> {
    onClose?: Function;
    height?: string;
    width?: string | number;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    maxWidth?: string;
    maxHeight?: string;
}

export const Modal: React.FC<ModalProps> = ({
    onClose = (): void => undefined,
    height = 'auto',
    width = 'default',
    children,
    state,
    maxWidth = '90%',
    maxHeight = '90%',
    ...props
}): React.ReactElement => {
    const theme = useTheme();
    const [show, setShow] = state;
    const [, mount, animation] = useTransition(show, {
        end: theme.speed.normal,
    });
    useEffect((): void => {
        if (!mount) onClose();
    }, [mount]);

    return createPortal(
        mount && (
            <Container>
                <Box
                    show={animation}
                    width={width}
                    height={height}
                    maxHeight={maxHeight}
                    maxWidth={maxWidth}
                    {...props}
                >
                    {children}
                </Box>
                <Drop show={animation} onClick={(): void => setShow(false)} />
            </Container>
        ),
        document.querySelector(`#modal`) as Element,
    );
};

const Container = styled.div`
    ${position('fixed')}
    ${flex('center')}
`;

interface IBoxProps extends MainInterface, ResponsiveInterface {
    show: boolean;
    width: string | number;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
}

const Box = styled.div<IBoxProps>`
    ${transition(['transform', 'opacity'])}
    background-color: white;
    overflow: auto;

    z-index: 1;

    ${Container}:not(:last-child) & {
        opacity: 0.4;
    }

    ${({ theme, ...props }): string => `
        max-width: ${props.maxWidth};
        max-height: ${props.maxHeight};
        border-radius: ${theme.dimensions.radius};
        box-shadow: ${theme.depth[1]};
        width: ${theme.dimensions.modal.width[props.width] || props.width};
        height: ${props.height};
        ${Main({
            padding: theme.dimensions.padding.container,
            ...props,
        })}
    `}

    ${({ show }): string =>
        show
            ? `
        transform: translateY(0);
        opacity: 1;
    `
            : `
        transform: translateY(-40px);
        opacity: 0;
    `}

    ${Responsive}
    ${scroll}
    ${Main}
`;

const Drop = styled.div<{ show: boolean }>`
    ${transition(['opacity'])}
    ${position('absolute')}
    cursor: pointer;
    ${Container}:first-of-type & {
        background-color: rgba(0, 0, 0, 0.4);
    }

    opacity: ${({ show }): number => (show ? 1 : 0)};
`;
