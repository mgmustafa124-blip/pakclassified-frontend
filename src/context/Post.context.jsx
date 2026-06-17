import { useState, useEffect, createContext } from "react";

export const PostContext = createContext({
    post: null,
    setpost: () => { }
})

export default function PostProvider({ children }) {

    const [post, setpost] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/Post/read")
            .then(res => res.json())
            .then(data => {
                setpost(data);
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <PostContext.Provider value={{post,setpost}}>
            {children}
        </PostContext.Provider>
    )
}