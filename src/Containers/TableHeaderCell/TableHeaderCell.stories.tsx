import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TableHeaderCell, TableHeaderCellProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('TableHeaderCell'),
    component: TableHeaderCell,
    args: {
        title: 'Name',
        sortDown: true
    }
} as Meta;

export const Basic: Story<TableHeaderCellProps> = (args) => <TableHeaderCell {...args} />;
