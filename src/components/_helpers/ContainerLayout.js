import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputLayout, { InputLayoutProps } from './InputLayout';
import { ExtractProps } from './Util';

const KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
};

const Layout = styled(InputLayout)`

`;

export const ContainerLayout = props => {
    const [ layoutProps, { children, spacing, disabled } ] = ExtractProps(
        InputLayoutProps, props, { name: '' }, [ 'disabled' ]
    );
    const items = Array.isArray(children) ? children : [ children ];
    const max = items.length - 1;

    const handleKeys = ({ keyCode, target }) => {
        let index = parseInt(target.getAttribute('data-index'));
        switch(keyCode) {
            case KEYS.DOWN:
            case KEYS.RIGHT:
                index++;
                break;
            case KEYS.UP:
            case KEYS.LEFT:
                index--;
                break;
            default:
                break;
        }
        index = index < 0 ? max : index > max ? 0 : index;
        target.parentNode.children[index + (props.description ? 2 : 1)].focus();
    };
    return (
        <InputLayout { ...layoutProps }>
            { 
                items.map((child, dataIndex) => React.cloneElement(child, {
                    onKeyDown: handleKeys,
                    key: dataIndex,
                    margin: spacing,
                    dataIndex,
                    disabled
                }))
            }
        </InputLayout>
    );
};

ContainerLayout.defaultProps = {
    spacing: 10
};

delete InputLayoutProps.name;
ContainerLayout.propTypes = {
    ...InputLayoutProps,
    spacing: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default ContainerLayout;