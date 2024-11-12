import React from 'react'

export default function useSignup(props: any) {
    const {
        setLoading,
        username,
        email,
        password,
        number,
        userId,
        setErrorData,
        dispatch,
        fetchUserDone,
        setShowVerification,
        axiosInstance,
        facebookLink,
        instagramLink,
        setInstagramError,
        setFacebookError,
        t
    } = props
    return {
        Signup: () => {
            // const regexFacebook = /^https?:\/\/(?:www\.)?(?:facebook|fb)\.com\/(?:.+)$/;
            // const regexInstagram = /^https?:\/\/(?:www\.)?(?:instagram)\.com\/(?:.+)$/;
            // if (facebookLink.current === '' && instagramLink.current === '') {
            //     setFacebookError('')
            //     setInstagramError(t('pageError'))
            //     return
            // }
            // if (!regexFacebook.test(facebookLink.current) && facebookLink.current !== '') {
            //     console.log('facebokError')
            //     setInstagramError('')
            //     setFacebookError(t('facebookError'))
            //     return
            // }
            // if (!regexInstagram.test(instagramLink.current) && instagramLink.current !== '') {
            //     setFacebookError('')
            //     setInstagramError(t('instagramError'))
            //     return
            // }
            // setInstagramError('')
            // setFacebookError('')
            setLoading(true)
            const userData = {
                'username': username.current,
                'email': email.current,
                'password': password.current,
                'number': number.current,
                'facebookLink': facebookLink.current,
                'instagramLink': instagramLink.current,
                'role': window.location.href.includes('seller') ? 'Seller' : 'Affiliate',
            }
            axiosInstance.post('signup', userData).then((res: any) => {
                localStorage.setItem('token', res.data.accessToken)
                axiosInstance.post('current-user', { data: { 'token': res.data.accessToken } }).then((response: any) => {
                    dispatch(fetchUserDone(response.data.user))
                    userId.current = response.data._id
                    setShowVerification(true)
                }).finally(() => {
                    setLoading(false)
                })
            }).catch((err: any) => {
                setErrorData(err.response.data)
                setLoading(false)
            })
        }
    }
}
