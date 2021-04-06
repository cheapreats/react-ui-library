import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { MainTheme } from '@Themes/MainTheme';
import { Heading, Paragraph, SmallText, TextLayout } from '../index';

const Main = styled.main`
    max-width: 800px;
`;

const Section = styled.section`
    margin: 15px 0;
`;

const Letters = styled.div`
    margin: 10px 0;
    text-align: center;
    word-break: break-all;
`;

interface IListGridProps {
    columnWidth: number;
    gap?: number;
}

const ListGrid = styled.ul<IListGridProps>`
    list-style-type: none;
    display: grid;
    align-items: end;
    margin: 20px 0;
    padding: 0;
    ${({ columnWidth, gap }) => `
    grid-template-columns: repeat(auto-fill, minmax(${columnWidth}px, 1fr));
    grid-gap: ${gap || 5}px;
    `}
`;

storiesOf('Design System/Typography', module).add(
    'Overview',
    () => (
        <Main>
            <Heading type="h1" bold>
                Typography
            </Heading>

            <Section>
                <Heading type="h2">Fonts</Heading>
                <Paragraph>
                    CheaprEats uses only Quicksand across all applications and
                    systems. Before using our UI components, we highly recommend
                    loading this font-family yourself via{' '}
                    <a href="https://fonts.google.com/specimen/Quicksand">
                        Google Fonts
                    </a>{' '}
                    or with{' '}
                    <a href="https://github.com/typekit/webfontloader">
                        WebFontLoader
                    </a>
                    .
                </Paragraph>
                <Letters>
                    <Paragraph bold>
                        ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzž
                    </Paragraph>
                    <Paragraph bold>
                        {
                            'ĂÂÊÔƠƯăâêôơư1234567890‘?’“!”(%)[#]{@}/&<-+÷×=>®©$€£¥¢:;,.*'
                        }
                    </Paragraph>
                </Letters>
            </Section>

            <Section>
                <Heading type="h2">Headings</Heading>
                <Paragraph>
                    CheaprEats uses currently only 3 layers of heading from 1 to
                    3. It is important that headings are used properly to allow
                    for proper HTML formatting. This would help improve SEO,
                    accessibility, and consistency across the application and
                    internet.
                </Paragraph>
                <ListGrid columnWidth={120}>
                    {Object.entries(MainTheme.font.size)
                        .filter(([key]) => key.match(/^h[1-6]$/))
                        .map(([type, size], index) => (
                            <li key={type}>
                                <Heading type={type}>{type}</Heading>
                                <Paragraph>
                                    Heading
                                    {index + 1}
                                </Paragraph>
                                <SmallText>{size}</SmallText>
                            </li>
                        ))}
                </ListGrid>
            </Section>

            <Section>
                <Heading type="h2">Paragraph</Heading>
                <Paragraph>
                    Paragraphs are different from spans as it has semantic
                    meaning - It indicates the information in that tag is the
                    content of the application. Therefore all text within the
                    application should be encapsulated in it rather than other
                    semanticly meaningless tags such as span and Section.
                </Paragraph>
            </Section>

            <Section>
                <Heading type="h2">Other Font Sizes</Heading>
                <ListGrid columnWidth={120}>
                    {Object.entries(MainTheme.font.size)
                        .filter(([key]) => !key.match(/^h[1-6]$/))
                        .map(([type, size], index) => (
                            <li key={type + index.toString()}>
                                <TextLayout size={type}>{type}</TextLayout>
                                <SmallText>{size}</SmallText>
                            </li>
                        ))}
                </ListGrid>
            </Section>
        </Main>
    ),
    {
        notes: `
        **Fonts**
        Google Fonts: https://fonts.google.com/specimen/Quicksand
        WebFontLoader: https://github.com/typekit/webfontloader
        **Headings**
        Pages should have only one h1 and should never skip (ie, h1 followed by an h6)
        **Paragraph**
        Be generous with line-height, it makes big blocks of text less intimidating and boring
        `,
    },
);
