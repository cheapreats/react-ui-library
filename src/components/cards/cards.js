import React                                          from 'react';
import styled, {keyframes}                                  from 'styled-components';
import PropTypes                                      from 'prop-types';
import {PRIMARY_COLOUR, PRIMARY_FONT} from "../variables";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    height:500px;
    width:500px;
    margin: 40px;
    background-color: #0a0a5b;
    color:white;
`;

const topToBottom = keyframes`
    0% {
        opacity: 0.25;
        transform: translateY(-100px);
    }
    25%{
        opacity: 0.5;
        transform: translateY(-70px);
    }
    50% {
        opacity: 0.5;
        transform: translateY(-50px);
    }
    75{
        opacity: 0.75;
        transform: translateY(-30px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const SliderDiv = styled.div`
    display: inline-block;
    animation: ${topToBottom} 1s linear;
    opacity: 1;
`;


const CircleContainer = styled.div`
    padding: 15px;
    float: right;
    display: inline-block;
    width: 130px;
    height:130px;
`

const HeadingOneStyled = styled.h1`
    font-family: ${PRIMARY_FONT};
    width: 300px;
    margin-top: 30px;
    margin-left:30px;
    display: inline-block;
    font-weight: ${props => props.bold && "bold"};
`;
const HeadingThreeStyled = styled.h3`
    font-family: ${PRIMARY_FONT};
    width: 300px;
    margin-left:30px;
    margin-top:0px
    display: inline-block;
    font-weight: normal;
    font-weight: ${props => props.bold && "normal"};
`;

const style = {
    path: {
        stroke: PRIMARY_COLOUR,
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'round',
        },
        // Customize the circle behind the path, i.e. the "total progress"
    trail: {
        // Trail color
        stroke: '#d6d6d6',
        },
        // Customize the text
    text: {
        // Text color
        fill: PRIMARY_COLOUR,
        // Text size
        fontSize: '16px',
        // Text font
        fontFamily: PRIMARY_FONT
        },
}


export const SimpleCard = ({
    percentage,
    textOne, 
    textTwo,
    textThree,
    textFour,
    children,
    bold
}) => {
    return (
        
            <Card>
                <SliderDiv>
                    <HeadingOneStyled bold={bold}>
                        {textOne? textOne: children}
                    </HeadingOneStyled>
                     <CircleContainer>
                        <CircularProgressbar
                            percentage={percentage}
                            text={`${percentage} mins`}
                            styles={style}
                        />
                    </CircleContainer>
                    <HeadingThreeStyled bold={bold}>
                        {textTwo? textTwo: children}
                    </HeadingThreeStyled>
                </SliderDiv>
                <SliderDiv>
                    <HeadingOneStyled bold={bold}>
                        {textThree? textThree: children}
                    </HeadingOneStyled>
                    <HeadingThreeStyled bold={bold}>
                        {textFour? textFour: children}
                    </HeadingThreeStyled>
                </SliderDiv>
            </Card>
       
        
       
    );
}

SimpleCard.propTypes = {
    percentage: PropTypes.string,
    textOne: PropTypes.node,
    textTwo: PropTypes.node,
    textThree: PropTypes.node,
    textFour: PropTypes.node,
    children: PropTypes.node,
    bold: PropTypes.bool
};
