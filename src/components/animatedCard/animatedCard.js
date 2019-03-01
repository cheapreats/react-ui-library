import React                                          from 'react';
import styled, {keyframes}                                  from 'styled-components';
import PropTypes                                      from 'prop-types';
import {PRIMARY_COLOUR, PRIMARY_FONT} from "../variables";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


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
    width: 300px;
    height: 500px;
    padding: 15px;
`;


const CircleContainer = styled.div`
    padding: 15px;
    float: right;
    display: inline-block;
    width: 130px;
    height:130px;
`

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


export const AnimatedCard = ({
    percentage,
    text, 
    children
}) => {
    return (
            <div>
                <SliderDiv>
                  {text? text: children}
                </SliderDiv>
                <CircleContainer>
                    <CircularProgressbar
                        percentage={percentage}
                        text={`${percentage} mins`}
                        styles={style}
                    />
                </CircleContainer>
            </div>
       
    );
}

AnimatedCard.propTypes = {
    percentage: PropTypes.string,
    text: PropTypes.node,
    children: PropTypes.node
};
