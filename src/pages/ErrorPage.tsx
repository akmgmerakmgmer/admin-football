import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PageContainer from '../components/Containers/PageContainer'
import EmptyProduct from '../components/Pages/Cart/EmptyProduct'

export default function ErrorPage() {
  const { t } = useTranslation()
  return (
    <PageContainer>
      <EmptyProduct text={t("checkConnection")} />
      <div className='text-center'>
        <Link to={'/'}><span className='sm:px-20 px-16 py-4 text-white bg-primaryColor rounded-md'>{t("continueShopping")}</span></Link>
      </div>
    </PageContainer>
  )
}
