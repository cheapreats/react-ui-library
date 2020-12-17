import React from 'react';
import styled from 'styled-components';
import { Heading } from '@Text/Heading';
import { Paragraph } from '@Text/Paragraph';
import { SmallText } from '@Text/SmallText';
import { Card as C, CardProps } from '../Card/Card';

export interface ColorCardProps extends CardProps {
    color: string;
    label: string;
}

interface ColorProps {
    color: string;
}

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    value: string;
}

const getRGBFromHEX = (value: string): string => {
    let hex = value.substring(1);
    if (hex.length === 3) {
        const [r, g, b] = [...hex];
        hex = `${r}${r}${g}${g}${b}${b}`;
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r},${g},${b}`;
};

export const ColorCard: React.FC<ColorCardProps> = ({
    color,
    label,
    ...props
}): React.ReactElement => {
    return (
        <Card {...props}>
            <Color color={color} />
            <div>
                <Title type="h6" bold>
                    {label}
                </Title>
                <Grid>
                    <Label label="HEX" value={color} />
                    <Label label="RGB" value={getRGBFromHEX(color)} />
                </Grid>
            </div>
        </Card>
    );
};

export default ColorCard;

const Label: React.FC<LabelProps> = ({ label, value }): React.ReactElement => (
    <div>
        <SmallText>{label}</SmallText>
        <Paragraph bold>{value}</Paragraph>
    </div>
);

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
`;

const Title = styled(Heading)`
    word-break: break-all;
`;

const Color = styled.div<ColorProps>`
    background-color: ${({ color }): string => color};
    width: 100%;
    height: 100%;
`;

const Card = styled(C)<CardProps>`
    padding: 0 15px 0 0;
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-gap: 15px;
    border-radius: 12px;
    overflow: hidden;
`;
