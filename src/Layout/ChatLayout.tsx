import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const ChatLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto h-screen">
                <Outlet />
            </main>
        </div>
    )
}

export default ChatLayout