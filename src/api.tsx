import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url } from './url';

interface IFileTypes {
    object: File;
}

export const getRandomID = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

const customAxios = axios.create({
    baseURL: `${url}`,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

async function inferenceFile(randomID: string, type: string[]): Promise<any> {
    // const navigate = useNavigate();
    try {
        const response = await customAxios.post(`/${type[0]}/inferenceAudio`, { id: randomID });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        // navigate('/');
    }
}

export async function uploadFile(file: IFileTypes[], randomID: string): Promise<any> {
    const formData = new FormData();
    formData.append('id', randomID);
    formData.append('file', file[0].object);
    const type = file[0].object.type.includes('video/') ? ['video', 'Video'] : ['audio', 'Audio'];
    try {
        const response = await customAxios.post(`/${type[0]}/post${type[1]}`, formData);
        console.log(response);
        return await inferenceFile(randomID, type);
    } catch (error) {
        console.log(error);
    }
}
