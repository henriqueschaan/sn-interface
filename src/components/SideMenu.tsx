import { UserProfile } from '../interfaces/User';
import { useEffect, useState } from 'react';
import { fetchProfile } from '../services/users.service';
import { ImgHandler } from './ImgHandler';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import back from '../assets/back.svg';
import homeLogo from '../assets/homeLogo.png';
import homeIcon from '../assets/homeIcon.svg';
import friendsIcon from '../assets/friendsIcon.svg';
import settingsIcon from '../assets/settingsIcon.svg';
import createIcon from '../assets/createIcon.svg';
import genPic from '../assets/genPic.png';

interface SideMenuProps {
    scrollContainerRef: React.RefObject<HTMLDivElement>;
    handleFriendsClick: () => void;
    handleCreatePostClick: () => void;
}

export function SideMenu({ scrollContainerRef, handleFriendsClick, handleCreatePostClick }: SideMenuProps) {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const navigate = useNavigate();
    const location = useLocation();


    async function getPic() {
        const data = username && await fetchProfile(username, userId);
        setProfile(data);
    }

    useEffect(() => {
        getPic();
    }, [username]);

    const handleScrollToTop = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex mt-14">
                <button onClick={() => navigate(-1)} className="ml-9 mr-6">
                    <img src={back} alt="voltar" className="object-none" />
                </button>
                <img src={homeLogo} alt="logo" className="w-[187px]" />
            </div>
            <div className="flex flex-col mt-20 ml-20 gap-9">
                {location.pathname === '/feed' ?
                    <button onClick={handleScrollToTop} className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                        <div className="w-[85px] h-full flex items-center justify-center">
                            <img src={homeIcon} alt="" className="" />
                        </div>
                        Feed
                    </button>
                    :
                    <Link to="/feed">
                        <div className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                            <div className="w-[85px] h-full flex items-center justify-center">
                                <img src={homeIcon} alt="" className="" />
                            </div>
                            Feed
                        </div>
                    </Link>
                }
                <button onClick={handleFriendsClick}>
                    <div className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                        <div className="w-[85px] h-full flex items-center justify-center">
                            <img src={friendsIcon} alt="" className="" />
                        </div>
                        Amigos
                    </div>
                </button>
                {location.pathname === `/${username}` ?
                    <button onClick={handleScrollToTop} className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                        <div className="w-[85px] h-full flex items-center justify-center">
                            <ImgHandler src={profile ? profile.user.picLink : ''} alt={profile?.user.name} fallbackSrc={genPic} className="w-11 h-11 rounded-[32px] object-cover" />
                        </div>
                        Perfil
                    </button>
                    :
                    <Link to={`/${username}`}>
                        <div className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                            <div className="w-[85px] h-full flex items-center justify-center">
                                <ImgHandler src={profile ? profile.user.picLink : ''} alt={profile?.user.name} fallbackSrc={genPic} className="w-11 h-11 rounded-[32px] object-cover" />
                            </div>
                            Perfil
                        </div>
                    </Link>
                }
                <Link to={"/settings"}>
                    <div className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                        <div className="w-[85px] h-full flex items-center justify-center">
                            <img src={settingsIcon} alt="" className="" />
                        </div>
                        Configurações
                    </div>
                </Link>
                <button onClick={handleCreatePostClick}>
                    <div className="w-[253px] h-[91px] border rounded-[15px] flex items-center text-xl text-[#8E8E8E]">
                        <div className="w-[85px] h-full flex items-center justify-center">
                            <img src={createIcon} alt="" className="" />
                        </div>
                        Criar
                    </div>
                </button>
            </div>
        </div >
    )
}