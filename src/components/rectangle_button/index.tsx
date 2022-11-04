import * as React from 'react';
import { styled } from '../../stitches.config';
import { RectangleButtonType } from '../../utils/types';

const Button = styled('span', {
    height: '4rem',
    width: '40%',
    border: '0.15rem solid $text',
    borderRadius: '0.2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '$text',
        color: '$background',
    },
});

export default function RectangleButton(props: RectangleButtonType): JSX.Element {
    const { text, onClick } = props;
    return (
        <Button aria-hidden='true' onClick={onClick}>
            {text}
        </Button>
    );
}
