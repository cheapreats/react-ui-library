import React, { useState, useEffect } from 'react';
import { position, transition, flex, media } from '../mixins';
import styled from 'styled-components';
import { SHADOW_RAISE_1, PRIMARY_COLOUR } from '../variables';

const Events = {
    SHOW: 'onModalShow',
    HIDE: 'onModalHide'
};

const dispatch = (event, detail) => {
    window.dispatchEvent(new CustomEvent(Events[event], { detail }))
};

/**
 * @typeof {Object} ModalController
 * @property {object} events - The events for specific modal actions
 * @property {function} add - Adds a modal to the component
 * @property {function} remove - Removes a modal from the component
 */

/**
 * Function to control Modal
 * @param {(string|null)} name - The specific modal being targetted
 * @returns {ModalController} The controller for named modal 
 */
export const modal = name => ({
    show: async content => {
        dispatch('SHOW', { name, content });
        return modal(name);
    },
    hide: async () => {
        dispatch('HIDE', { name });
        return modal(name);
    }
});

/**
 * Modal React hook because hooks are cool
 * @param {number} duration - The duration of animations
 * @returns {object} Returns an object of modals
 */
export const useModal = (duration) => {
    const state = useState({});
    const _show = ({ detail }) => show(detail, state);
    const _hide = ({ detail }) => hide(detail, state, duration);

    useEffect(() => {
        window.addEventListener(Events.SHOW, _show);
        window.addEventListener(Events.HIDE, _hide);
        return () => {
            window.removeEventListener(Events.SHOW, _show);
            window.removeEventListener(Events.HIDE, _hide);
        }
    });

    return state[0];
}

const show = ({ name, content }, [modals, setModals]) => {
    if (modals[name]) {
        window.clearTimeout(modals[name].timer);
    }
    const res = setModals({
        ...modals,
        [name]: {
            timer: null,
            fade: true,
            content
        }
    });

    // For tricking SC to do fade-in
    // (More animations are reliable than animations surprisingly)
    window.setTimeout(
        () => {
            setModals({
                ...modals,
                [name]: {
                    timer: null,
                    fade: false,
                    content
                }
            });
        }, 1
    );
}

const hide = ({ name }, [modals, setModals], duration) => {
    modals[name].timer = window.setTimeout(
        () => {
            if (modals[name].fade) {
                delete modals[name];
                setModals(modals);
            }
        }, duration
    );
    modals[name].fade = true;
    setModals({ ...modals });
}

export const Modal = ({ position = ['absolute', 0, 0], delay = 400 }) => {
    const modals = useModal(delay);
    const items = Object.entries(modals);
    const hasModals = Object.values(modals).filter(({ fade }) => !fade).length > 0;

    return (
        <Container hasModals={ hasModals } pos={ position } delay={ delay }>
            {
                items.map(([name, { fade, content }], key) => (
                    <ModalBox
                        styled={ content.styled }
                        key={ name }
                        delay={ delay }
                        id={ `modal-${ name }` }
                        index={ key }
                        fade={ fade }
                    >
                        <Times onClick={() => modal(name).hide()}/>
                        { content.render() }
                    </ModalBox>
                ))
            }
            <Backdrop onClick={() => modal(items[items.length - 1][0]).hide()}/>
        </Container>
    );
};

const Container = styled.div`
    ${ ({ pos }) => position(...pos) };
    ${ ({ hasModals }) => hasModals ? `
        pointer-events: all;
        opacity: 1;
    ` : `
        pointer-events: none;
        opacity: 0;
    ` }
    ${ ({ delay }) => transition(['opacity'], delay) }
    ${ flex('center') }
    height: 100%;
    width: 100%;
    flex-grow: 1;
`;

const Times = styled.button`
    ${ position('absolute', '15px 15px auto auto', 0) }
    height: 20px;
    width: 20px;
    border: none;
    background: none;
    cursor: pointer;

    &:hover {
        &::before, &::after {
            background-color: ${ PRIMARY_COLOUR };
        }
    }

    &::before, &::after {
        width: 100%;
        height: 2px;
        content: '';
        ${ transition(['background-color']) }
        ${ position('absolute', 'auto', 0) }
        background-color: rgba(0,0,0,0.8);
    }

    &::before {
        transform: rotate(45deg);
    }

    &::after {
        transform: rotate(-45deg);
    }
`;

const ModalBox = styled.div`
    height: 60%;
    width: 60%;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    box-shadow: ${ SHADOW_RAISE_1 };
    ${ position('absolute', 'auto', 'auto') }
    ${ ({ delay }) => transition(['opacity', 'transform', 'width', 'height', 'border-radius'], delay) }
    ${ ({ fade }) => fade ? `
        opacity: 0;
        transform: translate3d(0, -45px, 0);
    ` : `
        opacity: 1;
        transform: translate3d(0, 0, 0);
    ` }
    z-index: ${ ({ index }) => index + 1 };
    ${ ({ styled }) => styled }
    ${ media.tablet`width: 100%; height: 100%; border-radius: 0;` }
`;

const Backdrop = styled.div`
    background-color: rgba(0,0,0,0.45);
    cursor: pointer;
    height: 100%;
    width: 100%;
`;