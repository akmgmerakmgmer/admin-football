import React from 'react'

export default function useEmails(props: any) {
    const {
        setVerificationLoading,
        user,
        setShowVerification,
        setCodeError,
        code,
        dispatch,
        fetchUserDone,
        setSuccessMessage,
        setShowSuccessMessage,
        setAccountVerified,
        axiosInstance,
        t
    } = props
    return {
        sendEmail: () => {
            setVerificationLoading(true)
            axiosInstance.post('send-verify-email', { email: user.email }).then((response: any) => {
                setShowVerification(true)
            }).finally(() => {
                setVerificationLoading(false)
            })
        },
        verifyEmail: () => {
            setCodeError('')
            setVerificationLoading(true)
            axiosInstance.post(`verify-user/${user._id}`, { 'code': code.current }).then((response: any) => {
                dispatch(fetchUserDone(response.data))
                setSuccessMessage(t('accountVerified'))
                setShowSuccessMessage(true)
                setAccountVerified(true)
                setTimeout(() => {
                    setShowSuccessMessage(false)
                }, 4000)
            }).catch((err: any) => {
                setCodeError(t(err.response.data.message))
            }).finally(() => {
                setVerificationLoading(false)
            })
        }
    }

}
