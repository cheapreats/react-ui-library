import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from '../../Inputs/Checkbox';
import { List } from '../List';

export interface reqCheckbox {
    [key: string]: {
        label: string;
        value: boolean
    }
}

export interface RequirementProps {
    title: string;
    craTitle: string;
    reqTitle: string;
    recTitle: string;
    reqInfoArr: reqCheckbox
    recInfoArr: reqCheckbox
}

export const Checkboxes: RequirementProps = {
    title: 'Modifier Tools',
    craTitle: 'Canada Revenue Agency Checklist',
    reqTitle: 'Required Information',
    recTitle: 'Recommended Information',
    reqInfoArr: {
        NAME_OF_BUSINESS: {
            label: 'Name of Business',
            value: false
        },
        BUSINESS_ADDRESS: {
            label: 'Business Address',
            value: false
        },
        CONTACT_INFORMATION: {
            label: 'Contact Information',
            value: false
        },
        DATE_WHEN_SALES_TOOK_PLACE: {
            label: 'Date when sales took place',
            value: false
        },
        TIME_WHEN_SALES_TOOK_PLACE: {
            label: 'Time when sales took place',
            value: false
        },
        RANG_UP_THE_SALE: {
            label: 'Sales associate who rang up the sale',
            value: false
        },
        PRICE_FOR_PRODUCT_OR_SERVICE: {
            label: 'Price for each product or service',
            value: false
        },
        SALES_TAX_RATE: {
            label: 'Sales tax rate(%)',
            value: false
        },
        AMOUNT_TAX: {
            label: 'Amount tax',
            value: false
        },
        TOTAL_SALE_PRICE: {
            label: 'Total price of sale',
            value: false
        },
        TOTAL_SALE_PRICE_TAX: {
            label: 'Total price when tax included',
            value: false
        },
        QUANTITY_OF_PRODUCT_OR_SERVICE: {
            label: 'Quantity of each product or service',
            value: false
        },
        NAME_OF_UPC: {
            label: 'Name of UPC of each product or service',
            value: false
        },
        STATION_NUM_OF_REGISTER: {
            label: 'Station # of register where sale was transacted',
            value: false
        },
    },
    recInfoArr: {
        ORDER_TRANSACTION: {
            label: 'Order Transaction #',
            value: false
        },
        BUSINESS_LOGO: {
            label: 'Business Logo',
            value: false
        },
        DINE_IN_OUT: {
            label: 'Dine in/Dine out',
            value: false
        },
        PAYMENT_METHOD: {
            label: 'Payment Method',
            value: false
        },
        QR_CODE: {
            label: 'QR Code',
            value: false
        },
        PROMOTIONS: {
            label: 'Promotions',
            value: false
        },
        COUPONS: {
            label: 'Coupons',
            value: false
        },
    }
}

const isToggleable = false;
const isLeftToggle = false;

const Title = styled.h1`
    padding: 5px 10px 5px;
    font-size: 1em;
`;
const REQt = styled.h1`
    color: #FF0000;
    font-size: 1em;
    padding: 5px 10px 5px;
`;
const RECt = styled.h1`
    color:  #0000ff;
    font-size: 1em;
    padding: 5px 10px 5px;
`;
const Wrapper = styled.div`
`;
const Element = styled.div`
    display: block;
    padding: 5px 10px 5px;
`;

export const RightSideBar: React.FC<RequirementProps> = ({
    title,
}): React.ReactElement => {
    const [loading, setLoading] = useState(false);
    const [isToggled, setIsToggled] = useState(false);

    function checkHandler(){
        console.log('changed')
    }

    return (
        <Wrapper>
            <List
                id='left-sidebar'
                loading={loading}
                cssPosition='absolute'
                margin='0'
                left='auto'
                right='0'
                isToggleable={isToggleable}
                isLeftToggle={isLeftToggle}
                isToggled={isToggled}
                setIsToggled={setIsToggled}
                header={(
                    <>
                        <Title>{ Checkboxes.title }</Title>
                    </>
                )}
            >
                <Title>{Checkboxes.craTitle}</Title>
                <REQt>{Checkboxes.reqTitle}</REQt>
                {Object.values(Checkboxes.reqInfoArr).map((key) => (
                    <Element>
                        <Checkbox
                            label={key.label}
                            value={key.value}
                            onChange={checkHandler}
                            name='checkbox'
                        />
                    </Element>
                ))}
                <RECt>{Checkboxes.recTitle}</RECt>
                {Object.values(Checkboxes.recInfoArr).map((key) => (
                    <Element>
                        <Checkbox
                            label={key.label}
                            value={key.value}
                            onChange={checkHandler}
                            name='checkbox'
                        />
                    </Element>
                ))}
            </List>
        </Wrapper>
    );
};
