import React,{useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);


export function PieChart() {
    const systemData = useSelector((state: any) => state.systemData)
    const { t } = useTranslation()
    const data = {
        labels: [t('pending'), t('confirmed'), t('delivered'), t('returnDone'),t("canceled")],
        datasets: [
            {
                label: '# of Votes',
                data: [systemData.total_pending_orders, systemData.total_confirmed_orders, systemData.total_delivered_orders, systemData.total_returned_orders,systemData.total_canceled_orders],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                
                borderWidth: 1,
            },
        ],
    };
    useEffect(()=>{},[systemData])
    return (
        <div className='w-full'>
            <Doughnut data={data} options={{ responsive: true, aspectRatio: 1.7 }} />
        </div>
    )
}
