import React, { useState } from 'react';
import styled from 'styled-components';
import { Cog } from '@styled-icons/fa-solid/Cog';
import { HeaderGroup, Row } from "react-table";
import { List, ListHeader, ListProps, ListFooter, ListToggle } from '../List';
import { CollapsibleHeading, ICollapsibleHeadingProps } from '../CollapsibleHeading/CollapsibleHeading';
import { DefaultFilter} from './DefaultFilter';
import { GlobalFilter } from './GlobalFilter';
import { Heading, HeadingProps } from '../../Text/Heading';
import { ButtonProps } from '../../Inputs/Button/Button';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface IFilterItems {
    title: string;
    selectOptions: string[];
    placeholder: string;
    element?: React.ReactElement;
};

export interface IVendorsFilterProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    headingTitle: string;
    buttonText: string;
    filterItems: IFilterItems[];
    headingProps?: HeadingProps;
    buttonProps?: ButtonProps;
    listProps: ListProps;
    collapsibleHeadingProps?: ICollapsibleHeadingProps;
    globalFilter?: any;
    preGlobalFilteredRows?: Row<any>[];
    setGlobalFilter?:(filterValue: any) => void;
    headerGroups: HeaderGroup<any>[];
}
const COG_WHEEL_ICON = Cog;
const BACKGROUND_COLOR = '#FFFFFF';
const FIRST_OPTION = 0

export const VendorsFilter: React.FC<IVendorsFilterProps> = ({
    headingTitle,
    filterItems,
    headingProps,
    listProps,
    collapsibleHeadingProps,
    headerGroups,
    globalFilter,
    preGlobalFilteredRows,
    setGlobalFilter,
    ...props
}): React.ReactElement => {
    const [isCollapsedArr, setIsCollapsedArr] = useState(Array(filterItems.length).fill(false));
    const [isGlobalCollapsed, setIsGlobalCollapsed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    console.log(headerGroups, 'ehaderGroups')
    return (
        <List
            {...listProps}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            backgroundColor={BACKGROUND_COLOR}
            header={(
                <ListHeader
                    label="Filters"
                    headerFlex="space-between"
                    icon={COG_WHEEL_ICON}
                    iconProps="width: 20px; margin-right: 10px"
                    iconClick={() => alert('Icon Clicked')}
                />
            )}
            footer={(
                <ListFooter>
                    <p>This is a list Footer</p>
                </ListFooter>
            )}
            toggleComponent={(
                <ListToggle
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    isLeftToggle
                    isToggleHiddenDesktop
                />
            )}
        >
            <CollapsibleHeading 
                key='Global'
                title='Filter All'
                isCollapsed={isGlobalCollapsed}
                setCollapsed={()=> setIsGlobalCollapsed(!isGlobalCollapsed)}
                ChildElement={<GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />}
                {...collapsibleHeadingProps}
            />
            {filterItems.map((filterItem, index) => (
                <CollapsibleHeading 
                    key={filterItem.title}
                    title={filterItem.title}
                    isCollapsed={isCollapsedArr[index]} 
                    setCollapsed={() => setIsCollapsedArr(
                        isCollapsedArr.map((isCollapsed, idx) => {
                            if (idx === index) return !isCollapsed;
                            return isCollapsed;
                        })
                    )}
                    ChildElement={<DefaultFilter column={headerGroups[FIRST_OPTION].headers[index]} />}
                    {...collapsibleHeadingProps}
                />
            ))}
        </List>
    );
};
