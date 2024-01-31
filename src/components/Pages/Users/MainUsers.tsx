import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SingleUser from './SingleUser'
import EmptyProduct from '../Cart/EmptyProduct'
import Input from '../../TextFields/Input'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainUsers() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("username"), t("number"), t('role'), t("points"), t('coins'), t('status'), t("datePlaced")]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const usernameSearch = useRef('')
    const numberSearch = useRef('')
    const emailSearch = useRef('')
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        setLoading(true)
        axiosInstance.get(`users?page=${pageNumber.current}&username=${usernameSearch.current}&number=${numberSearch.current}&email=${emailSearch.current}`).then(response => {
            setUsers(response.data.user)
            setTotalItems(response.data.total_users)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const deleteUser = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/users/${id}`).then(response => {
            getUsers()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getUsers()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...users])
        } else {
            setCheckBoxItems([])
        }
    }

    const enableFunc = (id: string) => {
        setLoading(true)
        axiosInstance.put(`/users/${id}`, { disabled: false }).then(response => {
            getUsers()
        })
    }

    const disableFunc = (id: string) => {
        setLoading(true)
        axiosInstance.put(`/users/${id}`, { disabled: true }).then(response => {
            getUsers()
        })
    }

    return (
        <div>
            <div className='mb-5 flex md:flex-row flex-col gap-5 md:mx-10 mx-5 items-center justify-center '>
                <Input label={t('username')} inputValue={(value: string) => usernameSearch.current = value} width="w-full mt-0" disabled={loading} />
                <Input label={t('number')} inputValue={(value: any) => numberSearch.current = value} width="w-full mt-0" disabled={loading} />
                <button className='px-10 h-12 md:w-auto w-full bg-gradient text-sm text-white rounded-md' onClick={getUsers} disabled={loading}>{t("search")}</button>
            </div>
            {users.length === 0 && !loading ?
                <EmptyProduct text={t('noUsersAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='users' reloadItems={getUsers} title={t("users")} tableHeads={tableHeads} loading={loading}>
                        {users.map((order: any, index: any) => (
                            <SingleUser disableFunc={disableFunc} enableFunc={enableFunc} checkBoxItems={checkBoxItems} value={order} deleteFunc={deleteUser} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
