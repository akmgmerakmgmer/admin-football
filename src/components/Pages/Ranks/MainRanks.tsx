import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SingleRank from './SingleRank'
import EmptyProduct from '../Cart/EmptyProduct'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainRank() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [ranks, setRanks] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("image"), t("englishName"), t('arabicName'), t('numberOfPlayers')]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    useEffect(() => {
        getRanks()
    }, [])

    const getRanks = () => {
        setLoading(true)
        axiosInstance.get(`admin-ranks?page=${pageNumber.current}`).then(response => {
            setRanks(response.data.ranks)
            setTotalItems(response.data.total_ranks)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const deleteRank = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/ranks/${id}`).then(response => {
            getRanks()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getRanks()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...ranks])
        } else {
            setCheckBoxItems([])
        }
    }
    return (
        <div>
            {ranks.length === 0 && !loading ?
                <EmptyProduct text={t('noRanksAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='ranks' reloadItems={getRanks} title={t("ranks")} tableHeads={tableHeads} loading={loading}>
                        {ranks.map((rank: any, index: any) => (
                            <SingleRank checkBoxItems={checkBoxItems} value={rank} deleteFunc={deleteRank} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
