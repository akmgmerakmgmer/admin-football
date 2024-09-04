import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainTransactions from '../../components/Pages/Transactions/MainTransactions'

export default function Transactions() {
    return (
        <PageContainer>
            <AddIconComponent route='/add-avatar' />
            <MainTransactions />
        </PageContainer>
    )
}
