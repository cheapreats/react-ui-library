import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { CollapsibleHeading, ICollapsibleHeadingProps } from '../../index';

import { FilterSelect } from './FilterSelect';
import { Button } from '../../Inputs/Button/Button';

export default {
    title: 'Dashboard/CRM/CollapsibleHeading',
    component: CollapsibleHeading,
} as Meta;

const getCollapsibleHeadingProps = (): ICollapsibleHeadingProps => ({
    title: 'Email',
    style: {
        width: '20%',
    },
});

const Template: Story<ICollapsibleHeadingProps> = (args) => {
    const [isCollapsible, setIsCollapsible] = useState(false);
    const [filterApplied, setFilterApplied] = useState(false);
    return (
        <>
            <CollapsibleHeading
                isCollapsed={isCollapsible}
                setCollapsed={() => setIsCollapsible(!isCollapsible)}
                ChildElement={
                    <FilterSelect
                        selectOptions={['Contains', 'Equals']}
                        value="Contains"
                        placeholder="Add email"
                    />
                }
                {...args}
            />
            <Button primary onClick={() => setFilterApplied(!filterApplied)}>
                Apply
            </Button>
        </>
    );
};

export const Basic = Template.bind({});
Basic.args = getCollapsibleHeadingProps();
