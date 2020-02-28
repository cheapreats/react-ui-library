import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { position, flex, scroll, transition } from '@Utils/Mixins';
import {
    Main,
    Responsive,
    ResponsiveInterface,
    MainInterface,
} from '@Utils/BaseStyles';
import { useTransition } from '@Utils/Hooks';

export interface ModalProps extends ResponsiveInterface, MainInterface {
    theme: DefaultTheme;
    onClose?: Function;
    width?: string | number;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const _Modal: React.FC<ModalProps> = ({
    onClose = (): void => {},
    width = 'default',
    children,
    theme,
    state,
    ...props
}): React.ReactElement => {
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
                <Box show={animation} width={width} {...props}>
                    {children}
                </Box>
                <Drop show={animation} onClick={(): void => setShow(false)} />
            </Container>
        ),
        document.querySelector(`#modal`) as Element,
    );
};

export const Modal = withTheme(_Modal);

const Container = styled.div`
    ${position('fixed')}
    ${flex('center')}
`;

const Box = styled.div<
    {
        show: boolean;
        width: string | number;
    } & ResponsiveInterface &
        MainInterface
>`
    ${transition(['transform', 'opacity'])}
    background-color: white;
    overflow: auto;
    max-width: 90%;
    max-height: 90%;
    z-index: 1;

    ${Container}:not(:last-child) & {
        opacity: 0.4;
    }

    ${({ theme, ...props }): string => `
        border-radius: ${theme.dimensions.radius};
        box-shadow: ${theme.depth[1]};
        width: ${theme.dimensions.modal.width[props.width] || props.width};
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
