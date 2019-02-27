import React from 'react';
import { storiesOf } from '@storybook/react';
import { DumpsterFire } from 'styled-icons/fa-solid/DumpsterFire';
import { Tag, Tags } from '../components';

storiesOf('Tag', module)
    .add('with nothing', () => (
        <Tag>Ralph?</Tag>
    ), {
        notes: ``
    })
    .add('with size', () => (
        <Tag size={10}>Ralph?</Tag>
    ), {
        notes: `Default is 1. Size act as a modifier for the default size`
    })
    .add('with active', () => (
        <Tag active>Ralph?</Tag>
    ), {
        notes: ``
    })
    .add('with data', () => (
        <Tag data={12351245213125}>Ralph?</Tag>
    ), {
        notes: `Pass data as an attribute if needed for handling with functions`
    })
    .add('with icon', () => (
        <Tag icon={ DumpsterFire }>Ralph?</Tag>
    ), {
        notes: `Replace the default close icon with your own custom icons for other purposes`
    })
    .add('with onClick', () => (
        <Tag onClick={() => alert('Hi')}>Ralph?</Tag>
    ), {
        notes: ``
    })
    .add('with disabled', () => (
        <Tag disabled>Ralph?</Tag>
    ), {
        notes: ``
    })
;