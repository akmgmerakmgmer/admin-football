import React from 'react'
import { NavLink } from 'react-router-dom'
type SidebarLinkProps = {
    route: string,
    icon: any,
    name: string
}
export default function SidebarLink(props: SidebarLinkProps) {
    return (
        <NavLink className={({ isActive }) =>
            isActive ? 'bg-white text-blue-600 shadow-lg text-sm px-5 ltr:rounded-l-2xl rtl:rounded-r-2xl ltr:ml-5 rtl:mr-5 cursor-pointer py-4 flex gap-2 items-center font-semibold' : 'hover:bg-blue-600 hover:shadow-lg text-sm transition-all duration-300 px-5 rounded-sm cursor-pointer py-4 flex gap-2 items-center font-semibold'
        } to={props.route}>
            {props.icon}
            <span>{props.name}</span>
        </NavLink>
    )
}
