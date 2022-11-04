import React from 'react';
import { NavigateOptions, useLocation } from 'react-router-dom';
import ScriptContent from '../../components/script';
import { styled } from '../../stitches.config';
import { TYPE_CHECK } from '../../utils/constants';

const VideoContainer = styled('div', {
    width: '90%',
    minHeight: 'calc(97vh - 4rem)',
    display: 'flex',
    flexDirection: 'column',
    padding: '3vh 5% 0 5%',
    '@lg': {
        minHeight: 'calc(80vh - 5rem)',
        width: '90%',
        padding: '10vh 5% 10vh 5%',
        flexDirection: 'row',
    },
});

const AudioContainer = styled('div', {
    width: '90%',
    minHeight: 'calc(97vh - 4rem)',
    display: 'flex',
    flexDirection: 'column',
    padding: '3vh 5% 0 5%',
    '@lg': {
        minHeight: 'calc(97vh - 5rem)',
        flexDirection: 'column',
    },
});

export default function Script(): JSX.Element {
    const data: NavigateOptions['state'] = useLocation().state;
    if (data.type.includes(TYPE_CHECK.VIDEO)) {
        return (
            <VideoContainer>
                <ScriptContent data={data} />
            </VideoContainer>
        );
    }
    return (
        <AudioContainer>
            <ScriptContent data={data} />
        </AudioContainer>
    );
}
