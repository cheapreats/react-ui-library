export interface draggableComponent {
    [key: string]: {
        key: string,
        field: string,
        isRequired: boolean,
        isRecommended: boolean
    }
};

export interface CategoryInterface {
    key: string,
    editorCategory: string,
    draggableComponents: draggableComponent
};


export interface LeftSideBarInterface {
    textElements: CategoryInterface,
    imageElements: CategoryInterface,
    layoutElements: CategoryInterface,
    numberElements: CategoryInterface,
    priceElements: CategoryInterface,
    codesElements: CategoryInterface,
    settingsElements: CategoryInterface
};

const element = {
    NAME_OF_BUSINESS: {
        key: '1',
        field: 'Name of business',
        checked: true
    },
    ADDRESS: {
        key: '2',
        field: 'Address',
        checked: false
    }
}
export const ReceiptElements: LeftSideBarInterface = {
    textElements: {
        key: 'Text',
        editorCategory: 'Text',
        draggableComponents: {
            NAME_OF_BUSINESS: {   
                key: '1',
                field: 'Name of business',
                isRequired: true,
                isRecommended: false
            },
            ADDRESS_OF_BUSINESS: {
                key: '2',
                field: 'Address of business',
                isRequired: true,
                isRecommended: false
            },
            CONTACT_INFORMATION: {
                key: '3',
                field: 'Business contact information',
                isRequired: true,
                isRecommended: false
            },
            NAME_OF_SALES_ASSOCIATE: {
                key: '4',
                field: 'Name of sales associate',
                isRequired: true,
                isRecommended: false
            },
            NAME_OF_PRODUCT: {
                key: '5',
                field: 'Name of product or service',
                isRequired: true,
                isRecommended: false
            },
            ORDER_TYPE: {
                key: '6',
                field: 'Order type',
                isRequired: false,
                isRecommended: true
            },
            PAYMENT_METHOD: {
                key: '7',
                field: 'Payment method',
                isRequired: false,
                isRecommended: true
            }
        }
    },
    imageElements: {
        key: 'Image',
        editorCategory: 'Image',
        draggableComponents: {
            BUSINESS_LOGO: {
                key: '8',
                field: 'Business logo',
                isRequired: false,
                isRecommended: true
            },
            ADDITIONAL_BRANDING: {
                key: '9',
                field: 'Additional branding',
                isRequired: false,
                isRecommended: false
            }
        }
    },
    layoutElements: {
        key: 'Layout',
        editorCategory: 'Layout',
        draggableComponents: {
            MENU_TABLE: {
                key: '10',
                field: 'Menu table',
                isRequired: true,
                isRecommended: false
            },
            WHITE_SPACE: {
                key: '11',
                field: 'White space',
                isRequired: false,
                isRecommended: true
            },
            DIVIDER: {
                key: '12',
                field: 'Divider',
                isRequired: false,
                isRecommended: true
            }
        }
    },
    numberElements: {
        key: 'Number',
        editorCategory: 'Number',
        draggableComponents: {
            STATION_NUMBER: {
                key: '13',
                field: 'Station number',
                isRequired: true,
                isRecommended: false
            },
            QUANTITY_PRODUCT: {
                key: '14',
                field: 'Quantity of each product or service',
                isRequired: true,
                isRecommended: false
            },
            NUMBER_OF_GUESTS: {
                key: '15',
                field: 'Number of guests',
                isRequired: false,
                isRecommended: true
            },
            TRANSACTION_ORDER_NUMBER: {
                key: '16',
                field: 'Transaction order number',
                isRequired: false,
                isRecommended: true
            },
        }
    },
    priceElements: {
        key: 'Price',
        editorCategory: 'Price',
        draggableComponents: {
            SALE_PRICE: {
                key: '17',
                field: 'The sale price of product or service',
                isRequired: true,
                isRecommended: false
            },
            TOTAL_TAX: {
                key: '18',
                field: 'Total amount of tax',
                isRequired: true,
                isRecommended: false
            },
            RATE_OF_SALES_TAX: {
                key: '19',
                field: 'Rate of sales tax',
                isRequired: true,
                isRecommended: false
            },
            TOTAL_SALE_PRICE: {
                key: '20',
                field: 'Total price of sale',
                isRequired: false,
                isRecommended: true
            },
            TIP: {
                key: '21',
                field: 'Tips',
                isRequired: false,
                isRecommended: true
            },
            TOLAL_PRICE_WITH_TAX: {
                key: '22',
                field: 'Total price of sale with tax',
                isRequired: false,
                isRecommended: true
            },
            TOTAL_PRICE_WITH_TIPS: {
                key: '23',
                field: 'Total price with tip',
                isRequired: false,
                isRecommended: true
            }
        }
    },
    codesElements: {
        key: 'Code',
        editorCategory: 'Codes',
        draggableComponents: {
            UPC_CODE: {
                key: '24',
                field: 'UPC code',
                isRequired: true,
                isRecommended: false
            },
            QR_CODE: {
                key: '25',
                field: 'QR code',
                isRequired: false,
                isRecommended: true
            }
        }
    },
    settingsElements: {
        key: 'Settings',
        editorCategory: 'Settings',
        draggableComponents: {
            DATE: {
                key: '26',
                field: 'Date',
                isRequired: true,
                isRecommended: false
            },
            TIME: {
                key: '27',
                field: 'Time',
                isRequired: true,
                isRecommended: false
            }
        }
    }
};

export const draggableComponentsObj: draggableComponent = Object.values(ReceiptElements).map((ReceiptElement)  => {
    return ReceiptElement.draggableComponents;
}).reduce((prev, current) => {
    return {...prev, ...current};
});