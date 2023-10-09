import { useState } from "react";
import check from "../assets/check.svg";

interface FriendButtonProps {
    isFriend: boolean;
    isUser: boolean;
    onAddFriend: () => void;
    onRemoveFriend: () => void;
}

export function FriendButton({ isFriend, isUser, onAddFriend, onRemoveFriend }: FriendButtonProps) {
    const [hoverRemove, setHoverRemove] = useState(false);

    return (
        <>
            {!isUser && (
                isFriend ? (
                    <button
                        className="flex items-center justify-center w-[84px] h-[32px] rounded-lg border border-[#666666] text-[#666666] text-[15px] font-medium"
                        onMouseEnter={() => setHoverRemove(true)}
                        onMouseLeave={() => setHoverRemove(false)}
                        onClick={onRemoveFriend}
                    >
                        {hoverRemove ? "Remover" : "Amigos"}
                        {!hoverRemove && <img src={check} className="ml-1 mt-0.5" />}
                    </button>
                ) : (
                    <button
                        onClick={onAddFriend}
                        className="flex items-center justify-center w-[84px] h-[33px] rounded-lg bg-[#F37671] text-white text-[15px] font-medium">
                        Adicionar
                    </button>
                )
            )}
        </>
    );
}