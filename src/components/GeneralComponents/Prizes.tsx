import React, { useEffect, useRef, useState } from 'react'
import UploadImage from './UploadImage'
import SelectedComponent from './SelectComponent'
import Input from '../TextFields/Input'
import { useTranslation } from 'react-i18next'
import { Delete } from '@mui/icons-material'
import { Button } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add';

export default function Prizes(props: { loading: boolean, mainForm: any }) {
    const { t } = useTranslation()
    const [prizes, setPrizes] = useState<any>([])
    const prizeTypes = ['coins', 'avatar', 'theme']
    const [rerender, setRerender] = useState(false)
    const prizesRef = useRef<any>([])
    prizesRef.current = prizes

    useEffect(() => {
        if (props.mainForm.prizes.length) setPrizes(props.mainForm.prizes)
    }, [])
    useEffect(() => {

    }, [rerender])
    const addPrize = () => {
        setPrizes([...prizes, { prizeType: '', coins: 0, avatar: '', theme: '' }])
    }
    const deletePrize = (index: number) => {
        const updatedPrizes = prizes.filter((_: any, i: number) => i !== index);
        setPrizes(updatedPrizes)
    }
    return (
        <div className='w-full'>
            <span className='mt-5 -mb-4'>{t('prizes')}</span>
            <div className='flex flex-col items-start gap-1'>
                {prizes.map((prize: any, index: any) => (
                    <div key={index} className='flex flex-col w-full'>
                        <div className="mt-2 w-full">
                            <SelectedComponent newValue={prizes[index].prizeType} disabled={props.loading} uppercase={true} translation={true} callbackValue={(value) => {
                                prizes[index].prizeType = value
                                prizesRef.current = prizes
                                props.mainForm.prizes = prizesRef.current
                                setRerender(!rerender)
                            }} defaultValue={prize.prizeType} items={prizeTypes} label={t("prizeType")} />
                        </div>
                        {prizes[index].prizeType == 'coins' && <div className='flex gap-3 items-center'>
                            <Input required value={prize.coins} inputType='number' label={t('coins')} inputValue={(value: string) => prizes[index]['coins'] = parseInt(value)} width="w-full" disabled={props.loading} />
                        </div>}
                        {prizes[index].prizeType == 'avatar' && <div className='mt-5'>
                            <span>{t('avatar')}</span>
                            <UploadImage imageUploaded={(value: any) => {
                                prizes[index].avatar = value
                                prizesRef.current = prizes
                                props.mainForm.prizes = prizesRef.current
                                setRerender(!rerender)
                            }} imageNotUploaded={(error: any) => { }} />
                            {prizes[index].avatar && <div className='relative mt-5'>
                                <img src={prizes[index].avatar} className={`w-full object-cover rounded-lg mt-5}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => {
                                    prizes[index].avatar = ''
                                    prizesRef.current = prizes
                                    props.mainForm.prizes = prizesRef.current
                                    setRerender(!rerender)
                                }}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>}
                        {prizes[index].prizeType == 'theme' && <div className='mt-5'>
                            <span>{t('theme')}</span>
                            <UploadImage imageUploaded={(value: any) => {
                                prizes[index].theme = value
                                prizesRef.current = prizes
                                props.mainForm.prizes = prizesRef.current
                                setRerender(!rerender)
                            }} imageNotUploaded={(error: any) => { }} />
                            {prizes[index].theme && <div className='relative mt-5'>
                                <img src={prizes[index].theme} className={`w-full object-cover rounded-lg mt-5}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => {
                                    prizes[index].theme = ''
                                    prizesRef.current = prizes
                                    props.mainForm.prizes = prizesRef.current
                                    setRerender(!rerender)
                                }}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>}
                    </div>
                ))}
                <Button variant="contained" color='primary' endIcon={<AddIcon color='inherit' />} onClick={addPrize}>{t('addPrize')}</Button>
            </div>
        </div>
    )
}
