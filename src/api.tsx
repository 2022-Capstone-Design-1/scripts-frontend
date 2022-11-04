import { API_END_POINT } from './url';
import { FileType } from './utils/types';

export const getRandomID = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min) + min);

const uploadFile = async (formData: FormData, url: string) => {
    const options = {
        method: 'POST',
        body: formData,
    };

    const res = await fetch(API_END_POINT + url, options);
    const data = await res.json();

    if (res.ok) {
        console.log(data);
    } else {
        throw new Error(data);
    }
};

const inferenceFile = async (id: string, url: string) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
    };

    const res = await fetch(API_END_POINT + url, options);
    const resData = await res.json();

    if (res.ok) {
        return resData;
    }
    throw new Error(resData);
};

export const getScript = async (file: FileType[], id: string) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', file[0].object);
    const type = file[0].object.type.includes('video/') ? ['video', 'Video'] : ['audio', 'Audio'];

    await uploadFile(formData, `/${type[0]}/post${type[1]}`);
    const data = await inferenceFile(id, `/${type[0]}/inferenceAudio`);

    return JSON.parse(data);
};
