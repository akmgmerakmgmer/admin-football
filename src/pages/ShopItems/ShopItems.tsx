import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainShopItem from '../../components/Pages/ShopItems/MainShopItems'

export default function Avatars() {
    return (
        <PageContainer>
            <AddIconComponent route='/add-shop-item' />
            <MainShopItem />
        </PageContainer>
    )
}
