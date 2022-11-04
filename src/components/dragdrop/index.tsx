import { useTheme } from 'next-themes';
import * as React from 'react';
import { BsTrash } from 'react-icons/bs';
import { RiFileAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { SpinnerDotted } from 'spinners-react';
import { styled } from '../../stitches.config';
import { getRandomID, getScript } from '../../utils/api';
import { RENDER_TEXT, WARNING_TEXT } from '../../utils/constants';
import { FileType } from '../../utils/types';
import RectangleButton from '../rectangle_button';

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
    '&.File-Dragging': {
        backgroundColor: '$text',
        color: '$background',
    },
});

const Files = styled('div', {
    marginTop: '2rem',
    padding: '1rem',
    width: 'calc(100% - 2rem)',
    border: '0.15rem solid $text',
    borderRadius: '0.5rem',
});

const AddFile = styled(RiFileAddLine, {
    width: '4rem',
    height: '4rem',
    '@lg': { width: '7.5rem', height: '7.5rem' },
});

const AddFileText = styled('div', {
    fontSize: '1.1rem',
    marginTop: '1rem',
    width: '80%',
    textAlign: 'center',
    '@lg': { fontSize: '1.6rem', marginTop: '1.5rem' },
});

const Trash = styled(BsTrash, {
    cursor: 'pointer',
});

const FileContainer = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
});

const ButtonContainer = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2rem 0 2rem 0.2rem',
    width: '100%',
});

const Margin = styled('div', {
    marginTop: '10rem',
    '@lg': { marginTop: '6.5rem' },
});

export default function DragDrop(): JSX.Element {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [loading, setLoading] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const dragRef = React.useRef<HTMLLabelElement | null>(null);
    const fileRef = React.useRef<HTMLInputElement | any>(null);
    // 추후 다중 파일을 받을 수 있기 때문에 리스트로 구현
    const [file, setFile] = React.useState<FileType[]>([]);

    const onChangeFile = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement> | any): void => {
            let selectedFiles: File[] = [];
            let tempFile: FileType[] = file;

            selectedFiles = e.type === 'change' ? e.target.files : e.dataTransfer.files;
            if (selectedFiles.length > 1) {
                alert(WARNING_TEXT.ADD_MORE_THAN_ONE);
            } else if (
                !selectedFiles[0].type.includes('video/') &&
                !selectedFiles[0].type.includes('audio/')
            ) {
                alert(WARNING_TEXT.FILE_EXTENSION);
            } else {
                tempFile = [
                    {
                        object: selectedFiles[0],
                    },
                ];
            }
            setFile(tempFile);
        },
        [file],
    );

    const handleResetClick = (): void => {
        setFile([]);
        fileRef.current.value = '';
    };

    const handleTransformClick = async () => {
        if (file.length === 0) {
            alert(WARNING_TEXT.NO_FILE);
        } else {
            setLoading(true);
            const randomID = new Date()
                .getTime()
                .toString()
                .concat(getRandomID(1, 100000).toString());
            const data = await getScript(file, randomID);
            const fileType: string = file[0].object.type;

            setFile([]);
            navigate(`/script/${randomID}`, {
                state: { script: data, type: fileType },
            });
        }
        setLoading(false);
    };

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

        if (e.dataTransfer?.files) {
            setIsDragging(true);
        }
    }, []);

    const handleDrop = React.useCallback(
        (e: DragEvent): void => {
            e.preventDefault();
            e.stopPropagation();

            onChangeFile(e);
            setIsDragging(false);
        },
        [onChangeFile],
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

    if (loading) {
        const loadingColor = theme === 'light' ? 'black' : 'white';
        return (
            <>
                <Margin />
                <SpinnerDotted size='35%' color={loadingColor} />
            </>
        );
    }

    return (
        <Container>
            <input
                type='file'
                id='fileUpload'
                style={{ display: 'none' }}
                accept='video/*, audio/*'
                ref={fileRef}
                onChange={(e) => {
                    onChangeFile(e);
                }}
            />
            <Label
                className={isDragging ? 'File-Dragging' : 'File'}
                htmlFor='fileUpload'
                ref={dragRef}
            >
                <AddFile />
                <AddFileText>${RENDER_TEXT.SELECT_FILE}</AddFileText>
            </Label>

            {file.length !== 0 && (
                <Files>
                    <FileContainer>
                        <span>{file[0].object.name}</span>
                        <Trash onClick={handleResetClick} />
                    </FileContainer>
                </Files>
            )}

            <ButtonContainer>
                <RectangleButton
                    text={RENDER_TEXT.BUTTON.TRANSFORM}
                    onClick={() => handleTransformClick()}
                />
                <RectangleButton
                    text={RENDER_TEXT.BUTTON.DELETE}
                    onClick={() => handleResetClick()}
                />
            </ButtonContainer>
        </Container>
    );
}
