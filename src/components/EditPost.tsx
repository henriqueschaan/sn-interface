import { useState, useEffect } from 'react';
import { updatePost } from '../services/posts.service';
import { API } from '../services/api';
import close from '../assets/close.png';

interface EditPostProps {
    postId: number;
    toggleModal: () => void;
}

export function EditPost({ postId, toggleModal }: EditPostProps) {
    const [picLink, setPicLink] = useState('');
    const [description, setDescription] = useState('');
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await API.get(`/posts/${postId}`);
                const postData = response.data;
                setPicLink(postData.picLink);
                setDescription(postData.description);
            } catch (error) {
                console.error('Erro ao buscar post:', error);
            }
        }

        fetchPost();
    }, [postId]);

    async function handleUpdate() {
        try {
            await updatePost(postId, {
                picLink,
                description,
            });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar post:', error);
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-[580px] lg:max-w-full lg:self-stretch">
            <div className="flex justify-between items-center px-[30px] min-h-[77px]">
                <div className="flex items-center">
                    <button onClick={toggleModal}>
                        <img src={close} alt="" />
                    </button>
                    <h1 className="text-[20px] font-semibold ml-[28px]">Editar publicação</h1>
                </div>
                <button onClick={handleUpdate} className="text-[15px] underline font-bold text-[#F37671]">
                    Salvar
                </button>
            </div>
            <div className="flex flex-col flex-grow">
                    <div className="flex justify-center">
                        <img src={picLink} alt="" className="max-w-full max-h-[650px] object-cover lg:max-h-[430px]" />
                    </div>
                    <textarea
                        placeholder="Escreva uma legenda..."
                        value={description}
                        onChange={(e) => {setDescription(e.target.value); setCharCount(e.target.value.length);}}
                        className="px-9 py-7 w-full focus:outline-none text-[15px] flex-grow resize-none"
                        maxLength={200}
                    />
                    <div className="text-right pr-4 py-2">
                        <span className={`${charCount > 180 ? 'text-red-500' : ''}`}>{charCount}/200</span>
                    </div>
                </div>
        </div>
    );
}
