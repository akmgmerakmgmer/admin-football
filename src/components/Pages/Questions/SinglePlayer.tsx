import { Delete } from '@mui/icons-material'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function SinglePlayer(props: any) {
    const { i18n } = useTranslation()
    return (
        <div className='flex items-center justify-between w-full bg-gray-200 p-3 rounded-lg shadow-md'>
            <div className='flex gap-5 items-center'>
                <img className='rounded-full w-10 h-10 object-cover' src={props.player.image} />
                <span>{i18n.language === 'en' ? props.player.nameEn : props.player.nameAr}</span>
            </div>
            <div className='flex items-center gap-3'>
                <div className='cursor-pointer' onClick={() => props.deletePlayer(props.index)}>
                    <Delete fontSize='small' color='error' />
                </div>
            </div>
        </div>
    )
}
