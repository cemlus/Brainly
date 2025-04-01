export interface SidebarItemsProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  className?: string;
  isCollapsed?: boolean;
  filterType?: string
}

export function SidebarItems({ 
  icon, 
  label, 
  isActive,
  onClick,
  className,
  isCollapsed,
}: SidebarItemsProps) {
  return (
    <div
      onClick={() => onClick()}
      className={`
        flex items-center gap-3
        transition-all duration-200 ease-in-out
        rounded-lg p-2
        ${isActive 
          ? 'bg-indigo-50 text-indigo-600' 
          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        }
        ${className || ''}
        cursor-pointer
      `}
      title={isCollapsed ? label : undefined}
    >
      {icon}
      <span className={`
        font-medium text-sm whitespace-nowrap
        transition-all duration-300
        ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}
        overflow-hidden
      `}>
        {label}
      </span>
    </div>
  );
}