import React from 'react';
import styled from 'styled-components';

export interface ICapacityDisplay {
    /**
     * Total number of occupied seats
     */
    totalSeatsOccupied: number,
    /**
     * Total number of seats
     */
    totalNumberOfSeats: number,

}

/**
 * Primary UI component for user interaction
 */
export const CapacityDisplay: React.FC<ICapacityDisplay>
    = ({
        totalSeatsOccupied = 0,
        totalNumberOfSeats = 0,
        ...props
    }) => {

        const capacityPercent = Math.ceil((totalSeatsOccupied/totalNumberOfSeats) * 100);

        return (
            <BorderBox>
                <Row>
                    <Col3>
                        <PieBox capacityPercent={capacityPercent} />
                    </Col3>
                    <Col8>
                        <TitleDiv>Current Capacity</TitleDiv>
                        <PercentDiv>
                            {capacityPercent}% Full
                        </PercentDiv>
                    </Col8>

                </Row>
            </BorderBox>
        );
    };

const BorderBox=styled.div`

    border: 2px solid black;
    border-radius: 5px;
    background-color: #6c757d;
    height: 175px;
`;

const PieBox=styled.div`

    flex-basis: 0;
    max-width: 100%;
    display: block; 
    position: absolute; 
    width: 150px;  
    height: 150px; 
    border-radius: 50%; 
    background-image: conic-gradient( 
        red ${({capacityPercent}) => capacityPercent * 3.6 }deg,  
        white 0 270deg  
        ); 
     
`;

const TitleDiv=styled.div`

    color: blue;
    padding-left: 1rem;
    font-size: 1rem;
    
`;

const PercentDiv=styled.div`

    color: white;
    padding-left: 1rem;
    font-size: 2rem;
    
`;

const Row = styled.div`
        
    display: flex;
    flex-wrap: wrap;
    margin-right: 15px;
    margin-left: 15px;
`;

const Col3 = styled.div`
    flex: 0 0 25%;
    max-width: 25%;
    position: relative;
    width: 100%;
    padding-left: 15px;
    padding-top: 0.5rem;        
`;

const Col8 = styled.div`
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;  
    padding-top: 0.5rem;      
`;