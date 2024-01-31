import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Table from '../../GeneralComponents/Table'
import EmptyProduct from '../Cart/EmptyProduct'
import { Pagination } from '@mui/material'
import axiosInstance from '../../../utilities/axiosInstance'
import SingleDeal from './SingleDeal'
import AddIconComponent from '../../GeneralComponents/AddIcon'

export default function MainHotDeals() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [hotDeals, setHotDeals] = useState([])
  const tableHeads = [t("name"), t('products')]
  const [checkBoxItems, setCheckBoxItems] = useState([])
  useEffect(() => {
    getHotDeals()
  }, [])

  const getHotDeals = () => {
    setLoading(true)
    axiosInstance.get(`hot-deals`).then(response => {
      setHotDeals(response.data)
    }).finally(() => {
      setLoading(false)
      setCheckBoxItems([])
    })
  }
  const deleteHotDeal = (id: string) => {
    setLoading(true)
    axiosInstance.delete(`/hot-deals/${id}`).then(response => {
      getHotDeals()
    })
  }

  const checkAllItems = (e: any) => {

  }
  return (
    <div>
      {hotDeals.length === 0 && !loading ?
        <EmptyProduct text={t('noHotDealsAvailable')} />
        : <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='hot-deals' reloadItems={getHotDeals} title={t("categories")} tableHeads={tableHeads} loading={loading}>
          {hotDeals.map((hotdeal: any) => (
            <SingleDeal checkBoxItems={checkBoxItems} value={hotdeal} deleteFunc={deleteHotDeal} />
          ))}
        </Table>}
      {hotDeals.length === 1 || loading ? <></> : <AddIconComponent route='/add-hot-deal' />}
    </div>
  )
}
