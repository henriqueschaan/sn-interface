import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserProfile } from '../interfaces/User';
import { ImgHandler } from '../components/ImgHandler';
import { fetchProfile } from '../services/users.service';
import { API } from '../services/api';
import { Loading } from '../components/Loading';
import { SideMenu } from '../components/SideMenu';
import { FriendButton } from '../components/FriendButton';
import { FriendsList } from '../components/FriendsList';
import { NewPost } from '../components/NewPost';
import { EditPost } from '../components/EditPost';
import errorPic from '../assets/errorPic.png';
import genPic from '../assets/genPic.png';
import back from '../assets/back.png';
import settings from '../assets/settings.png';

export function Profile() {
    const { username } = useParams<{ username: string }>();
    const userId = localStorage.getItem('userId');
    const [isUser, setIsUser] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeScreen, setActiveScreen] = useState<null | 'friends' | 'createPost' | 'editPost'>(null);
    const scrollContainerRef = useRef(null);
    const navigate = useNavigate();
    const [editPostId, setEditPostId] = useState<number>(0);

    async function getProfile() {
        const data = username && await fetchProfile(username, userId);
        setProfile(data);
        setIsFriend(data.user.isFriend);
        if (data.user.id === Number(userId)) {
            setIsUser(true);
        }
    }

    useEffect(() => {
        setLoadedImagesCount(0);
        getProfile();
    }, [username]);

    async function handleAddFriend() {
        try {
            await API.post(`/users/${userId}/addFriend/${profile?.user.id}`);
            setIsFriend(true);
        } catch (error) {
            console.error("Erro ao adicionar amigo:", error);
        }
    }

    async function handleRemoveFriend() {
        try {
            await API.post(`/users/${userId}/removeFriend/${profile?.user.id}`);
            setIsFriend(false);
        } catch (error) {
            console.error("Erro ao remover amigo:", error);
        }
    }

    function toggleModal() {
        setIsModalOpen(prev => !prev);
    }

    function handleFriendsClick() {
        setActiveScreen('friends');
        toggleModal();
    }

    function handleCreatePostClick() {
        setActiveScreen('createPost');
        toggleModal();
    }

    function handleEditPostClick(postId: number): MouseEventHandler<HTMLButtonElement> {
        return (_event) => {
            setActiveScreen('editPost');
            setEditPostId(postId);
            toggleModal();
        }
    }

    return (
        <>
            {(loadedImagesCount < (profile?.posts?.length || 0)) && <Loading />}
            <div className={loadedImagesCount < (profile?.posts?.length || 0) ? "absolute -left-full -top-full" : "flex"}>
                <div className="hidden lg:flex ">
                    <SideMenu scrollContainerRef={scrollContainerRef} handleFriendsClick={handleFriendsClick} handleCreatePostClick={handleCreatePostClick} />
                </div>
                <div className={`flex-grow flex flex-col lg:overflow-auto lg:h-screen ${isModalOpen && "hidden lg:flex"}`} ref={scrollContainerRef}>
                    <div className="flex flex-grow justify-between lg:hidden my-[30px] px-[33px]">
                        <button onClick={() => navigate(-1)}><img src={back} alt="voltar" /></button>
                        {(username === localStorage.getItem('username')) && <Link to={`/settings`} className="w-5"><img src={settings} alt="configurações" className="m-auto" /></Link>}
                    </div>
                    <div className="flex flex-col flex-grow self-center items-center w-full max-w-6xl lg:px-[89px]">
                        <div className="flex flex-col lg:flex-row items-center lg:mt-14 lg:self-start">
                            <ImgHandler
                                src={profile?.user.picLink}
                                alt={profile?.user.name}
                                fallbackSrc={genPic}
                                className="w-[176px] h-[176px] rounded-full mb-6 object-cover lg:mb-0 lg:mr-24"
                                onLoad={() => setLoadedImagesCount(prevCount => prevCount + 1)}
                            />
                            <div>
                                <h1 className="text-center text-[20px] font-semibold mb-4 lg:text-[25px] lg:text-left">{profile?.user.name}</h1>
                                <p className="text-[#666666] mb-4 text-[15px] px-4 text-center max-w-full line-clamp-3 lg:px-0 lg:text-left lg:text-[20px]">{profile?.user.description}</p>
                                <div className="hidden lg:block">
                                    <FriendButton
                                        isUser={isUser}
                                        isFriend={isFriend}
                                        onAddFriend={handleAddFriend}
                                        onRemoveFriend={handleRemoveFriend}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex h-[45px] mb-5 text-center items-center text-[15px] lg:mt-[56.6px] lg:text-[20px] -mr-9 lg:mr-0">
                            <div className="mr-6 lg:mr-8">
                                <div className="font-bold">{profile?.user.postCount}</div>
                                <div>Posts</div>
                            </div>
                            <div className="w-[1px] h-[33px] bg-[#DBDADA] mr-6 lg:mr-8" />
                            <div>
                                <div className="font-bold">{profile?.user.friendCount}</div>
                                <div>Amigos</div>
                            </div>
                            <div className="lg:hidden ml-9">
                                <FriendButton
                                    isUser={isUser}
                                    isFriend={isFriend}
                                    onAddFriend={handleAddFriend}
                                    onRemoveFriend={handleRemoveFriend}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 w-full gap-[1.5px]">
                            {profile?.posts.map((post) => {
                                const isPostOwner = profile.user.id === Number(userId);
                                return (
                                    <div key={post.id} className="relative pb-[100%] w-full">
                                        {isPostOwner ? (
                                            <button onClick={handleEditPostClick(post.id)}>
                                                <ImgHandler
                                                    src={post.picLink}
                                                    alt="Post"
                                                    fallbackSrc={errorPic}
                                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                                    onLoad={() => setLoadedImagesCount(prevCount => prevCount + 1)}
                                                />
                                            </button>
                                        ) : (
                                            <ImgHandler
                                                src={post.picLink}
                                                alt="Post"
                                                fallbackSrc={errorPic}
                                                className="absolute top-0 left-0 w-full h-full object-cover"
                                                onLoad={() => setLoadedImagesCount(prevCount => prevCount + 1)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {isModalOpen && activeScreen === 'friends' &&
                    <div>
                        <div className="fixed top-0 left-0 w-full h-full hidden lg:flex items-center justify-center bg-[#30303059]">
                            <div className="bg-white w-[528px] h-[565px] rounded-[34px] flex flex-col items-center">
                                <FriendsList toggleModal={toggleModal} />
                            </div>
                        </div>
                        <div className="fixed top-0 left-0 w-full h-full flex lg:hidden items-center justify-center bg-white overflow-y-auto z-50">
                            <FriendsList toggleModal={toggleModal} />
                        </div>
                    </div>
                }
                {isModalOpen && activeScreen === 'createPost' &&
                    <div>
                        <div className="fixed top-0 left-0 w-full h-full hidden lg:flex items-center justify-center bg-[#30303059]">
                            <div className="bg-white w-[528px] rounded-[34px] flex flex-col items-center">
                                <NewPost toggleModal={toggleModal} />
                            </div>
                        </div>
                        <div className="fixed top-0 left-0 w-full h-full flex lg:hidden items-center justify-center bg-white overflow-y-auto z-50">
                            <NewPost toggleModal={toggleModal} />
                        </div>
                    </div>
                }
                {isModalOpen && activeScreen === 'editPost' &&
                    <div>
                        <div className="fixed top-0 left-0 w-full h-full hidden lg:flex items-center justify-center bg-[#30303059]">
                            <div className="bg-white w-[528px] h-[648px] rounded-[34px] flex flex-col items-center">
                                <EditPost postId={editPostId} toggleModal={toggleModal} />
                            </div>
                        </div>
                        <div className="fixed top-0 left-0 w-full h-full flex lg:hidden items-center justify-center bg-white overflow-y-auto z-50">
                            <EditPost postId={editPostId} toggleModal={toggleModal} />
                        </div>
                    </div>
                }
            </div>
        </>
    );
}
