import React, { useEffect, useState } from 'react'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import GridShowContainer from '../../Containers/GridShowContainer'
import AnalyticsCard from './AnalyticsCard'

export default function SystemAnalytics() {
    const { t,i18n } = useTranslation()
    const systemData = useSelector((state: any) => state.systemData)
    const [data, setData] = useState([])

    useEffect(() => {
        const updatedData: any = [
            {
                title: 'numOfOrders',
                class: 'from-blue-800 via-blue-700 to-blue-600',
                icon: <ShoppingCart />,
                value: `${systemData.total_orders?.toLocaleString('en-US')} ${t('orders')}`
            },
            {
                title: 'totalUsers',
                class: 'from-green-600 via-green-500 to-green-400',
                icon: <PersonIcon />,
                value: `${systemData.total_users?.toLocaleString('en-US')} ${t('users')}`
            },
            {
                title: 'totalRevenue',
                class: 'from-purple-700 via-purple-600 to-purple-500',
                icon: <AttachMoneyIcon />,
                value: `${systemData.total_orders_amount?.toLocaleString('en-US')} ${t('currency')}`
            },
            {
                title: 'totalDeliveredOrders',
                class: 'from-red-600 via-red-600 to-red-500',
                icon: <LocalShippingIcon />,
                value: `${systemData.total_delivered_orders?.toLocaleString('en-US')} ${t('orders')}`
            },
        ]
        setData(updatedData)
    }, [systemData,i18n.language])
    return (
        <div className='-mt-5'>
            <GridShowContainer>
                {data.map((item: any) => (
                    <AnalyticsCard background={item.class} icon={item.icon} title={t(item.title)} value={item.value} />
                ))}
            </GridShowContainer>
        </div>
    )
}
