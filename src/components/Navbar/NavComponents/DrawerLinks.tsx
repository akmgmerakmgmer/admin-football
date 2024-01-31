import { ListItem, ListItemText } from '@material-ui/core'
import { ListItemButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

type DrawerLinksProps = {
    route?: string,
    text: string,
    action?: () => void
}
const DefaultComponent = (props: DrawerLinksProps) => {
    return (
        <div onClick={props.action}>
            <ListItem disableGutters alignItems='center'>
                <ListItemButton alignItems='center'>
                    <ListItemText primary={props.text} />
                </ListItemButton>
            </ListItem>
        </div>
    )
}
export default function DrawerLinks(props: DrawerLinksProps) {
    return (
        <div>
            {props.route ? <Link to={props.route}>
                <DefaultComponent text={props.text} />
            </Link> : <DefaultComponent text={props.text} action={props.action} />}
        </div>
    )
}
