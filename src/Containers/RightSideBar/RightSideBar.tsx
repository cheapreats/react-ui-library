import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../../Inputs/Checkbox';

// 'Name of Business': false,
// 'Business Address': true,
// 'Contact Information': false,
// 'Date when sales took place': false,
// 'Time when sales took place': false,
// 'Sales associate who rang up the sale': false,
// 'Price for each product or service': false,
// 'Sales tax rate(%)': false,
// 'Amount tax': false,
// 'Total price of sale': false,
// 'Total price when tax included': false,
// 'Quantity of each product or service': false,
// 'Name of UPC of each product or service': false,
// 'Station # of register where sale was transacted': false,

export interface RequirementProps {
    title: string;
    checkboxArr: {
        NAME_OF_BUSINESS: {
            label: 'Name of Business'
            value: false
            name: 'checkbox'
        },
        BUSINESS_ADDRESS: {
            label: 'Business Address'
            value: false
            name: 'checkbox'
        },
        CONTACT_INFORMATION: {
            label: 'Contact Information'
            value: false
            name: 'checkbox'
        }
    }
}

export const RightSideBar: React.FC<RequirementProps> = ({
    title,
    checkboxArr
}): React.ReactElement => {

    function checkHandler(){
        console.log('changed')
    }

    return (
        <Wrapper>
            <h1>{ title }</h1>
            {Object.values(checkboxArr).map((checkbox) => (
                <Checkbox
                    label={checkbox.label}
                    value={checkbox.value}
                    onChange={checkHandler}
                    name={checkbox.name}
                />
            ))};
        </Wrapper>
    );
};

const Wrapper = styled.div`
`;