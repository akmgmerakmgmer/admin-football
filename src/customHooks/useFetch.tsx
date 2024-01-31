import { useEffect, useState } from "react"
import axiosInstance from "../utilities/axiosInstance"


const useFetch = (url: string) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        axiosInstance.get(url).then(response => {
            setData(response.data)
        }).catch(err => {
            setError(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }, [url])
    return { data, loading, error }
}

export default useFetch