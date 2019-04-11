import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Draggable } from '../components';

const Box = styled.div`
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(0,0,0,0.1);
`;

storiesOf('Draggable', module)
    .add('with nothing', () => (
        <Draggable
            items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
            onChange={items => alert(items)}
            map={item => <Box>{ item }</Box>}
        />
    ))
    .add('with custom spacing', () => (
        <Draggable
            items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
            onChange={items => alert(items)}
            map={item => <Box>{ item }</Box>}
            spacing={40}
        />
    ), { notes: `Default spacing is 10px` })
    .add('with row', () => (
        <Draggable
            items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
            onChange={items => alert(items)}
            map={item => <Box>{ item }</Box>}
            row
        />
    ))
;