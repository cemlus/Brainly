import { useState } from 'react';
import { TwitterIcon } from "../assets/TwitterIcon";
import { Button } from "./Button";
import { SidebarItems } from "./SidebarItems";
import { Brain, Video, FileText, LinkIcon, Hash, LogOut, ChevronRight, ChevronLeft, HomeIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFilter } from '../hooks/UseFilterContext';

function Sidebar() {
  const navigate = useNavigate();
  // the default active items is set to home so that all the content is shown by default
  const [activeItem, setActiveItem] = useState<string>('Home');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(prev => !prev);
  // this is used to set the active filter type in the filter context provider
  const { setActiveFilter } = useFilter();

  const handleSignout =() => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate('/signin');
  };

  const defaultStyles = "h-5 w-5";
  
  const sideBarItems = [
    {
      label: "Home",
      icon: <HomeIcon className={`${defaultStyles}`}/>,
      filterType: 'all'
    },
    {
      label: "Tweets",
      icon: <TwitterIcon />,
      filterType: "twitter"
    },
    {
      label: "Videos",
      icon: <Video className={`${defaultStyles}`} />,
      filterType: "youtube"
    },
    {
      label: "Documents",
      icon: <FileText className={defaultStyles} />,
      filterType: "document"
    },
    {
      label: "Links",
      icon: <LinkIcon className={defaultStyles} />,
      filterType: "link"
    },
    {
      label: "Tags",
      icon: <Hash className={defaultStyles} />,
      filterType: "tags"
    }
  ];

  return (
    <aside className={`
      relative h-screen max-h-full bg-white border-r border-gray-200
      transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-64'}
      sticky top-0
    `}>
      {/* mera toggle button */}
      <button
        // this collapse toggle determines all the subsequent conditional tailwind classes that apply to all the sidebar components 
        onClick={toggleCollapse}
        className={`
          absolute -right-3 top-6
          h-6 w-6 rounded-full bg-white
          border border-gray-200 shadow-sm
          flex items-center justify-center
          text-gray-600 hover:text-gray-800
          transition-all duration-200
          hover:bg-gray-50 cursor-pointer
        `}
      >
        {isCollapsed ? 
          <ChevronRight className="h-4 w-4" /> : 
          <ChevronLeft className="h-4 w-4" />
        }
      </button>

      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-indigo-600 flex-shrink-0" />
            <h1 className={`
              font-semibold text-gray-800
              transition-all duration-300
              ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}
              overflow-hidden whitespace-nowrap
            `}>
              Second Brain
            </h1>
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {sideBarItems.map((item) => (
            <SidebarItems
              key={item.label}
              icon={item.icon}
              label={item.label}
              // if the current activeItem is the same as the one selected then isActive becomes true and the corresponding color and tailwind classes reappear simply based on this comparison
              isActive={activeItem === item.label}
              // when you click the button the currentActiveItem becomes that only.
              onClick={() => { 
                setActiveItem(item.label)
                setActiveFilter(item.filterType)
              }}
              className={`
                ${isCollapsed ? 'px-2 justify-center' : 'px-4'}
                hover:bg-gray-100
              `}
              isCollapsed={isCollapsed}
              filterType={item.filterType}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 mt-auto">
          <Button
            variant="primary"
            text={isCollapsed ? '' : "Sign out"}
            startIcon={<LogOut className="h-5 w-5" />}
            onClick={handleSignout}
            className={`
              w-full justify-center
              transition-all duration-200
              ${isCollapsed ? 'p-2' : 'px-4 py-2'}
            `}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;