import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainChallenges from '../../components/Pages/Challenges/MainChallenges'

export default function Advertisments() {
    return (
        <PageContainer>
            <AddIconComponent route='/add-challenge' />
            <MainChallenges />
        </PageContainer>
    )
}
