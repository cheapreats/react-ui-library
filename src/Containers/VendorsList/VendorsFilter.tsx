import React, { useState } from 'react';
import styled from 'styled-components';
import { Cog } from '@styled-icons/fa-solid/Cog';
import { HeaderGroup, Row } from "react-table";
import { List, ListHeader, ListHeaderProps, ListProps, ListFooter, ListToggle } from '../List';
import { CollapsibleHeading, ICollapsibleHeadingProps } from '../CollapsibleHeading/CollapsibleHeading';
import { DefaultFilter} from './DefaultFilter';
import { GlobalFilter } from './GlobalFilter';
import { ButtonProps } from '../../Inputs/Button/Button';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface IFilterItems {
    title: string;
    element?: (column: HeaderGroup<any>) => JSX.Element;
};

export interface IVendorsFilterProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    headingTitle: string;
    buttonText: string;
    filterItems: IFilterItems[];
    headingProps?: ListHeaderProps;
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
}): React.ReactElement => {
    const [isCollapsedArr, setIsCollapsedArr] = useState(Array(filterItems.length).fill(false));
    const [isGlobalCollapsed, setIsGlobalCollapsed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <List
            {...listProps}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            backgroundColor={BACKGROUND_COLOR}
            header={(
                <ListHeader
                    label={headingTitle}
                    headerFlex="space-between"
                    icon={COG_WHEEL_ICON}
                    iconProps="width: 20px; margin-right: 10px"
                    iconClick={() => alert('Icon Clicked')}
                />
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
            {filterItems.map((filterItem, index) => {
                const column = headerGroups[FIRST_OPTION].headers[index];
                const childElement = filterItem.element ? filterItem.element(column) : <DefaultFilter column={column} />
                return (
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
                        ChildElement={childElement}
                        {...collapsibleHeadingProps}
                    />
                )
            })}
        </List>
    );
};
