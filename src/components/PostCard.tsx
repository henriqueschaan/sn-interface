import { ImgHandler } from "./ImgHandler";
import { PostData } from "../interfaces/Post";
import { Link } from "react-router-dom";
import { useState } from "react";
import LikeButton from "./LikeButton";
import errorPic from '../assets/errorPic.png';
import genPic from '../assets/genPic.png';
import dots from '../assets/dots.svg';

export function PostCard({
    description,
    createdAt,
    picLink,
    userPicLink,
    username,
    likesCount,
    id,
    userId,
    onEditClick,
    onDeleteClick,
    onLoad
}: PostData & { onEditClick: (postId: number) => void } & { onDeleteClick: (postId: number) => void } & { onLoad: () => void }) {
    const activeUserId = localStorage.getItem('userId');
    const [isPostSettingsOpen, setIsPostSettingsOpen] = useState(false);

    function toggleSettingsMenu() {
        setIsPostSettingsOpen(prev => !prev);
    }

    function timeAgo(dateString: string): string {
        const date: Date = new Date(dateString);
        const now: Date = new Date();
        const differenceInMilliseconds: number = now.getTime() - date.getTime();
        const seconds: number = Math.floor(differenceInMilliseconds / 1000);
        const minutes: number = Math.floor(seconds / 60);
        const hours: number = Math.floor(minutes / 60);
        const days: number = Math.floor(hours / 24);

        if (days > 0) {
            return `há ${days} dia${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `há ${hours} h`;
        } else if (minutes > 0) {
            return `há ${minutes} min`;
        } else {
            return 'agora mesmo';
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg border w-full lg:p-[30px]" style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.15)' }}>
            <div className="flex justify-between items-center mb-[10px] lg:mb-5">
                <div className="flex items-center">
                    <Link to={`/${username}`}>
                        <ImgHandler src={userPicLink} alt="User" fallbackSrc={genPic} className="w-8 h-8 rounded-full object-cover lg:w-[74px] lg:h-[74px]" />
                    </Link>
                    <div className="ml-2 lg:ml-[30px]">
                        <Link to={`/${username}`}>
                            <p className="text-[12px] text-[#8E8E8E] lg:text-[25px]">@{username}</p>
                        </Link>
                        <p className="text-[10px] text-[#8E8E8E] lg:text-[20px]">{timeAgo(createdAt)}</p>
                    </div>
                </div>
                {(Number(activeUserId) === userId) &&
                    <button onClick={toggleSettingsMenu} className="relative self-start">
                        <img src={dots} className="h-[13px] mr-[1.5px] lg:h-[23px] lg:mr-1" />
                        {isPostSettingsOpen &&
                            <div className="absolute -top-[5.5px] right-[7px] bg-white w-[82px] h-[68px] flex flex-col justify-center font-medium rounded-lg shadow-custom2 lg:right-[14px] lg:w-[105px] lg:h-[90px]">
                                <div className="flex flex-col gap-2 text-[#F47E7A] text-[12px] lg:text-[20px]">
                                    <button onClick={() => onEditClick(id)}>Editar</button>
                                    <button onClick={() => onDeleteClick(id)}>Excluir</button>
                                </div>
                            </div>
                        }
                    </button>
                }
            </div>
            <p className="text-[12px] text-[#8E8E8E] mb-3 lg:text-[20px] lg:mb-5">{description}</p>
            <ImgHandler src={picLink} alt="Post" fallbackSrc={errorPic} className="max-h-60 max-w-full object-cover rounded-[8.5px] mb-2 mx-auto lg:max-h-none lg:mb-6" onLoad={onLoad} />
            <div className="flex items-center">
                <LikeButton initialCount={likesCount} postId={id} />
            </div>
        </div>
    );

};