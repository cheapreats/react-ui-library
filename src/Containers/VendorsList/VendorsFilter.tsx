import React, { useState } from 'react';
import styled from 'styled-components';
import { List } from '../List';
import { CollapsibleHeading, ICollapsibleHeadingProps } from '../CollapsibleHeading/CollapsibleHeading';
import { DefaultFilter} from './DefaultFilter';
import { Heading, HeadingProps } from '../../Text/Heading';
import { Button, ButtonProps } from '../../Inputs/Button/Button';
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
    filterValuesArr: string[];
    setFilterValuesArr: React.Dispatch<React.SetStateAction<string[]>>;
    columns: any;
}

const BACKGROUND_COLOR = '#FFFFFF';

export const VendorsFilter: React.FC<IVendorsFilterProps> = ({
    headingTitle,
    buttonText,
    filterItems,
    headingProps,
    buttonProps,
    collapsibleHeadingProps,
    columns,
    ...props
}): React.ReactElement => {
    const [filterApplied, setFilterApplied] = useState(false);
    const [isCollapsedArr, setIsCollapsedArr] = useState(Array(filterItems.length).fill(false));
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
                <Wrapper {...props}>
                    {!!filterItems && filterItems.map((filterItem, index) => {
                        console.log("inside filter:", columns[0].headers[index]);
                        return (
                            <>
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
                                    ChildElement={<DefaultFilter column={columns[0].headers[index]} />}
                                    {...collapsibleHeadingProps}
                                />
                            </>
                        )})}
                </Wrapper>
            </List>
        </div>
    );
};

const Wrapper = styled.div`
    
`;
