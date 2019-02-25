import React from 'react';
import { storiesOf } from '@storybook/react';
import { Heading, Paragraph, Link } from '../components';
import { Typography, Headings, HeadingBox } from './components/Overview';
import { Page, Section } from './components/Page';

storiesOf('Overview', module)
    .add('Typography', () => (
        <Page>
            <Heading type='h1' bold>Overview</Heading>
            <Section>
                <Heading type='h2'>Fonts</Heading>
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
                <Heading type='h2'>Headings</Heading>
                <Paragraph>
                    CheaprEats uses currently only 3 layers of heading from 1 to 3.
                    It is important that headings are used properly to allow for proper HTML formatting.
                    This would help improve SEO, accessibility, and consistency across the application and internet.
                </Paragraph>
                <Headings>
                    <HeadingBox>
                        <Heading type='h1'>H1</Heading>
                        <Paragraph>Heading One</Paragraph>
                    </HeadingBox>
                    <HeadingBox>
                        <Heading type='h2'>H2</Heading>
                        <Paragraph>Heading Two</Paragraph>
                    </HeadingBox>
                    <HeadingBox>
                        <Heading type='h3'>H3</Heading>
                        <Paragraph>Heading Three</Paragraph>
                    </HeadingBox>
                    <HeadingBox>
                        <Heading type='h4'>H4</Heading>
                        <Paragraph>Heading Four</Paragraph>
                    </HeadingBox>
                    <HeadingBox>
                        <Heading type='h5'>H5</Heading>
                        <Paragraph>Heading Five</Paragraph>
                    </HeadingBox>
                    <HeadingBox>
                        <Heading type='h6'>H6</Heading>
                        <Paragraph>Heading Six</Paragraph>
                    </HeadingBox>
                </Headings>
            </Section>

            <Section>
                <Heading type='h2'>Paragraph</Heading>
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