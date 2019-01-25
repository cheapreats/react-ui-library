import React from 'react';
import { storiesOf } from '@storybook/react';
import { DumpsterFire } from 'styled-icons/fa-solid/DumpsterFire';
import { Tag, Tags } from '../components';

storiesOf('Tag', module)
    .add('with nothing', () => (
        <Tags>
            <Tag>Ralph?</Tag>
        </Tags>
    ), {
        notes: ``
    })
    .add('with size', () => (
        <Tags>
            <Tag size={10}>Ralph?</Tag>
        </Tags>
    ), {
        notes: `Default is 1. Size act as a modifier for the default size`
    })
    .add('with active', () => (
        <Tags>
            <Tag active>Ralph?</Tag>
        </Tags>
    ), {
        notes: ``
    })
    .add('with data', () => (
        <Tags>
            <Tag data={12351245213125}>Ralph?</Tag>
        </Tags>
    ), {
        notes: `Pass data as an attribute if needed for handling with functions`
    })
    .add('with icon', () => (
        <Tags>
            <Tag icon={ DumpsterFire }>Ralph?</Tag>
        </Tags>
    ), {
        notes: `Replace the default close icon with your own custom icons for other purposes`
    })
    .add('with onClick', () => (
        <Tags>
            <Tag onClick={() => alert('Hi')}>Ralph?</Tag>
        </Tags>
    ), {
        notes: ``
    })
;