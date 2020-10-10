export interface RequirementProps {
    title: string;
    checkboxArr: {};
}

export const Requirement: RequirementProps = {
    title: 'Requirement',
    checkboxArr: {
        'Name of Business': false,
        'Business Adress': false,
        'Contact Information': false,
        'Date when sales took place': false,
        'Time when sales took place': false,
        'Sales associate who rang up the sale': false,
        'Price for each product or service': false,
        'Sales tax rate(%)': false,
        'Amount tax': false,
        'Total price of sale': false,
        'Total price when tax included': false,
        'Quantity of each product or service': false,
        'Name of UPC of each product or service': false,
        'Station # of register where sale was transacted': false,
    }    
}

