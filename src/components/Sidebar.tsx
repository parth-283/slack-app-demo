import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../store";
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";

const Sidebar = () => {
    const { logoutUser } = useAuth();
    const { getConversationList } = useChat();
    const user = useSelector((state: RootState) => state.auth.user);
    const chats = useSelector((state: RootState) => state.chat.conversation);

    useEffect(() => {
        getConversationList()
    }, [])

    const handleLogout = () => {
        logoutUser();
    };

    return (
        <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-purple-400 tracking-wide">
                    ChatFlow 🚀
                </h1>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="mt-4 px-4 text-sm text-gray-400 uppercase">Conversations</div>
                <ul className="mt-2">
                    {chats?.map((conv) => (
                        <li key={conv.id}>
                            <NavLink
                                to={`/conversations/${conv.id}`}
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-md mx-2 my-1 ${isActive
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                    }`
                                }
                            >
                                # {conv.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* <div className="border-t border-gray-700 p-4 text-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-semibold">admin</div>
                        <div className="text-gray-400 text-xs">Online</div>
                    </div>
                    <div className="bg-green-500 rounded-full w-3 h-3" />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-semibold">logOut</div>
                    </div>
                    <div className="bg-green-500 rounded-full w-3 h-3" />
                </div>
            </div> */}

            <div className="border-t border-gray-700 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-semibold text-white text-sm">
                            {user?.username || 'User'}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-xs text-gray-400 hover:text-red-400 mt-1"
                        >
                            Logout
                        </button>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full" title="Online"></div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
