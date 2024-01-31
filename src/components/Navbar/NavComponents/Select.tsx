import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import Modal from '../../GeneralComponents/Modal';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@material-ui/core';
type SelectProps = {
    buttonName: any,
    route?: string
    menuItems: {
        name: string,
        route?: string,
        action?: () => void,
        icon?: any
    }[],
    divide?: boolean

}
export default function Select(props: SelectProps) {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(false);
    const handleClick = () => {
        setAnchorEl(true);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };
    return (
        <div className='relative'>
            <button className='flex gap-1 items-center' onClick={handleClick}>
                <span className='tracking-wider text-sm'>{props.buttonName}</span>
                {!props.divide && <div className={`transition-all ${anchorEl ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>}
            </button>
            <CSSTransition
                in={anchorEl}
                timeout={300}
                classNames="alert"
                unmountOnExit

            >
                <div className={`absolute ${props.divide ? 'top-12 gap-1' : 'top-7'} ltr:right-0 rtl:left-0 bg-white text-black rounded-md py-2 shadow-md z-20 flex flex-col`}>
                    {props.menuItems.map(item => {
                        return (
                            <div key={item.name} onClick={() => {
                                if (item.action !== undefined) {
                                    item.action()
                                } else {
                                    navigate(`${item.route}`)
                                }
                                handleClose()
                            }} className='transition-all flex justify-between items-center cursor-pointer hover:bg-primaryColor hover:text-white '>
                                <span className='ltr:pl-3 ltr:pr-10 rtl:pr-3 rtl:pl-10 py-2 whitespace-nowrap text-xs'>{item.name}</span>
                                {item.icon && <div className='ltr:pr-2 rtl:pl-2'><Icon>{item.icon}</Icon></div>}
                            </div>
                        )
                    })}
                </div>
            </CSSTransition>
            <Modal show={anchorEl} hideModal={handleClose} />
        </div>
    )
}

Select.defaultProps = {
    menuItems: { action: () => { } }
}