import { useEffect, useState } from 'react';
import { fetchFriends } from '../services/users.service';
import { useNavigate } from 'react-router-dom';
import { ImgHandler } from './ImgHandler';
import friendsLogo from '../assets/friendsLogo.png';
import genPic from '../assets/genPic.png';
import close from '../assets/close.png';
import back from '../assets/back.png';

interface Friend {
    picLink: string;
    username: string;
    name: string;
    id: number;
}

interface FriendsListProps {
    toggleModal: () => void;
}

export function FriendsList({ toggleModal }: FriendsListProps) {
    const userId = localStorage.getItem('userId');
    const [allFriends, setAllFriends] = useState<Friend[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1023);
    const [currentPage, setCurrentPage] = useState(1);
    const [startPageNumber, setStartPageNumber] = useState(1);
    const itemsPerPage = isDesktop ? 4 : 9;
    const totalPages = Math.ceil(allFriends.length / itemsPerPage);
    const navigate = useNavigate();

    async function getFriends() {
        const data = userId && await fetchFriends(Number(userId));
        setAllFriends(data);
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setFriends(data.slice(start, end));
    }

    useEffect(() => {
        getFriends();
    }, []);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setFriends(allFriends.slice(start, end));
    }, [currentPage, allFriends, isDesktop]);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1023);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-[303.5px] h-screen mx-auto pt-[42px] lg:w-[420px]">
            <div className="flex flex-col h-full max-h-[800px]">
                {isDesktop ?
                    <div className="flex justify-end mb-[15px]">
                        <button onClick={toggleModal}><img src={close} alt="close" /></button>
                    </div>
                    :
                    <div className="flex justify-between mb-[31px]">
                        <button onClick={toggleModal}><img src={back} alt="back" /></button>
                        <img src={friendsLogo} alt="logo" />
                    </div>
                }
                <h1 className="text-[20px] font-semibold mb-2 lg:text-[25px] lg:mb-3">Amigos</h1>
                <div className="flex mb-9">
                    <div className="w-[72.5px] h-[2px] bg-[#F37671] lg:w-[120px]" />
                    <div className="w-[231px] h-[2px] bg-[#CECECE] lg:w-full" />
                </div>
                {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center mb-5 lg:px-3">
                        <button onClick={() => {toggleModal(); navigate(`/${friend.username}`)}}>
                            <ImgHandler src={friend.picLink} alt={friend.name} fallbackSrc={genPic} className="w-10 h-10 rounded-full object-cover lg:w-14 lg:h-14" />
                        </button>
                        <button className="ml-4 text-left" onClick={() => {toggleModal(); navigate(`/${friend.username}`)}}>
                            <p className="font-semibold text-[15px] lg:text-[20px]">{friend.username}</p>
                            <p className="font-semibold text-[12px] text-[#A09F9F] lg:text-[15px]">{friend.name}</p>
                        </button>
                        <button className="ml-auto bg-[#F37671] text-white rounded-lg w-[67px] h-[28px] text-[12px] font-medium" onClick={() => {toggleModal(); navigate(`/${friend.username}`)}}>Ver perfil</button>
                    </div>
                ))}
            <div className="flex justify-center mt-auto mb-[60px]">
                <button
                    className={`w-[31px] h-[31px] rounded-lg flex items-center justify-center text-sm font-medium border-2
                    ${(startPageNumber === 1) ? 'text-[#C4C4C4] border border-[#C4C4C4]' : 'text-[#7e7e7e] border-[#7e7e7e]'}`}
                    onClick={() => startPageNumber > 1 && setStartPageNumber((prev) => prev - 1)}
                    disabled={startPageNumber === 1}
                >
                    &lt;
                </button>
                {[...Array(4)].map((_, idx) => {
                    const pageNumber = startPageNumber + idx;
                    const isActive = pageNumber === currentPage;
                    const isDisabled = pageNumber > totalPages;
                    return (
                        <button
                            key={`page-btn-${pageNumber}`}
                            className={`w-[31px] h-[31px] rounded-lg flex items-center justify-center ml-2 text-sm font-medium border-2
                            ${isActive ? 'bg-[#F37671] border-[#F37671] text-white' : isDisabled ? 'text-[#C4C4C4] border-[#C4C4C4]' : 'text-[#7e7e7e] border-[#7e7e7e]'}`}
                            onClick={() => !isDisabled && setCurrentPage(pageNumber)}
                            disabled={isDisabled}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
                <button
                    className={`w-[31px] h-[31px] rounded-lg flex items-center justify-center text-sm ml-2 font-medium border-2
                    ${(startPageNumber + 4 > totalPages) ? 'text-[#C4C4C4] border border-[#C4C4C4]' : 'text-[#7e7e7e] border-[#7e7e7e]'}`}
                    onClick={() => startPageNumber + 4 <= totalPages && setStartPageNumber((prev) => prev + 1)}
                    disabled={startPageNumber + 4 > totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
        </div >
    );
}