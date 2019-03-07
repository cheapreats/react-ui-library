import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DEFAULT_BREAK = 880;

const createMedia = media => {
    const breaks = Object.entries(media);
    breaks.sort(([a], [b]) => b - a);
    return breaks.reduce((acc, [key, val]) => (
        acc += `
            @media (max-width: ${ key }px) {
                width: ${ val / 0.12 }%;
            }
        `
    ), '')
};

const Container = styled.div`
    display: inline-block;
    flex-direction: column;
    box-sizing: border-box;
    flex-srhink: 0;
    ${ ({ right }) => right ? 'margin-left: auto' : '' }
    width: ${ ({ col }) => col ? (col / 0.12) : 100 }%;
    ${
        ({ media }) => media ? (
            typeof(media) !== 'object' ?
            createMedia({ [DEFAULT_BREAK]: media }) : createMedia(media)
        ) : ''
    }
    ${
        ({ top, bottom, center, stretch }) => (
            top ? 'align-self: flex-start;' :
            bottom ? 'align-self: flex-end;' :
            center ? 'align-self: center;' :
            stretch ? 'align-self: stretch;' : ''
        )
    }
`;

export const Column = ({ className, children, col, media, right, top, bottom, center, stretch }) => (
    <Container
        col={ col }
        media={ media }
        className={ className }
        right={ right }
        top={ top }
        bottom={ bottom }
        center={ center }
        stretch={ stretch }
    >
        { children }
    </Container>
);

Column.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    col: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    media: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.object)
    ]),
    right: PropTypes.bool,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    center: PropTypes.bool,
    stretch: PropTypes.bool
};