import { useState, useEffect } from 'react';
import { API } from '../services/api';
import like3 from '../assets/vermelho.png';
import like2 from '../assets/preto.png';

interface LikeButtonProps {
    initialCount: number;
    postId: number;
}

function LikeButton({ initialCount, postId }: LikeButtonProps) {
    const [likesCount, setLikesCount] = useState(initialCount);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showSecondSVG, setShowSecondSVG] = useState(false);

    const handleLikeClick = async () => {
        try {
            await API.post(`/posts/${postId}/like`);
            setLikesCount(likesCount + 1);
            setIsTransitioning(true);
        } catch (error) {
            console.error("Erro ao curtir o post:", error);
        }
    };

    useEffect(() => {
        if (isTransitioning) {
            setShowSecondSVG(true);
            const timer1 = setTimeout(() => setShowSecondSVG(false), 1000);
            const timer2 = setTimeout(() => setIsTransitioning(false), 1000);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [isTransitioning]);

    return (
        <div className="flex text-[#8E8E8E] text-[10px] items-center lg:text-[20px]">
            <button 
                onClick={handleLikeClick} 
                className="mr-3 w-5 h-5 lg:mr-6 lg:w-7 lg:h-7"
            >
                <div className="relative w-5 h-5 lg:w-7 lg:h-7">
                    <img 
                        src={like2} 
                        alt="" 
                        className={`absolute h-5 lg:h-7 ${showSecondSVG ? 'transition-opacity duration-500 ease-in-out opacity-0' : 'transition-opacity duration-500 ease-in-out opacity-100'}`}
                    />
                    <img 
                        src={like3} 
                        alt="" 
                        className={`absolute h-5 lg:h-7 ${showSecondSVG ? 'transition-opacity duration-500 ease-in-out opacity-100' : 'transition-opacity duration-500 ease-in-out opacity-0'}`}
                    />
                </div>
            </button>
            {likesCount} curtidas
        </div>
    );
}

export default LikeButton;

