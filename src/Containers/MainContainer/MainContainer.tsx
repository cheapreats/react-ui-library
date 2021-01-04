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
        <TextCenterWithGreyBackground>
            <SpacingTopForHeader3WithH1>Table Management Coming Soon!</SpacingTopForHeader3WithH1>
            <hr />
            <PaddingTopAndBottomForH4>
                Comprehensive restaurant management made easy.
            </PaddingTopAndBottomForH4>
            <PaddingOnBottom>
                Seat customers, make reservations, track orders, and get a
                bird's-eye view of your dining areas from one simple interface!
            </PaddingOnBottom>
            <PaddingOnBottom>Design dining areas and customize your tables with ease. </PaddingOnBottom>
            <PaddingOnBottom>
                Track customer interactions from end to end, so you can access
                all your business data in a single location.
            </PaddingOnBottom>
            <hr />
            <SpaceForHeaderWithH5TextCenter>
                Table Management Features:
            </SpaceForHeaderWithH5TextCenter>
            <StylesForUnstyledList>
                <ListStyles>
                    Colors make it easy to see which tables are occupied,
                    vacant, and reserved.
                </ListStyles>
                <ListStyles>
                    See guest names for the occupied chairs at each table.
                </ListStyles>
                <ListStyles>
                    Get up-to-date occupancy information for your entire
                    restaurant.
                </ListStyles>
            </StylesForUnstyledList>
            <ButtonDangerLightBorderRounded href="#demo">
                Try the Demo!
            </ButtonDangerLightBorderRounded>
        </TextCenterWithGreyBackground>
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

const PaddingOnBottom = styled.p`
    padding-bottom: 1rem;
    font-family: 'Cantata One', serif;
    color: rgb(140, 140, 140);
`;

const ListStyles = styled.div`
    padding-bottom: 1rem;
    display: list-item;
    text-align: -webkit-match-parent;
    padding-top: 1em;
    font-family: 'Cantata One', serif;
`;

const StylesForUnstyledList = styled.ul`
    padding-left: 0;
    list-style: none;
    font-family: 'Cantata One', serif;
    color: rgb(140, 140, 140);
`;

const SpaceForHeaderWithH5TextCenter = styled.h5`
    text-align: center;
    padding-top: 1.5rem;
    font-size: 1.25rem;
`;

const PaddingTopAndBottomForH4 = styled.h4`
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
    font-family: 'Lato', sans-serif;
`;

const SpacingTopForHeader3WithH1 = styled.h1`
    padding-top: 1rem;
    font-family: 'Lato', sans-serif;
`;

const TextCenterWithGreyBackground = styled.div`
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    padding-top: 3.5rem;
    padding-bottom: 1rem;
    background-color: rgb(245, 245, 245);
`;