import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { List, ListHeader, ListFooter, ListItem } from '../../src';
import { Cog } from '@styled-icons/fa-solid/Cog';

const COG_WHEEL_ICON = Cog;

const items = [
    { key: '1', data: 'data', date: 'today' },
    { key: '2', data: 'data', date: 'yesterday' },
    { key: '3', data: 'data', date: 'today' },
    { key: '4', data: 'data', date: 'yesterday' },
    { key: '5', data: 'data', date: 'today' },
    { key: '7', data: 'data', date: 'yesterday' },
];

storiesOf('List', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Container>
            <List
                header={<ListHeader 
                    label="List Header" 
                    headerFlex="space-between"
                    icon={COG_WHEEL_ICON }
                    iconProps={'width: 20px; margin-right: 10px'}
                    iconClick={() => alert('Icon Clicked')}
                    />}
                footer={<ListFooter>
                    <p>This is a list Footer</p>
                </ListFooter>}
                loading={false}
                id="1"
            >
                {items.map((item, index) => (
                    <ListItem index={index} onClick={()=>alert(`You clicked ${item.date}`)}>
                        <p>{item.date}</p>
                    </ListItem>
                ))}
            </List>
        </Container>
    ));

const Container = styled.div`
    width:30vw;
    height:70vh;
`
