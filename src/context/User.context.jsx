import { useEffect, useState, createContext } from "react";

export const UserContext = createContext({
    user: null,
    setuser: () => { }
})

export default function UserProvider({ children }) {

    const [user, setuser] = useState()

    useEffect(() => {
        try {
            if(!user){
                const userlogin = JSON.parse(localStorage.getItem("auth"))
                
                if (userlogin) {
                    setuser(userlogin.data)
                }
          }
        } catch (error) {
            console.log(error)
        }
    }, [])


    return (
        <UserContext.Provider  value={{user,setuser}}>
            {children}
        </UserContext.Provider>
    )
}