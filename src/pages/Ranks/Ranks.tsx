import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainPerks from '../../components/Pages/Perks/MainPerks'
import MainRank from '../../components/Pages/Ranks/MainRanks'

export default function Avatars() {
    return (
        <PageContainer>
            <AddIconComponent route='/add-rank' />
            <MainRank />
        </PageContainer>
    )
}
