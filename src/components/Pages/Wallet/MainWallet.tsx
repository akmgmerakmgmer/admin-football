import React, { useState, useEffect, useRef } from 'react'
import SingleWallet from './SingleWallet'
import { useTranslation } from 'react-i18next';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useSelector } from 'react-redux';
import AnalyticsCard from '../Home/AnalyticsCard';
import Modal from '@mui/material/Modal';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import BankInformation from './BankInformation';
import MobileInformation from './MobileInformation';
import { motion } from 'framer-motion'
import axiosInstance from '../../../utilities/axiosInstance';
import ApiLoading from '../../Loadings/ApiLoading';
import { CSSTransition } from 'react-transition-group';
import AlertComponent from '../../GeneralComponents/Alert';
export default function MainWallet() {
    const [user, setUser] = useState<any>({})
    const [showModal, setShowModal] = useState(false)
    const [showWithdrawalChoices, setShowWithdrawalChoices] = useState(true)
    const [showBankInformation, setShowBankInformation] = useState(false)
    const [showMobileNumberInformation, setMobileNumberInformation] = useState(false)
    const [loading, setLoading] = useState(true)
    const { t } = useTranslation()
    const bankInformation = useRef({ recieverName: '', accountNumber: '', bankName: '' })
    const mobileInformation = useRef({ recieverName: '', number: '' })
    const [mobileInformationErrors, setMobileInformationErrors] = useState({ recieverName: '', number: '' })
    const [bankInformationErrors, setBankInformationErrors] = useState({ recieverName: '', accountNumber: '', bankName: '' })
    const [paymentSuccessful, setPaymentSuccessful] = useState(false)
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [showWithdrawError, setShowWithdrawError] = useState(false)
    const effectRan = useRef(false)
    const updatedData: any = [
        {
            title: 'numOfOrders',
            class: 'from-red-800 via-red-700 to-red-600',
            icon: <ViewListIcon />,
            value: `${user?.orders?.length.toLocaleString('en-US')} ${t('orders')}`
        },
        {
            title: 'expectedAmount',
            class: 'from-green-600 via-green-500 to-green-400',
            icon: <AccountBalanceIcon />,
            value: `${user?.wallet?.expectedAmount.toLocaleString('en-US')} ${t('currency')}`
        },
        {
            title: 'totalProfit',
            class: 'from-purple-700 via-purple-600 to-purple-500',
            icon: <CurrencyExchangeIcon />,
            value: `${user?.wallet?.totalRevenue.toLocaleString('en-US')} ${t('currency')}`
        },
    ]
    useEffect(() => {
        if (effectRan.current === false) {
            getUser()
            effectRan.current = true
        }
    }, [])
    const getUser = () => {
        setLoading(true)
        const token = localStorage.getItem('token')
        axiosInstance.post('current-user', { data: { 'token': token } }).then(response => {
            setUser(response.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }
    const showBankData = () => {
        if (user?.wallet?.currentAmount < 3000) {
            return;
        }
        setShowWithdrawalChoices(false)
        setShowBankInformation(true)
    }

    const createPayment = () => {
        setMobileInformationErrors({ recieverName: '', number: '' })
        setBankInformationErrors({ recieverName: '', accountNumber: '', bankName: '' })
        if (showMobileNumberInformation) {
            if (!mobileInformation.current.number) {
                setMobileInformationErrors({ ...mobileInformationErrors, number: t('field_required') })
                return
            }
            if (!mobileInformation.current.recieverName) {
                setMobileInformationErrors({ ...mobileInformationErrors, recieverName: t('field_required') })
                return
            }
        }
        if (showBankInformation) {
            if (!bankInformation.current.recieverName) {
                setBankInformationErrors({ ...bankInformationErrors, recieverName: t('field_required') })
                return
            }
            if (!bankInformation.current.accountNumber) {
                setBankInformationErrors({ ...bankInformationErrors, accountNumber: t('field_required') })
                return
            }
            if (!bankInformation.current.bankName) {
                setBankInformationErrors({ ...bankInformationErrors, bankName: t('field_required') })
                return
            }
        }
        setPaymentLoading(true)
        const payload = {
            bankInformation: bankInformation.current,
            mobileInformation: mobileInformation.current,
            affiliateUser: user._id,
            status: 'pending',
            amount: user.wallet.currentAmount
        }
        axiosInstance.post('create-payment', payload).then(response => {
            setShowWithdrawalChoices(false)
            setShowBankInformation(false)
            setMobileNumberInformation(false)
            setShowModal(false)
            getUser()
            setPaymentSuccessful(true)
            setTimeout(() => {
                setPaymentSuccessful(false)
            }, 5000)
        }).finally(() => {
            setPaymentLoading(false)
        })
    }
    return (
        <>
            <ApiLoading loading={loading} />
            <CSSTransition
                in={!loading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >
                <div className="flex flex-col gap-5">
                    <div className="bg-gray-200 shadow-md rounded-md p-4 font-semibold text-sm text-gray-700">
                        <span>{t("walletNote")}</span>
                    </div>
                    <AlertComponent message={t('paymentPending')} open={paymentSuccessful} />
                    <AlertComponent message={t('zeroWithdrawal')} open={showWithdrawError} error={true} />
                    <div className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-5`}>
                        {updatedData.map((item: any) => (
                            <AnalyticsCard background={item.class} icon={item.icon} title={t(item.title)} value={item.value} />
                        ))}
                    </div>
                    <div className={`grid md:grid-cols-6 grid-cols-1`}>
                        <div></div>
                        <SingleWallet amount={user?.wallet?.currentAmount}
                            background='from-blue-800 via-blue-700 to-blue-600'
                            icon={<AttachMoneyIcon />}
                            title={t('currentAmount')}
                            buttonBackground='bg-blue-600'
                            action={() => {
                                if (user.wallet.currentAmount === 0) {
                                    setShowWithdrawError(true)
                                    setTimeout(() => {
                                        setShowWithdrawError(false)
                                    }, 5000)
                                    return
                                }
                                setShowModal(true)
                                setShowWithdrawalChoices(true)
                            }} />
                        <div></div>
                    </div>
                    <Modal
                        open={showModal}
                        onClose={() => {
                            setShowModal(false)
                            setShowBankInformation(false)
                            setMobileNumberInformation(false)
                            setShowWithdrawalChoices(true)
                        }}
                    >
                        <div className='bg-white flex flex-col py-10 gap-5 items-start top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute px-10 rounded-md md:w-3/4 w-96'>
                            {showWithdrawalChoices && <div className="flex flex-row gap-5 w-full">
                                <div onClick={() => {
                                    setShowWithdrawalChoices(false)
                                    setMobileNumberInformation(true)
                                }} className='bg-primaryColor items-center cursor-pointer justify-center text-xl font-semibold ltr:tracking-wider text-white rounded-md p-20 w-full flex flex-col gap-3'>
                                    <InstallMobileIcon color='inherit' fontSize='large' />
                                    <span>{t('withdrawToYourMobile')}</span>
                                </div>
                                <div onClick={showBankData} className={`${user?.wallet?.currentAmount >= 3000 ? 'bg-primaryColor text-white cursor-pointer' : 'bg-gray-100 text-gray-400'} items-center justify-center text-xl font-semibold ltr:tracking-wider rounded-md p-20 w-full flex flex-col gap-3`}>
                                    <AccountBalanceIcon color='inherit' fontSize='large' />
                                    <span>{t('withdrawToBank')}</span>
                                    {user?.wallet?.currentAmount < 3000 && <span className='text-xxs'>{t('moreThan3000')}</span>}
                                </div>
                            </div>}
                            <BankInformation errors={bankInformationErrors} bankInformation={bankInformation} action={createPayment} loading={paymentLoading} show={showBankInformation} />
                            <MobileInformation errors={mobileInformationErrors} mobileInformation={mobileInformation} action={createPayment} loading={paymentLoading} show={showMobileNumberInformation} />
                        </div>
                    </Modal>
                </div>
            </CSSTransition>
        </>
    )
}
