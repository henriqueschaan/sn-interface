import loading from '../assets/loading.svg';

export function Loading() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-[#F37671]">
            <div className="animate-spin">
                <img src={loading} alt="" />
            </div>
            <p className="text-white h-[50px] mt-[24px] text-2xl font-bold">Carregando...</p>
        </div>
    )
}