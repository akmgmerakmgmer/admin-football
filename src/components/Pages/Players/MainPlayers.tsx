import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SinglePlayer from './SinglePlayer'
import EmptyProduct from '../Cart/EmptyProduct'
import Input from '../../TextFields/Input'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainPlayers() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [players, setPlayers] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("firstName"), t("nameEn"), t('nameAr'), t("image")]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const nameSearch = useRef('')
    useEffect(() => {
        getPlayers()
    }, [])

    const getPlayers = () => {
        setLoading(true)
        axiosInstance.get(`players?page=${pageNumber.current}&name=${nameSearch.current}`).then(response => {
            setPlayers(response.data.player)
            setTotalItems(response.data.total_players)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const deletePlayer = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/players/${id}`).then(response => {
            getPlayers()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getPlayers()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...players])
        } else {
            setCheckBoxItems([])
        }
    }

    const enableFunc = (id: string) => {
        setLoading(true)
        axiosInstance.put(`/players/${id}`, { disabled: false }).then(response => {
            getPlayers()
        })
    }

    return (
        <div>
            <div className='mb-5 flex md:flex-row flex-col gap-5 md:mx-10 mx-5 items-center justify-center'>
                <Input label={t('name')} required={false} inputValue={(value: string) => nameSearch.current = value} width="w-full mt-0" disabled={loading} />
                <button className='px-10 h-12 md:w-auto w-full bg-gradient text-sm text-white rounded-md' onClick={() => {
                    pageNumber.current = 1
                    getPlayers()
                }} disabled={loading}>{t("search")}</button>
            </div>
            {players.length === 0 && !loading ?
                <EmptyProduct text={t('noPlayersAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='players' reloadItems={getPlayers} title={t("players")} tableHeads={tableHeads} loading={loading}>
                        {players.map((order: any, index: any) => (
                            <SinglePlayer enableFunc={enableFunc} checkBoxItems={checkBoxItems} value={order} deleteFunc={deletePlayer} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
