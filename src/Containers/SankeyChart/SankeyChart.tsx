import React, {
    useRef,
    useState,
    useLayoutEffect,
    useCallback,
    useMemo,
} from 'react';
import { Sankey, Rectangle } from 'recharts';
import styled from 'styled-components';
import Theme from '../../Themes/ThemeTemplate';

const LEGEND_CONTAINER_WIDTH = 200;
const LEGEND_CONTAINER_HEIGHT = 100;
const INITIAL_LEGEND_HEIGHT_OFFSET = 10;
const LINK_COLOR = '#77c878';
const NODE_COLOR = '#0088fe';
const NODE_OPACITY = 0.8;

interface IMargin {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

interface ISankeyChartOptionalProperties {
    nodePadding?: number;
    margin?: Partial<IMargin>;
    nodeColor?: string;
    linkColor?: string;
}

export interface ISankeyChartProps extends ISankeyChartOptionalProperties {
    width: number;
    height: number;
    data: any;
}

export const SankeyChart: React.FC<ISankeyChartProps> = ({
    nodePadding,
    margin,
    nodeColor = NODE_COLOR,
    linkColor = LINK_COLOR,
    ...props
}): React.ReactElement => {
    /**
     * checks for not undefined properties and sets an object with those not undefined properties
     * @returns {ISankeyChartOptionalProperties} the properties
     */
    const getOptionalProperties = () => {
        const properties: ISankeyChartOptionalProperties = {};
        if (nodePadding) properties.nodePadding = nodePadding;
        if (margin) properties.margin = margin;
        return properties;
    };

    /**
     * the react component which serves as custom node
     */
    const MyCustomNode = useCallback(
        ({ payload, ...rest }: any): React.ReactElement<SVGElement> => {
            const [heightOffset, setHeightOffset] = useState<number>();

            const legendRef = useRef<HTMLDivElement>(null);

            /**
             * renders the legend of the node based on its name and value
             */
            const renderLegend = useCallback(
                (name: string, value: string) => (
                    <Container ref={legendRef}>
                        <Span>{name}</Span>
                        <br />
                        <Span>{value}</Span>
                    </Container>
                ),
                [],
            );

            useLayoutEffect(() => {
                setHeightOffset(legendRef.current?.clientHeight);
            }, []);

            /**
             * the x position for the top left corner of the container of the node legend, based on x property and dx,
             * which is the node width
             */
            const legendXPosition = useMemo(
                (): number => rest.x + payload.dx,
                [rest.x, payload.dx],
            );

            /**
             * gets the y position for the top left corner of the container of the node legend, based on y property, dy (which
             * is the height of the node) and heighOffset, which is the height of the legend itself
             */
            const legendYPosition = useMemo(
                (): number =>
                    rest.y +
                    payload.dy / 2 -
                    (heightOffset
                        ? heightOffset / 2
                        : INITIAL_LEGEND_HEIGHT_OFFSET),
                [rest.y, payload.dy, heightOffset],
            );

            return (
                <svg>
                    <Rectangle
                        className="recharts-sankey-node"
                        fill={nodeColor}
                        fillOpacity={NODE_OPACITY}
                        payload={payload}
                        {...rest}
                    />
                    <Translate x={legendXPosition} y={legendYPosition}>
                        <foreignObject
                            width={LEGEND_CONTAINER_WIDTH}
                            height={LEGEND_CONTAINER_HEIGHT}
                        >
                            {renderLegend(payload.name, payload.value)}
                        </foreignObject>
                    </Translate>
                </svg>
            );
        },
        [nodeColor],
    );

    return (
        <Sankey
            node={<MyCustomNode />}
            link={{ stroke: linkColor }}
            {...getOptionalProperties()}
            {...props}
        />
    );
};

interface ITranslateProps {
    x: number;
    y: number;
    children: React.ReactElement<SVGElement>;
}

/**
 * it's a wrapper for a svg element to position it on x and y property values
 * @param props {ITranslateProps} - the props passed to the component
 * @returns {React.ReactElement<SVGElement>} the positioned svg element
 */
const Translate = ({
    x = 0,
    y = 0,
    children,
}: ITranslateProps): React.ReactElement<SVGElement> => {
    if (!x && !y) return children;
    return <g transform={`translate(${x},${y})`}>{children}</g>;
};

const Span = styled.span`
    white-space: nowrap;
`;
const Container = styled.div`
    font-weight: 700;
    font-size: ${Theme.font.size.small};
    margin-left: 5px;
`;

/**
 * this is how a custom link will be made
 */
// const MyCustomLink = ({sourceX,sourceY,sourceControlX,targetControlX,targetY,targetX,payload,linkWidth,...props}:any) => {
//     console.log('props',props)
//     return (
//         <path
//             d={`
//                 M${sourceX},${sourceY}
//                 C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
//             `}
//             stroke={payload.color}
//             strokeWidth={linkWidth}
//             fill='none'
//             {...props}
//         />
//     )
// }
