import React from 'react'

export default function useVerifyEmail(props: any) {
    const {
        code,
        setCodeError,
        setLoading,
        axiosInstance,
        userId,
        dispatch,
        fetchUserDone,
        navigate,
        t
    } = props
    return {
        verifyEmail: () => {
            setLoading(true)
            setCodeError('')
            axiosInstance.post(`verify-user/${userId.current}`, { 'code': code.current }).then((response: any) => {
                dispatch(fetchUserDone(response.data))
                if (response.data.role === 'Affiliate') return navigate('/orders')
                navigate('/products')
            }).finally(() => {
                setLoading(false)
            }).catch((err: any) => {
                setCodeError(t(err.response.data.message))
            })
        }
    }
}
