import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { styled } from '../../stitches.config';
import Table from '../../components/table';

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

export default function Script(): JSX.Element {
    const params = useParams();
    const script: any = useLocation().state;
    console.log('script', script);
    console.log(params);

    return <Container>{script ? <Table script={script} /> : <div>1</div>}</Container>;
}
