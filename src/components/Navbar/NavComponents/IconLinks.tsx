import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

type IconLinksProps = {
    title: string,
    route?: string,
    children: any,
    iconAction?: () => void,
    delete: boolean
}
export default function IconLinks(props: IconLinksProps) {
    return (
        <>
            <Tooltip title={props.title}><IconButton onClick={props.iconAction} color={`${props.delete ? "error" : "secondary"}`}>{props.route ? <Link to={props.route}>{props.children}</Link> : <>{props.children}</>}</IconButton></Tooltip>
        </>
    )
}

IconLinks.defaultProps = {
    delete: false
}