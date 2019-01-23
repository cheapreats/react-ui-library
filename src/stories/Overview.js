import React from 'react';
import { storiesOf } from '@storybook/react';
import { HeadingOne, HeadingTwo, HeadingThree, HeadingFour, HeadingFive, Paragraph, Link } from '../components';
import { Typography, Headings, Heading } from './components/Overview';
import { Page, Section } from './components/Page';

storiesOf('Overview', module)
    .add('Typography', () => (
        <Page>
            <HeadingOne bold>Overview</HeadingOne>
            <Section>
                <HeadingTwo>Fonts</HeadingTwo>
                <Paragraph>
                    CheaprEats uses only Quicksand across all applications and systems.
                    Before using our UI components, we highly recommend loading this font-family
                    yourself via <Link href='https://fonts.google.com/specimen/Quicksand'>Google Fonts</Link> or
                    with <Link href='https://github.com/typekit/webfontloader'>WebFontLoader</Link>.
                </Paragraph>
                <Typography>
                    { 'ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzžĂÂÊÔƠƯăâêôơư1234567890‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*' }
                </Typography>
            </Section>
            <Section>
                <HeadingTwo>Headings</HeadingTwo>
                <Paragraph>
                    CheaprEats uses currently only 3 layers of heading from 1 to 3.
                    It is important that headings are used properly to allow for proper HTML formatting.
                    This would help improve SEO, accessibility, and consistency across the application and internet.
                </Paragraph>
                <Headings>
                    <Heading>
                        <HeadingOne>H1</HeadingOne>
                        <Paragraph>Heading One</Paragraph>
                    </Heading>
                    <Heading>
                        <HeadingTwo>H2</HeadingTwo>
                        <Paragraph>Heading Two</Paragraph>
                    </Heading>
                    <Heading>
                        <HeadingThree>H3</HeadingThree>
                        <Paragraph>Heading Three</Paragraph>
                    </Heading>
                    <Heading>
                        <HeadingFour>H4</HeadingFour>
                        <Paragraph>Heading Four</Paragraph>
                    </Heading>
                    <Heading>
                        <HeadingFive>H5</HeadingFive>
                        <Paragraph>Heading Five</Paragraph>
                    </Heading>
                </Headings>
            </Section>

            <Section>
                <HeadingTwo>Paragraph</HeadingTwo>
                <Paragraph>
                    Paragraphs are different from spans as it has semantic meaning - It indicates the information
                    in that tag is the content of the application. Therefore all text within the application should
                    be encapsulated in it rather than other semanticly meaningless tags such as span and div.
                </Paragraph>
            </Section>
        </Page>
    ), {
        notes: `
        **Fonts**
        Google Fonts: https://fonts.google.com/specimen/Quicksand
        WebFontLoader: https://github.com/typekit/webfontloader

        **Headings**
        Pages should have only one h1 and should never skip (ie, h1 followed by an h6)


        **Paragraph**
        Be generous with line-height, it makes big blocks of text less intimidating and boring
        `
    });