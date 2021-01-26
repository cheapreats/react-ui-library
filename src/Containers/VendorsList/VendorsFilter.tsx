import React, { useState } from 'react';
import styled from 'styled-components';
import { HeaderGroup } from "react-table";
import { List } from '../List';
import { CollapsibleHeading, ICollapsibleHeadingProps } from '../CollapsibleHeading/CollapsibleHeading';
import { DefaultFilter} from './DefaultFilter';
import { IVendorsData } from '../ReactTable/ReactTable';
import { Heading, HeadingProps } from '../../Text/Heading';
import { ButtonProps } from '../../Inputs/Button/Button';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface IFilterItems {
    title: string;
    selectOptions: string[];
    placeholder: string;
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
    collapsibleHeadingProps?: ICollapsibleHeadingProps;
    // filterValuesArr: string[];
    // setFilterValuesArr: React.Dispatch<React.SetStateAction<string[]>>;
    headerGroups: HeaderGroup<any>[];
}

const BACKGROUND_COLOR = '#FFFFFF';
const FIRST_OPTION = 0

export const VendorsFilter: React.FC<IVendorsFilterProps> = ({
    headingTitle,
    filterItems,
    headingProps,
    collapsibleHeadingProps,
    headerGroups,
    ...props
}): React.ReactElement => {
    const [isCollapsedArr, setIsCollapsedArr] = useState(Array(filterItems.length).fill(false));
    console.log(headerGroups, ' headerGroups')
    return (
        <div>
            <List
                id="vendors-filter"
                loading={false}
                cssPosition="absolute"
                margin="0"
                left="0"
                right="auto"
                backgroundColor={BACKGROUND_COLOR}
                header={(
                    <Heading bold {...headingProps}>
                        {headingTitle}
                    </Heading>
                )}
            >
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
        </div>
    );
};
