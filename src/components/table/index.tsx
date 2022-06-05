import React from 'react';
import ReactPlayer from 'react-player';
import { styled } from '../../stitches.config';

const Container = styled('div', {});

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

const indexList = [{ name: 'Whole script' }, { name: 'Script by time' }, { name: 'Search' }];

export default function Table(props: { script: object }): JSX.Element {
    const playerRef = React.useRef<ReactPlayer | any>(null);
    const { script } = props;
    const [tabbedIndex, setTabbedIndex] = React.useState(0);
    const [searchText, setSearchText] = React.useState('');
    const [videoPlaying, setVideoPlaying] = React.useState(false);

    const handleVideoMoveClick = (time: string) => {
        playerRef?.current.seekTo(Number(time), 'seconds');
        setVideoPlaying(true);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const searchTimeByWord = () => {
        return (
            <div>
                {Object.values(Object.values(script)[0]).map((value: string[], index: number) => {
                    if (value[1].includes(searchText)) {
                        return (
                            <li key={value[0]}>
                                <Button
                                    aria-hidden='true'
                                    onClick={() => handleVideoMoveClick(value[0])}
                                >
                                    {value[0]}
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
            <div>
                {Object.values(Object.values(script)[0]).map((value: string[], index: number) => {
                    return value[1];
                })}
            </div>
        );
    };

    const renderTimeTable = () => {
        return (
            <ul>
                {Object.values(Object.values(script)[0]).map((value: string[], index: number) => {
                    return (
                        <li key={value[0]}>
                            <Button
                                aria-hidden='true'
                                onClick={() => handleVideoMoveClick(value[0])}
                            >
                                {value[0]}
                            </Button>
                            <span> : {value[1]}</span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderSearch = () => {
        return <input type='text' onChange={(e) => handleSearchChange(e)} />;
    };

    const renderByIndex = () => {
        switch (tabbedIndex) {
            case 0:
                return renderWholeScript();
            case 1:
                return renderTimeTable();
            case 2:
                return (
                    <div>
                        {renderSearch()} {searchTimeByWord()}
                    </div>
                );
            default:
                return renderWholeScript();
        }
    };

    if (!script) {
        return <div>There is no transformed script</div>;
    }

    // console.log(videoPlaying);
    return (
        <Container>
            <ReactPlayer
                url='https://www.youtube.com/watch?v=9Edmy40n7OM&ab_channel=%EC%A7%84%EC%9A%A9%EC%A7%84'
                // url='http://ec2-52-79-250-218.ap-northeast-2.compute.amazonaws.com/10213288-a6ab-466f-a6d6-f3eeffcb9596'
                ref={playerRef}
                playing={videoPlaying}
            />
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
            {renderByIndex()}
        </Container>
    );
}
