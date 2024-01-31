import React from 'react'
import { Link } from 'react-router-dom'
type HomeLinkProps = {
    route: string,
    icon: any,
    name: string
}
export default function HomeLink(props: HomeLinkProps) {
    return (
        <Link to={props.route}>
            <div className='flex gap-3 bg-primaryColor text-white py-7 px-10 rounded-md'>
                {props.icon}
                <h2 className='font-bold'>{props.name}</h2>
            </div>
        </Link>
    )
}
