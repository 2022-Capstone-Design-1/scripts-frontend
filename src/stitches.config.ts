import { createStitches } from '@stitches/react';

export const { styled, getCssText, createTheme, globalCss } = createStitches({
    theme: {
        colors: {
            text: '#000000',
            background: 'white',
        },
    },
    media: {
        sm: '(min-width: 640px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 1024px)',
    },
});

export const darkTheme = createTheme({
    colors: {
        text: 'white',
        background: '#000000',
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
    // '*': {
    //     boxSizing: 'border-box',
    // },
});

GlobalStyles();
