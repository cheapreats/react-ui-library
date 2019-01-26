import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { flex, position, media, scroll, transition } from '../mixins';
import { Times } from 'styled-icons/fa-solid/Times';

const Container = styled.div.attrs(({ name }) => ({ name }))`
    width: 100%;
    height: 100;
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    ${ position('fixed', 'auto') };
    ${ ({ duration }) => transition(['opacity'], duration) }
    ${
        ({ show }) => show ? `
            opacity: 1;
            pointer-events: all;
        ` : ''
    }
`;

const Back = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.45);
`;

const Close = styled.div`
    padding: 10px;
    border-radius: 999px;

    &:hover {
        background-color: rgba(0,0,0,0.08);
    }

    & svg {
        width: 22px;
        height: 22px;
    }
    ${ flex('center') }
    ${ transition(['background-color']) }
    ${ position('absolute', 'auto', '10px', '10px', 'auto', 'auto') }
`;

const Box = styled.div`
    ${ ({ width, height }) => `
        width: ${ width };
        height: ${ height };
    ` }
    max-width: 100%;
    max-height: 100%;
    border-radius: 15px;
    background-color: white;
    ${
        ({ show }) => show ? `transform: translate3d(0,0,0);` : `transform: translate3d(0, -40px, 0);`
    }
    ${ ({duration}) => transition(['width', 'height', 'border-radius', 'transform'], duration) }
    ${ position('absolute', 'auto') }
    ${ scroll }
    ${ media.tablet`
        width: 100%;
        height: 100%;
        border-radius: 0;
    ` }
`;

export class Popup extends Component {

    state = {
        show: this.props.show || false,
        duration: this.props.duration || 400
    }

    componentDidMount() {
        window.addEventListener('onPopup', this.handle);
    }

    componentWillUnmount() {
        window.removeEventListener('onPopup', this.handle);
    }

    componentDidUpdate({ show }) {
        if (this.props.show !== show) {
            this.setState({ show: this.props.show });
        }
    }

    hide = () => popup.hide(this.props.name)

    handle = ({ detail }) => {
        const { action, target } = detail;
        if (target === this.props.name) {
            switch(action) {
                case 'SHOW':
                    this.setState({ show: true });
                    break;
                case 'HIDE':
                    this.setState({ show: false });
                    break;
                case 'TOGGLE':
                    this.setState(({ show }) => ({ show: !show }));
                    break;
                default:
                    console.error('Unknown popup action');
                    break;
            }
        }
    }

    render() {
        const { className, name, width = '80%', height = '80%', children } = this.props;
        return (
            <Container { ...this.state } name={ name } className={ className }>
                <Back onClick={ this.hide }/>
                <Box width={ width } height={ height } { ...this.state }>
                    <Close onClick={ this.hide }><Times/></Close>
                    { children }
                </Box>
            </Container>
        );
    }
}

Popup.propTypes = {
    className: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    name: PropTypes.string.isRequired,
    children: PropTypes.node
}

// Controller API
export const popup = {
    EVENT: 'onPopup',
    _dispatch: (action, target) => window.dispatchEvent( new CustomEvent('onPopup', { detail: { action, target } }) ),
    show: target => popup._dispatch('SHOW', target),
    hide: target => popup._dispatch('HIDE', target),
    toggle: target => popup._dispatch('TOGGLE', target)
}