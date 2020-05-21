import React from 'react';
import { storiesOf } from '@storybook/react';
import { Accordion } from '../../src';

storiesOf('Accordion', module).add('with default', () => (
    <Accordion>
        <potato headerType={'h1'} header={'title 1'} mainText={'main text 1'}>
            <div>
                <h2>hello world</h2>
            </div>
        </potato>
        <potato headerType={'h1'} header={'title 2'} mainText={'main text 2'} />
    </Accordion>
));
