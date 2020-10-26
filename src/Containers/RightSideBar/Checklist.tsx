import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../../Inputs/Checkbox';

export interface DefCheckbox {
    [key: string]: {
        label: string;
        value: boolean;
    };
}
export interface CheckListProps {
    title: string;
    CRATitle: string;
    ReqTitle: string;
    RecTitle: string;
    ReqInfoArr: DefCheckbox;
    RecInfoArr: DefCheckbox;
}

export const RecInfoArr = {
    ORDER_TRANSACTION: {
        label: 'Order Transaction #',
        value: false,
    },
    BUSINESS_LOGO: {
        label: 'Business Logo',
        value: false,
    },
    DINE_IN_OUT: {
        label: 'Dine in/Dine out',
        value: false,
    },
    PAYMENT_METHOD: {
        label: 'Payment Method',
        value: false,
    },
    QR_CODE: {
        label: 'QR Code',
        value: false,
    },
    PROMOTIONS: {
        label: 'Promotions',
        value: false,
    },
    COUPONS: {
        label: 'Coupons',
        value: false,
    },
};
export const ReqInfoArr = {
    NAME_OF_BUSINESS: {
        label: 'Name of Business',
        value: false,
    },
    BUSINESS_ADDRESS: {
        label: 'Business Address',
        value: false,
    },
    CONTACT_INFORMATION: {
        label: 'Contact Information',
        value: false,
    },
    DATE_WHEN_SALES_TOOK_PLACE: {
        label: 'Date when sales took place',
        value: false,
    },
    TIME_WHEN_SALES_TOOK_PLACE: {
        label: 'Time when sales took place',
        value: false,
    },
    RANG_UP_THE_SALE: {
        label: 'Sales associate who rang up the sale',
        value: false,
    },
    PRICE_FOR_PRODUCT_OR_SERVICE: {
        label: 'Price for each product or service',
        value: false,
    },
    SALES_TAX_RATE: {
        label: 'Sales tax rate(%)',
        value: false,
    },
    AMOUNT_TAX: {
        label: 'Amount tax',
        value: false,
    },
    TOTAL_SALE_PRICE: {
        label: 'Total price of sale',
        value: false,
    },
    TOTAL_SALE_PRICE_TAX: {
        label: 'Total price when tax included',
        value: false,
    },
    QUANTITY_OF_PRODUCT_OR_SERVICE: {
        label: 'Quantity of each product or service',
        value: false,
    },
    NAME_OF_UPC: {
        label: 'Name of UPC of each product or service',
        value: false,
    },
    STATION_NUM_OF_REGISTER: {
        label: 'Station # of register where sale was transacted',
        value: false,
    },
};

// STYLED COMPONENTS
const Wrapper = styled.div``;
const DefaultTxt = styled.h1`
    font-family: Quicksand;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
`;
const CraTitle = styled(DefaultTxt)`
    margin: 20px;
    width: 192px;
    height: 20px;
`;
const REQTitle = styled(DefaultTxt)`
    margin: 20px;
    color: red;
    width: 100%;
    height: 20px;
`;
const RECTitle = styled(DefaultTxt)`
    margin: 20px;
    color: blue;
    width: 100%;
    height: 20px;
`;
const Element = styled.div`
    margin: 20px;
    display: block;
`;
// END OF STYLED COMPONENTS

export const CheckList: React.FC<CheckListProps> = ({
    CRATitle,
    ReqTitle,
    RecTitle,
    ReqInfoArr,
    RecInfoArr,
}): React.ReactElement => {

    function checkHandler() {
        console.log('changed');
    }

    return (
        <Wrapper>
            <CraTitle>{CRATitle}</CraTitle>
            <REQTitle>{ReqTitle}</REQTitle>
            {Object.keys(ReqInfoArr).map((key) => (
                <Element>
                    <Checkbox
                        label={ReqInfoArr[key].label}
                        value={ReqInfoArr[key].value}
                        onChange={checkHandler}
                        name="checkbox"
                    />
                </Element>
            ))}
            <RECTitle>{RecTitle}</RECTitle>
            {Object.keys(RecInfoArr).map((key) => (
                <Element>
                    <Checkbox
                        label={RecInfoArr[key].label}
                        value={RecInfoArr[key].value}
                        onChange={checkHandler}
                        name="checkbox"
                    />
                </Element>
            ))}
        </Wrapper>
    );
};
