/*
    Created by:                Level Up team
    Date submitted (v4):       12/08/2020
    File:                      MainContainer.js
    File Description:          This component Contains the text and Button for the Table Management homepage.
*/
import React from 'react';
import styled from 'styled-components';

/**
 * @returns {JSX.Element} Main container for the Demo page That contains
 * the text and Button for the Table Management homepage.
 */
export interface IMainContainer {

}

export const MainContainer: React.FC<IMainContainer> = () => {
    return (
        <Pt6GreyBackground>
            <Pt3WithH1>Table Management Coming Soon!</Pt3WithH1>
            <hr />
            <Py4WithH4>
                Comprehensive restaurant management made easy.
            </Py4WithH4>
            <Pb3>
                Seat customers, make reservations, track orders, and get a
                bird's-eye view of your dining areas from one simple interface!
            </Pb3>
            <Pb3>Design dining areas and customize your tables with ease. </Pb3>
            <Pb3>
                Track customer interactions from end to end, so you can access
                all your business data in a single location.
            </Pb3>
            <hr />
            <Pt4WithH5TextCenter>
                Table Management Features:
            </Pt4WithH5TextCenter>
            <UlUnstyledList>
                <Pb3WithListStyles>
                    Colors make it easy to see which tables are occupied,
                    vacant, and reserved.
                </Pb3WithListStyles>
                <Pb3WithListStyles>
                    See guest names for the occupied chairs at each table.
                </Pb3WithListStyles>
                <Pb3WithListStyles>
                    Get up-to-date occupancy information for your entire
                    restaurant.
                </Pb3WithListStyles>
            </UlUnstyledList>
            <ButtonDangerLightBorderRounded href="#demo">
                Try the Demo!
            </ButtonDangerLightBorderRounded>
        </Pt6GreyBackground>
    );
};

/**
 * Styled component variables
 */
const ButtonDangerLightBorderRounded = styled.a`
    cursor: pointer;
    width: 25%;
    padding-bottom: 1rem;
    margin-top: 0.5rem;
    border-radius: 0.25rem;
    border-color: #f8f9fa;
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    color: #fff;
    background-color: #dc3545;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const Pb3 = styled.p`
    padding-bottom: 1rem;
    font-family: 'Cantata One', serif;
    color: rgb(140, 140, 140);
`;

const Pb3WithListStyles = styled.div`
    padding-bottom: 1rem;
    display: list-item;
    text-align: -webkit-match-parent;
    padding-top: 1em;
    font-family: 'Cantata One', serif;
`;

const UlUnstyledList = styled.ul`
    padding-left: 0;
    list-style: none;
    font-family: 'Cantata One', serif;
    color: rgb(140, 140, 140);
`;

const Pt4WithH5TextCenter = styled.h5`
    text-align: center;
    padding-top: 1.5rem;
    font-size: 1.25rem;
`;

const Py4WithH4 = styled.h4`
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
    font-family: 'Lato', sans-serif;
`;

const Pt3WithH1 = styled.h1`
    padding-top: 1rem;
    font-family: 'Lato', sans-serif;
`;

const Pt6GreyBackground = styled.div`
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    padding-top: 3.5rem;
    padding-bottom: 1rem;
    background-color: rgb(245, 245, 245);
`;