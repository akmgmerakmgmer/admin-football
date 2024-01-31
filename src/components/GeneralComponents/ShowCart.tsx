import { Fab } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

export default function ShowCart() {
    const user = useSelector((state: any) => state.user)
    return (
        <div>
            {user.email && <CSSTransition
                in={user.cart.items.length>0?true:false}
                timeout={300}
                classNames="alert"
                unmountOnExit
            >
                
                <div className='fixed bottom-5 right-5 z-30'>
                    <Link to={'/cart'}>
                        <Fab color="primary" aria-label="add">
                            <ShoppingCartIcon color='secondary' />
                        </Fab>
                    </Link>
                </div>
            </CSSTransition>}
        </div>
    )
}
