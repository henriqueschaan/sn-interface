import { deletePost } from '../services/posts.service';

interface DeletePostProps {
    postId: number;
    toggleModal: () => void;
}

export function DeletePost({ postId, toggleModal }: DeletePostProps) {

    async function handleDelete() {
        try {
            await deletePost(postId);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao deletar post:', error);
        }
    };

    return (
        <div className="">
            <div className="text-[20px] font-semibold text-center mt-12 lg:text-[25px]">
                Excluir publicação?
            </div>
            <div className="mt-9 text-center text-[15px] font-medium">
                <button onClick={toggleModal} className="mr-5 w-[86px] h-[33px] text-[#F37671] border border-[#F37671] rounded-lg lg:w-[147px]">
                    Cancelar
                </button>
                <button onClick={handleDelete} className="w-[86px] h-[33px] text-white bg-[#F37671] rounded-lg lg:w-[147px]">
                    Confirmar
                </button>
            </div>
        </div>
    );
}
