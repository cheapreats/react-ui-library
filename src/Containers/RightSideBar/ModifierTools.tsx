import React  from 'react';
import styled from 'styled-components';
import { List } from '../List';

// STYLED COMPONENTS
const Td = styled.td`
    border: 1px solid black;
`;
const Tr = styled.tr`
    border: 1px solid black;
    text-align: left;
`;
const Table = styled.table`
    border: 1px solid black;    
    border-collapse: collapse;
    width: 200px;
`;
const GrayTable = styled.table`
    border: 1px solid gray;    
    border-collapse: collapse;
    width: 200px;
`;
const Wrapper = styled.div`
`;
const DefaultTxt = styled.p`
    font-family: Quicksand;
    font-size: 13.8px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.45;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
`;
const Title = styled(DefaultTxt)`
    font-size: 19px;
    width: 105px;
    height: 24px;
`;
const QtyTxt = styled(DefaultTxt)`
    width: 25px;
    height: 20px;
`;
const ProductUPCTxt = styled(DefaultTxt)`
    width: 93px;
    height: 20px;
`;
const PriceTxt = styled(DefaultTxt)`
    width: 33px;
    height: 20px;
`;
const AddItemTxt = styled(DefaultTxt)`
    width: 60px;
    height: 20px;
`;
const SpecItemTxt = styled(DefaultTxt)`
    width: 166px;
    height: 20px;
`;
const ViewTxt = styled(DefaultTxt)`
    width: 111px;
    height: 20px;
`;
const DotTxt = styled.(DefaultTxt)`
    
`;
// END OF STYLED COMPONENTS

// MODIFIERPROPS
export interface ModifierProps {
    title: string,
    standard: string,
    alternative: string,
    isChosen: boolean
};
// END OF MODIFIER PROPS

export const ModifierTools: React.FC<ModifierProps> = ({
    title,
    standard,
    alternative,
    isChosen,
}): React.ReactElement => {
    return(
        <List>
            <Title>{ title }</Title>
            {() => {
                if(isChosen == true){
                    return (
                        <>
                            <ViewTxt>{ standard }</ViewTxt>
                            <Table>
                                <Tr>
                                    <Td>
                                        <QtyTxt>Qty</QtyTxt>
                                        <ProductUPCTxt>Product(UPC)</ProductUPCTxt>
                                        <PriceTxt>Price</PriceTxt>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <AddItemTxt>Add Item</AddItemTxt>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <SpecItemTxt>Specific item intructions</SpecItemTxt>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <DotTxt>...</DotTxt>
                                    </Td>
                                </Tr>
                            </Table>
                            <ViewTxt>{ alternative }</ViewTxt>
                            <GrayTable>
                                <Tr>
                                    <Td>
                                        <ProductUPCTxt>Product(UPC)</ProductUPCTxt>
                                        <QtyTxt>Qty</QtyTxt>
                                        <PriceTxt>Price</PriceTxt>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <AddItemTxt>Add Item</AddItemTxt>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <SpecItemTxt>Specific item intructions</SpecItemTxt>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <DotTxt>...</DotTxt>
                                    </Td>
                                </Tr>
                            </GrayTable>
                        </>
                    ) 
            } else {
                return (
                    <>
                        <ViewTxt>{ standard }</ViewTxt>
                        <GrayTable>
                            <Tr>
                                <Td>
                                    <QtyTxt>Qty</QtyTxt>
                                    <ProductUPCTxt>Product(UPC)</ProductUPCTxt>
                                    <PriceTxt>Price</PriceTxt>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <AddItemTxt>Add Item</AddItemTxt>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <SpecItemTxt>Specific item intructions</SpecItemTxt>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <DotTxt>...</DotTxt>
                                </Td>
                            </Tr>
                        </GrayTable>
                        <ViewTxt>{ alternative }</ViewTxt>
                        <Table>
                            <Tr>
                                <Td>
                                    <ProductUPCTxt>Product(UPC)</ProductUPCTxt>
                                    <QtyTxt>Qty</QtyTxt>
                                    <PriceTxt>Price</PriceTxt>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <AddItemTxt>Add Item</AddItemTxt>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <SpecItemTxt>Specific item intructions</SpecItemTxt>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <DotTxt>...</DotTxt>
                                </Td>
                            </Tr>
                        </Table>
                    </>
                )
            }
            }}
        </List>
    );
};