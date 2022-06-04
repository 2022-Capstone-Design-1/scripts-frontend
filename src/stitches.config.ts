import { createStitches } from '@stitches/react';

export const { styled, getCssText, createTheme, globalCss } = createStitches({
    theme: {
        colors: {
            text: '#FFA42B',
            background: 'white',
        },
    },
    media: {
        sm: '(min-width: 640px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 1024px)',
    },
});

export const orangeTheme = createTheme({
    colors: {
        text: 'white',
        background: '#FFA42B',
    },
});

const GlobalStyles = globalCss({
    body: {
        background: '$background',
        color: '$text',
        margin: '0',
    },
    ul: {
        listStyle: 'none',
        margin: '0',
        padding: '0',
    },
    li: {
        listStyle: 'none',
    },
});

GlobalStyles();
