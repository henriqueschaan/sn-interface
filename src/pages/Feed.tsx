import { useEffect, useRef, useState } from 'react';
import { PostCard } from '../components/PostCard';
import { fetchFeed } from '../services/posts.service';
import { FeedMenu } from '../components/FeedMenu';
import { PostData } from '../interfaces/Post';
import { Loading } from '../components/Loading';
import { SideMenu } from '../components/SideMenu';
import { FriendsList } from '../components/FriendsList';
import { NewPost } from '../components/NewPost';
import { EditPost } from '../components/EditPost';
import { DeletePost } from '../components/DeletePost';
import feedLogo from '../assets/feedLogo.png'

export function Feed() {
    const userId = localStorage.getItem('userId');
    const [posts, setPosts] = useState<PostData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeScreen, setActiveScreen] = useState<null | 'friends' | 'createPost' | 'editPost' | 'deletePost'>(null);
    const [editPostId, setEditPostId] = useState<number>(0);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const scrollContainerRef = useRef(null);

    async function loadPosts() {
        const data = userId && await fetchFeed();
        setPosts(data);
    }

    useEffect(() => {
        setLoadedImagesCount(0);
        loadPosts();
    }, []);

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

    function handleEditPostClick(postId: number) {
        setActiveScreen('editPost');
        setEditPostId(postId);
        toggleModal();
    }

    function handleDeletePostClick(postId: number) {
        setActiveScreen('deletePost');
        setEditPostId(postId);
        toggleModal();
    }

    return (
        <div>
            {(loadedImagesCount < (posts.length || 0)) && <Loading />}
            <div className={loadedImagesCount < (posts.length || 0) ? "absolute -left-full -top-full" : "flex"}>
                <div className="hidden lg:flex min-w-[380px]">
                    <SideMenu scrollContainerRef={scrollContainerRef} handleFriendsClick={handleFriendsClick} handleCreatePostClick={handleCreatePostClick} />
                </div>
                <div className="flex flex-col flex-grow h-screen">
                    <div className="flex h-full justify-center lg:justify-between overflow-auto" ref={scrollContainerRef}>
                        <div className="flex flex-col h-full items-center lg:w-custom">
                            <div className="flex flex-col h-full w-[300px] lg:flex-grow lg:w-auto lg:max-w-[558px] 2xl:max-w-[700px]">
                                <div className="flex flex-wrap gap-4 pb-4">
                                    <div className="flex self-start items-center min-h-[114px] mb-[-16px] lg:min-h-[172px]">
                                        <img src={feedLogo} alt="" className="w-[187px] lg:hidden" />
                                    </div>
                                    {posts.map((post, index) => (
                                        <PostCard key={index} {...post} onEditClick={handleEditPostClick} onDeleteClick={handleDeletePostClick} onLoad={() => setLoadedImagesCount(prevCount => prevCount + 1)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block bg-tile fixed right-[17px] min-w-[300px] bg-repeat-y h-full overflow-y-auto -z-30"></div>
                    </div>
                    <div className="lg:hidden">
                        <FeedMenu scrollContainerRef={scrollContainerRef} handleFriendsClick={handleFriendsClick} handleCreatePostClick={handleCreatePostClick} />
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
            {isModalOpen && activeScreen === 'deletePost' &&
                <div>
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#30303059]">
                        <div className="bg-white w-[289px] h-[186px] rounded-[34px] flex flex-col items-center lg:w-[460px] lg:h-[210px]">
                            <DeletePost postId={editPostId} toggleModal={toggleModal} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );

};