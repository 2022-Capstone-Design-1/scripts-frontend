import React from 'react';
import { styled } from '../../stitches.config';

const Container = styled('div', {});

export default function Table(props: { script: object }): JSX.Element {
    const { script } = props;
    console.log(script);
    return <Container>Script Page</Container>;
}
