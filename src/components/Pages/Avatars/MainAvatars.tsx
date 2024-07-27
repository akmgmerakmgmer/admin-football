import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SingleAvatar from './SingleAvatar'
import EmptyProduct from '../Cart/EmptyProduct'
import Input from '../../TextFields/Input'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainAvatars() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [avatars, setAvatars] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("image"), t('price')]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const nameSearch = useRef('')
    useEffect(() => {
        getAvatars()
    }, [])

    const getAvatars = () => {
        setLoading(true)
        axiosInstance.get(`/admin-avatars?page=${pageNumber.current}`).then(response => {
            setAvatars(response.data.avatars)
            setTotalItems(response.data.total_avatars)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const deleteAvatar = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/avatars/${id}`).then(response => {
            getAvatars()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getAvatars()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...avatars])
        } else {
            setCheckBoxItems([])
        }
    }

    return (
        <div>
            <div className='mb-5 flex md:flex-row flex-col gap-5 md:mx-10 mx-5 items-center justify-center'>
                <Input label={t('name')} required={false} inputValue={(value: string) => nameSearch.current = value} width="w-full mt-0" disabled={loading} />
                <button className='px-10 h-12 md:w-auto w-full bg-gradient text-sm text-white rounded-md' onClick={() => {
                    pageNumber.current = 1
                    getAvatars()
                }} disabled={loading}>{t("search")}</button>
            </div>
            {avatars.length === 0 && !loading ?
                <EmptyProduct text={t('noAvatarsAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='avatars' reloadItems={getAvatars} title={t("avatars")} tableHeads={tableHeads} loading={loading}>
                        {avatars.map((order: any, index: any) => (
                            <SingleAvatar checkBoxItems={checkBoxItems} value={order} deleteFunc={deleteAvatar} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
