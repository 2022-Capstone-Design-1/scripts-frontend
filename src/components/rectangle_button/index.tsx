import * as React from 'react';
import { styled } from '../../stitches.config';

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

type rectangleButtonType = {
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function RectangleButton(props: rectangleButtonType): JSX.Element {
    const { text, onClick } = props;
    return (
        <Button aria-hidden='true' onClick={onClick}>
            {text}
        </Button>
    );
}
