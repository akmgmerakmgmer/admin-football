import React from 'react'
type SidebarActionProps = {
    route: string,
    icon: any,
    name: string,
    action: () => void
}
export default function SidebarAction(props: SidebarActionProps) {
    return (
        <div className='hover:bg-blue-600  hover:shadow-lg text-sm transition-all duration-500 px-5 rounded-sm cursor-pointer py-4 flex gap-2 items-center font-bold' onClick={props.action}>
            {props.icon}
            <span>{props.name}</span>
        </div>
    )
}
