import React, { Children, useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { transition } from '../mixins';

const DURATION = 150;

const Container = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 20px;
    max-width: 400px;
`;

const Item = styled.li`
    ${ ({ spacing }) => spacing ? `margin-bottom: ${ spacing }px;` : '' }
    ${ ({ offset, active, spacing }) => offset ? `
        transform: translate3d(0, ${
            active ? offset * -1 : ((offset < 0 ? '-' : '') + 1)
        }00%, 0)${
            active ? ( 
                ` translate3d(0, ${ spacing * Math.abs(offset) }px, 0)`
            ) : (
                spacing ? ` translate3d(0, ${ spacing * (offset < 0 ? -1 : 1) }px, 0)` : ''
            )
        };
    ` : 'transform: translate3d(0,0,0);' }
    ${ transition(['transform'], DURATION) }
`;

export const Draggable = ({ className, children, onChange = () => {}, spacing = 10 }) => {

    const [ start, setStart ] = useState();
    const [ end, setEnd ] = useState();
    const debounce = useRef();
    const offset = useRef();

    const onDragStart = useCallback(e => {
        e.stopPropagation();
        setStart(e.currentTarget.value);
    }, [ start ]);

    const onDragOver = useCallback(e => {
        e.stopPropagation();
        let value = e.currentTarget.value;
        if (!debounce.current && value !== undefined && value !== start) {
            debounce.current = true;
            if (value === end) value--;
            offset.current = start - value;
            setEnd(value);
            window.setTimeout(() => debounce.current = false, DURATION);
        }
    }, [ end, start ]);

    const onDragEnd = useCallback(() => {
        onChange(start, end);
        setStart();
        setEnd();
    }, [ end ]);

    return (
        <Container className={ className } onDragEnd={ end ? onDragEnd : null }>
            {
                Children.map(children, (child, value) => {
                    const lower = value >= start && value <= end ? offset.current : 0;
                    const upper = value <= start && value >= end ? offset.current : 0;
                    return <Item
                        { ...child.props }
                        onDragStart={ onDragStart }
                        onDragOver={ onDragOver }
                        data={ child.key }
                        value={ value }
                        spacing={ spacing }
                        active={ value === start }
                        offset={ lower || upper }
                        draggable
                    >
                        { child }
                    </Item>;
                })
            }
        </Container>
    )
};