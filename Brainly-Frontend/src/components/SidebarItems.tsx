export function SidebarItems ({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-700 hover:text-gray-900 cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
)}