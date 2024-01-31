import { useEffect, useState } from "react"
import axiosInstance from "../utilities/axiosInstance"


const usePost = (url: string, body: object) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const Post = () => {
        setLoading(true)
        axiosInstance.post(url, body).then(response => {
            setData(response.data)
        }).catch(err => {
            setError(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return { data, loading, error,Post }
}

export default usePost