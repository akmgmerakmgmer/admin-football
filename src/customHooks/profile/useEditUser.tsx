import React from 'react'

export default function useEditUser(props:any) {
    const {
        setNumberError,
        number,
        axiosInstance,
        setNumberLoading,
        user,
        setSuccessMessage,
        setShowSuccessMessage,
        dispatch,
        fetchUserDone,
        t,
        username,
        setUsernameError,
        setUsernameLoading
    } = props
    return {
        editNumber: () => {
            if (number.length !== 11) {
                setNumberError(t('number_min_length'))
                return;
            }
            setNumberError('')
            setNumberLoading(true)
            axiosInstance.put(`users/${user._id}`, { number: number }).then((response:any) => {
                setSuccessMessage(t('numberEdited'))
                setShowSuccessMessage(true)
                dispatch(fetchUserDone(response.data))
                setTimeout(() => {
                    setShowSuccessMessage(false)
                }, 3000)
            }).finally(() => {
                setNumberLoading(false)
            })
        },
        editUsername : () => {
            if (!username) {
                setUsernameError(t('field_required'))
                return;
            }
            setUsernameError('')
            setUsernameLoading(true)
            axiosInstance.put(`users/${user._id}`, { username: username }).then((response:any) => {
                setSuccessMessage(t('usernameEdited'))
                setShowSuccessMessage(true)
                dispatch(fetchUserDone(response.data))
                setTimeout(() => {
                    setShowSuccessMessage(false)
                }, 3000)
            }).finally(() => {
                setUsernameLoading(false)
            })
        }
    }
}
