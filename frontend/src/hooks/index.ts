import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


interface Blog{
    "id": string,
    "title": string,
    "content": string,
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id : string }) => {
    const [loading, setLoading] = useState((true));
    const [blog, setBlog] = useState<Blog>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blogs/${id}`, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {



    const [loading, setLoading] = useState((true));
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}