interface crossIconProps {
    onClose: () => void
}

export function CrossIcon({onClose}: crossIconProps) {
    return (
        <div onClick={onClose}>
            <svg className="h-5 w-5 text-slate-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </div>
    )
}