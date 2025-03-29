import { Button } from "./Button";
import { SidebarItems } from "./SidebarItems";
import { Brain, Video, FileText, LinkIcon, Hash, Twitter } from "lucide-react";
import { useNavigate } from 'react-router-dom';


function Sidebar() {
  const navigate =  useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token")
    console.log(`user signed out.`)
    navigate('/signin')
  }
  return (
    <>
      <div className="w-52 border-r border-gray-200 p-4 flex flex-col justify-between mb-2">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Brain className="h-6 w-6 text-indigo-600" />
            <h1 className="font-semibold text-gray-800">Second Brain</h1>
          </div>

          <nav className="space-y-4">
            <SidebarItems
              icon={<Twitter className="h-5 w-5 text-gray-600" />}
              label="Tweets"
            />
            <SidebarItems
              icon={<Video className="h-5 w-5 text-gray-600" />}
              label="Videos"
            />
            <SidebarItems
              icon={<FileText className="h-5 w-5 text-gray-600" />}
              label="Documents"
            />
            <SidebarItems
              icon={<LinkIcon className="h-5 w-5 text-gray-600" />}
              label="Links"
            />
            <SidebarItems
              icon={<Hash className="h-5 w-5 text-gray-600" />}
              label="Tags"
            />
          </nav>
        </div>
        {/* Implement signout funcitonality by removing the JWT token from the local storage and the Authorization header */}
        <Button variant="primary" text="Signout" onClick={handleSignout}/>
      </div>
    </>
  );
}

export default Sidebar;
