import * as React from 'react';
import { BsTrash } from 'react-icons/bs';
import { RiFileAddLine } from 'react-icons/ri';
import { styled } from '../../stitches.config';

const Container = styled('div', {
    width: '100%',
    height: 'auto',
    minHeight: 'calc(70vh - 4rem)',
    '@lg': { minHeight: 'calc(70vh - 5rem)' },
});

const Label = styled('label', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    minHeight: 'calc(70vh - 4rem)',
    cursor: 'pointer',
    border: '0.15rem solid $text',
    borderRadius: '1rem',
    '@lg': { minHeight: 'calc(85vh - 5rem)' },
    '&.Video-Dragging': {
        backgroundColor: '$text',
        color: '$background',
    },
});

const Videos = styled('div', {
    marginTop: '2rem',
    padding: '1rem',
    width: 'calc(100% - 2rem)',
    border: '0.15rem solid $text',
    borderRadius: '0.5rem',
});

const AddVideo = styled(RiFileAddLine, {
    width: '4rem',
    height: '4rem',
    '@lg': { width: '7.5rem', height: '7.5rem' },
});

const AddVideoText = styled('div', {
    fontSize: '1.1rem',
    marginTop: '1rem',
    width: '80%',
    textAlign: 'center',
    '@lg': { fontSize: '1.6rem', marginTop: '1.5rem' },
});

const Trash = styled(BsTrash, {
    cursor: 'pointer',
});

const VideoContainer = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
});

const ButtonContainer = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2rem 0 2rem 0.1rem',
    width: '100%',
});

const Button = styled('span', {
    height: '4rem',
    // lineHeight: '4rem',
    width: '40%',
    // margin: '0 10%',
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

interface IVideoTypes {
    id: number;
    object: File;
}

export default function DragDrop(): JSX.Element {
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const videoId = React.useRef<number>(0);
    const dragRef = React.useRef<HTMLLabelElement | null>(null);
    const [videos, setVideos] = React.useState<IVideoTypes[]>([]);

    const onChangeVideos = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement> | any): void => {
            let selectedVideos: File[] = [];
            let tempVideos: IVideoTypes[] = videos;

            selectedVideos = e.type === 'change' ? e.target.files : e.dataTransfer.files;

            for (const sv of selectedVideos) {
                let flag = true;
                if (videos.length > 0) {
                    for (const video of videos) {
                        if (video.object.name === sv.name && video.object.size === sv.size) {
                            flag = false;
                            break;
                        }
                    }
                } else flag = true;

                if (flag) {
                    tempVideos = [
                        ...tempVideos,
                        {
                            id: (videoId.current += 1),
                            object: sv,
                        },
                    ];
                }
            }

            setVideos(tempVideos);
        },
        [videos],
    );

    const handleDeleteVideo = React.useCallback(
        (id: number): void => {
            setVideos(videos.filter((video: IVideoTypes) => video.id !== id));
        },
        [videos],
    );

    const handleDragEnter = React.useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragLeave = React.useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
    }, []);

    const handleDragOver = React.useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer!.files) {
            setIsDragging(true);
        }
    }, []);

    const handleDrop = React.useCallback(
        (e: DragEvent): void => {
            e.preventDefault();
            e.stopPropagation();

            onChangeVideos(e);
            setIsDragging(false);
        },
        [onChangeVideos],
    );

    const subscribeDragEvents = React.useCallback((): void => {
        if (dragRef.current !== null) {
            dragRef.current.addEventListener('dragenter', handleDragEnter);
            dragRef.current.addEventListener('dragleave', handleDragLeave);
            dragRef.current.addEventListener('dragover', handleDragOver);
            dragRef.current.addEventListener('drop', handleDrop);
        }
    }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

    const unSubscribeDragEvents = React.useCallback((): void => {
        if (dragRef.current !== null) {
            dragRef.current.removeEventListener('dragenter', handleDragEnter);
            dragRef.current.removeEventListener('dragleave', handleDragLeave);
            dragRef.current.removeEventListener('dragover', handleDragOver);
            dragRef.current.removeEventListener('drop', handleDrop);
        }
    }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

    React.useEffect(() => {
        subscribeDragEvents();
        return () => unSubscribeDragEvents();
    }, [subscribeDragEvents, unSubscribeDragEvents]);

    return (
        <Container>
            <input
                type='file'
                id='videoUpload'
                style={{ display: 'none' }}
                multiple
                accept='video/*'
                onChange={onChangeVideos}
            />
            <Label
                className={isDragging ? 'Video-Dragging' : 'Video'}
                htmlFor='videoUpload'
                ref={dragRef}
            >
                <AddVideo />
                <AddVideoText>Select / Drag & Drop your video to transform</AddVideoText>
            </Label>

            {videos.length !== 0 && (
                <Videos>
                    {videos.map((video: IVideoTypes) => {
                        const {
                            id,
                            object: { name },
                        } = video;

                        return (
                            <VideoContainer key={id}>
                                <span>{name}</span>
                                <Trash onClick={() => handleDeleteVideo(id)} />
                            </VideoContainer>
                        );
                    })}
                </Videos>
            )}

            <ButtonContainer>
                <Button
                    aria-hidden='true'
                    onClick={() => {
                        videos.map((video: IVideoTypes) => console.log(video));
                        // todo:
                        // upload to server
                        // setVideo([]);
                        // response에 따라 page 이동
                        // loading 중 일 때 화면 구현?
                    }}
                >
                    Transform
                </Button>
                <Button
                    aria-hidden='true'
                    onClick={() => {
                        setVideos([]);
                    }}
                >
                    Delete All
                </Button>
            </ButtonContainer>
        </Container>
    );
}
