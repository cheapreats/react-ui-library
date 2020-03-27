import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { List, Button } from '../../src';

storiesOf('List', module)
    .addDecorator(withKnobs)
    .add('with default', () => <List label={text('Label', 'List Label')} />)
    .add('with inner scroll', () => (
        <div style={{ height: '80vh' }}>
            <List
                label="List"
                stickyTopContent={<StickyComponent />}
                items={items}
                footer={<Footer />}
                render={props => (
                    <div>
                        <p>{props.key}</p>
                        <p>{props.data}</p>
                        <p>{props.date}</p>
                    </div>
                )}
            />
        </div>
    ));

const StickyComponent = () => (
    <div>
        {items.map(item => (
            <div style={{ padding: '15px', backgroundColor: 'lightgrey' }}>
                <p>{item.key}</p>
                <p>{item.data}</p>
                <p>{item.date}</p>
            </div>
        ))}
    </div>
);
const Footer = () => <Button>Click Me</Button>;
const items = [
    { key: '1', data: 'data', date: 'today' },
    { key: '2', data: 'data', date: 'yesterday' },
    { key: '3', data: 'data', date: 'today' },
    { key: '4', data: 'data', date: 'yesterday' },
    { key: '5', data: 'data', date: 'today' },
    { key: '7', data: 'data', date: 'yesterday' },
];
