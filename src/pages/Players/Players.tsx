import React from 'react'
import { useSelector } from 'react-redux'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainPlayers from '../../components/Pages/Players/MainPlayers'

export default function Users() {
    const user = useSelector((state: any) => state.user)

    return (
        <PageContainer childrenClasses=''>
            {/* {user?.roles?.indexOf('client') === -1 && <AddIconComponent route='/add-player' />} */}
            <MainPlayers />
        </PageContainer>
    )
}
