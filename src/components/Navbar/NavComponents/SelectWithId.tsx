import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import Modal from '../../GeneralComponents/Modal';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
type SelectProps = {
    buttonName: any,
    route:string,
    menuItems: {
        _id: string
        name: string,
        nameAr:string
        route?: string,
    }[],
    divide?: boolean

}
export default function SelectWithId(props: SelectProps) {
    const [anchorEl, setAnchorEl] = useState(false);
    const { i18n } = useTranslation()
    const handleClick = () => {
        setAnchorEl(true);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };
    return (
        <div className='relative bg-primaryColor'>
            <button className='flex gap-1 items-center' onClick={handleClick}>
                <span className='tracking-wider '>{props.buttonName}</span>
                {!props.divide && <div className={`transition-all ${anchorEl ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="3">
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
                            <Link key={item._id} to={`/${props.route}/${item._id}`}>
                                <div className='transition-all flex justify-between items-center cursor-pointer hover:bg-primaryColor hover:text-white '>
                                    <span className='ltr:pl-3 ltr:pr-10 rtl:pr-3 rtl:pl-10 py-2 whitespace-nowrap text-xs'>{i18n.language==="en"?item.name:item.nameAr}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </CSSTransition>
            <Modal show={anchorEl} hideModal={handleClose} />
        </div>
    )
}

SelectWithId.defaultProps = {
    menuItems: { action: () => { } }
}