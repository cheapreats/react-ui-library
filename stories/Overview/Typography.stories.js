import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { MainTheme } from '../../src/Themes/MainTheme';
import { Heading, Paragraph, SmallText, Card } from '../../src';

const Section = ({ children }) => (
    <>
        <section style={{ margin: '15px 0' }}>{children}</section> <hr />
    </>
);

const Letters = ({ children }) => (
    <div
        style={{
            margin: '10px 0',
            textAlign: 'center',
            wordBreak: 'break-all',
        }}
    >
        {children}
    </div>
);

const ListGrid = ({ children, columnWidth, gap }) => (
    <ul
        style={{
            listStyleType: 'none',
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${columnWidth}px, 1fr)`,
            alignItems: 'end',
            gridGap: `${gap || 5}px`,
            margin: '20px 0',
            padding: 0,
        }}
    >
        {children}
    </ul>
);

const Color = ({ children, color }) => (
    <Card>
        {children}
        <div
            style={{
                backgroundColor: color,
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                margin: '10px auto',
            }}
        ></div>
    </Card>
);

const flattenColors = (key, value, label) => (
    <Fragment key={label}>
        {Object.entries(value).map(([innerKey, value]) =>
            typeof value === 'object' ? (
                flattenColors(innerKey, value, `${label}.${innerKey}`)
            ) : (
                <Color key={`${label}.${innerKey}`} color={value}>
                    {`${label}.${innerKey}`}: {value}
                </Color>
            ),
        )}
    </Fragment>
);

storiesOf('Overview', module)
    .add(
        'Typography',
        () => (
            <main style={{ maxWidth: '800px' }}>
                <Heading type="h1" bold>
                    Typography
                </Heading>

                <Section>
                    <Heading type="h2">Fonts</Heading>
                    <Paragraph>
                        CheaprEats uses only Quicksand across all applications
                        and systems. Before using our UI components, we highly
                        recommend loading this font-family yourself via{' '}
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
                            {
                                'ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzž'
                            }
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
                        CheaprEats uses currently only 3 layers of heading from
                        1 to 3. It is important that headings are used properly
                        to allow for proper HTML formatting. This would help
                        improve SEO, accessibility, and consistency across the
                        application and internet.
                    </Paragraph>
                    <ListGrid columnWidth={120}>
                        {Object.keys(MainTheme.font.size)
                            .filter(key => key.match(/^h\d$/))
                            .map((type, index) => (
                                <li key={type}>
                                    <Heading type={type}>H{index + 1}</Heading>
                                    <Paragraph>Heading {index + 1}</Paragraph>
                                </li>
                            ))}
                    </ListGrid>
                </Section>

                <Section>
                    <Heading type="h2">Paragraph</Heading>
                    <Paragraph>
                        Paragraphs are different from spans as it has semantic
                        meaning - It indicates the information in that tag is
                        the content of the application. Therefore all text
                        within the application should be encapsulated in it
                        rather than other semanticly meaningless tags such as
                        span and Section.
                    </Paragraph>
                </Section>

                <Section>
                    <Heading type="h2">SmallText</Heading>
                    <SmallText>Insert SmallText Description here</SmallText>
                </Section>
            </main>
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
    )
    .add('Colors', () => (
        <div style={{ maxWidth: '800px' }}>
            <Heading type="h1" bold>
                Colors
            </Heading>

            <Heading type="h2">Main Theme</Heading>
            <ListGrid columnWidth={200} gap={15}>
                {Object.entries(MainTheme.colors).map(([key, value]) =>
                    typeof value === 'object' ? (
                        flattenColors(key, value, key)
                    ) : (
                        <Color key={key} color={value}>
                            {key}: {value}
                        </Color>
                    ),
                )}
            </ListGrid>
        </div>
    ));
