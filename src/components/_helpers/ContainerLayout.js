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
    ${ ({ column }) => column ? '' : 'flex-direction: row;' }
    ${ ({ wrap }) => wrap ? 'flex-wrap: wrap;' : '' }
    ${ ({ disabled }) => disabled ? 'pointer-events: none;' : '' }
    flex-shrink: 0;
    justify-content: ${ ({ justify }) => justify };
    align-items: ${ ({ align }) => align };
`;

export const ContainerLayout = props => {
    const [
        layoutProps,
        { children, spacing, column, wrap, justify, align }
    ] = ExtractProps(
        InputLayoutProps, props, { name: '' }, [ 'disabled' ]
    );
    const max = Array.isArray(children) ? children.length - 1 : 0;

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
        <Layout
            { ...layoutProps }
            name=''
            column={ column }
            wrap={ wrap }
            justify={ justify }
            align={ align }
        >
            { 
                React.Children.map(
                    children,
                    (child, dataIndex) => (
                        React.cloneElement(child, {
                            onKeyDown: handleKeys,
                            margin: spacing,
                            dataIndex
                        })
                    )
                )
            }
        </Layout>
    );
};

ContainerLayout.defaultProps = {
    spacing: 10,
    align: 'flex-start',
    justify: 'flex-start'
};

delete InputLayoutProps.name;
ContainerLayout.propTypes = {
    ...InputLayoutProps,
    spacing: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    column: PropTypes.bool,
    wrap: PropTypes.bool,
    align: PropTypes.oneOf([
        'stretch', 'center', 'flex-start', 'inherit',
        'flex-end', 'baseline', 'initial'
    ]),
    justify: PropTypes.oneOf([
        'flex-start', 'flex-end', 'center', 'inherit',
        'space-between', 'space-around', 'initial'
    ])
};

export default ContainerLayout;