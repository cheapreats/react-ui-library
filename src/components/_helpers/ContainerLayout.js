import React from 'react';
import PropTypes from 'prop-types';
import InputLayout, { InputLayoutProps } from './InputLayout';

const KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
}

export const ContainerLayout = ({
    className,
    margin,
    maxWidth,
    label,
    description,
    disabled,
    error,
    children,
    spacing = 10
}) => {
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
        target.parentNode.children[index + (description ? 2 : 1)].focus();
    };
    return (
        <InputLayout
            className={ className }
            margin={ margin }
            maxWidth={ maxWidth }
            label={ label }
            name=''
            description={ description }
            disabled={ disabled }
            error={ error }
        >
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

delete InputLayoutProps.name;
ContainerLayout.propTypes = {
    ...InputLayoutProps,
    spacing: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default ContainerLayout;