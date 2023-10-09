import { Link } from 'react-router-dom';
import { UserProfile } from '../interfaces/User';
import { useEffect, useState } from 'react';
import { fetchProfile } from '../services/users.service';
import { ImgHandler } from './ImgHandler';
import genPic from '../assets/genPic.png';
import homeIcon from '../assets/homeIcon.svg';
import friendsIcon from '../assets/friendsIcon.svg';
import createIcon from '../assets/createIcon.svg';
import settingsIcon from '../assets/settingsIcon.svg';

interface FeedMenuProps {
    scrollContainerRef: React.RefObject<HTMLDivElement>;
    handleFriendsClick: () => void;
    handleCreatePostClick: () => void;
}

export function FeedMenu({ scrollContainerRef, handleFriendsClick, handleCreatePostClick }: FeedMenuProps) {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const [profile, setProfile] = useState<UserProfile | null>(null);


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
        <div className="flex w-full min-h-[77px] items-center justify-center gap-12 border-t border-[#A09F9F] border-opacity-40 shadow-custom3">
            <button onClick={handleScrollToTop}>
                <img src={homeIcon} alt="" className="w-[21px]" />
            </button>
            <button onClick={handleFriendsClick}>
                <img src={friendsIcon} alt="" className="w-[29.5px]" />
            </button>
            <button onClick={handleCreatePostClick}>
                <img src={createIcon} alt="" className="w-[31px]" />
            </button>
            <Link to="/settings">
                <img src={settingsIcon} alt="" className="w-[21px]" />
            </Link>
            <Link to={`/${username}`}>
                <ImgHandler src={profile ? profile.user.picLink : ''} alt={profile?.user.name} fallbackSrc={genPic} className="w-8 h-8 rounded-[32px] object-cover" />
            </Link>
        </div>
    );
}
