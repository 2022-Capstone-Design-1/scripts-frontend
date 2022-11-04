import React from 'react';
import DragDrop from '../../components/dragdrop';
import { styled } from '../../stitches.config';

const Container = styled('div', {
    width: '70%',
    height: 'auto',
    minHeight: 'calc(90vh - 4rem)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10vh 15% 0 15%',
    '@lg': { minHeight: 'calc(90vh - 5rem)', width: '80%', padding: '10vh 10% 0 10%' },
});

export default function Home(): JSX.Element {
    return (
        <Container>
            <DragDrop />
        </Container>
    );
}
