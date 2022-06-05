import React from 'react';
import ReactPlayer from 'react-player';
import { styled } from '../../stitches.config';

const VideoContainer = styled('div', {
    position: 'relative',
    paddingTop: '56.25%',
    '@lg': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100',
        marginRight: '5%',
        paddingLeft: '64%',
        paddingTop: '36%',
    },
});

const AudioContainer = styled('div', {
    '@lg': {},
});

const AudioScriptContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '1rem 0',
});

const ScriptContainer = styled(AudioScriptContainer, {
    '@lg': {
        padding: '0',
        width: '30%',
    },
});

const TabContainer = styled('div', {
    fontSize: '1rem',
    borderTop: '0.2rem solid $text',
    padding: '0.5rem 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    '@lg': {
        fontSize: '1.1rem',
        borderTop: '0.3rem solid $text',
    },
});

const AudioScriptContent = styled('div', {
    borderTop: '0.2rem solid $text',
    borderBottom: '0.2rem solid $text',
    minHeight: 'calc(97vh - 15rem)',
    overflow: 'auto',
    padding: '0.5rem',
    fontSize: '0.9rem',
    '@lg': {
        borderTop: '0.3rem solid $text',
        borderBottom: '0.3rem solid $text',
        fontSize: '1rem',
        minHeight: 'calc(97vh - 17rem)',
    },
});

const ScriptContent = styled(AudioScriptContent, {
    minHeight: 'calc(60vh - 8rem)',
    '@lg': {
        minHeight: 'calc(80vh - 10rem)',
    },
});

const Button = styled('span', {
    cursor: 'pointer',
    '&:hover': {
        fontWeight: 'bold',
    },
    '&.Clicked': {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

const SearchBar = styled('input', {
    width: 'calc(100% - 0.5rem)',
    height: '1.5rem',
    fontSize: '0.9rem',
    border: '0.2rem solid $text',
    color: '$text',
    backgroundColor: '$background',
    marginBottom: '0.55rem',
    padding: '0 0.2rem',
    '&::placeholder': {
        color: '$text',
        opacity: '0.8',
    },
});

const indexList = [{ name: 'Whole script' }, { name: 'Script by time' }, { name: 'Search' }];

export default function Script(props: { data: object }): JSX.Element {
    const playerRef = React.useRef<ReactPlayer | any>(null);
    const elementRef = React.useRef<HTMLElement | any>(null);
    const { data } = props;
    const [tabbedIndex, setTabbedIndex] = React.useState(0);
    const [searchText, setSearchText] = React.useState('');
    const [videoPlaying, setVideoPlaying] = React.useState(false);
    const isVideo = Object.values(data)[1].includes('video/');
    const script = Object.values(Object.values(data)[0].script);
    const srcAddress = Object.values(data)[0].srcAddress;

    const handleVideoMoveClick = (time: string) => {
        playerRef?.current.seekTo(Number(time), 'seconds');
        setVideoPlaying(true);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const renderSearch = () => {
        return (
            <div>
                <SearchBar
                    type='text'
                    placeholder='Type words to find'
                    onChange={(e) => handleSearchChange(e)}
                />
                {script.map((value: string[], index: number) => {
                    if (value[1].includes(searchText)) {
                        return (
                            <li key={value[0]}>
                                <Button
                                    aria-hidden='true'
                                    onClick={() => handleVideoMoveClick(value[0])}
                                >
                                    [{value[0]}s]
                                </Button>
                                <span> : {value[1]}</span>
                            </li>
                        );
                    }
                })}
            </div>
        );
    };

    const renderWholeScript = () => {
        return (
            <span>
                {script.map((value: string[], index: number) => {
                    return value[1].concat(' ');
                })}
            </span>
        );
    };

    const renderTimeTable = () => {
        return (
            <ul>
                {script.map((value: string[], index: number) => {
                    return (
                        <li key={value[0]}>
                            <Button
                                aria-hidden='true'
                                onClick={() => handleVideoMoveClick(value[0])}
                            >
                                [{value[0]}s]
                            </Button>
                            <span> : {value[1]}</span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderByIndex = () => {
        switch (tabbedIndex) {
            case 0:
                return renderWholeScript();
            case 1:
                return renderTimeTable();
            case 2:
                return renderSearch();
            default:
                return renderWholeScript();
        }
    };

    const renderScriptContent = () => {
        return (
            <>
                <TabContainer>
                    {indexList.map((item, index: number) => {
                        return tabbedIndex === index ? (
                            <Button
                                className='Clicked'
                                onClick={() => setTabbedIndex(index)}
                                key={item.name}
                            >
                                {item.name}
                            </Button>
                        ) : (
                            <Button onClick={() => setTabbedIndex(index)} key={item.name}>
                                {item.name}
                            </Button>
                        );
                    })}
                </TabContainer>
                {isVideo ? (
                    <ScriptContent>{renderByIndex()}</ScriptContent>
                ) : (
                    <AudioScriptContent>{renderByIndex()}</AudioScriptContent>
                )}
            </>
        );
    };

    const renderPlayerContainer = () => {
        return isVideo ? (
            <VideoContainer ref={elementRef}>
                <ReactPlayer
                    url={srcAddress}
                    // url='https://www.youtube.com/watch?v=9Edmy40n7OM&ab_channel=%EC%A7%84%EC%9A%A9%EC%A7%84'
                    ref={playerRef}
                    playing={videoPlaying}
                    controls
                    width='100%'
                    height='100%'
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                    }}
                />
            </VideoContainer>
        ) : (
            <AudioContainer>
                <ReactPlayer
                    url={srcAddress}
                    ref={playerRef}
                    playing={videoPlaying}
                    controls
                    width='100%'
                    height='4rem'
                />
            </AudioContainer>
        );
    };

    if (!data) {
        return <div>There is no transformed script</div>;
    }

    return (
        <>
            {renderPlayerContainer()}
            {isVideo ? (
                <ScriptContainer>{renderScriptContent()}</ScriptContainer>
            ) : (
                <AudioScriptContainer>{renderScriptContent()}</AudioScriptContainer>
            )}
        </>
    );
}
