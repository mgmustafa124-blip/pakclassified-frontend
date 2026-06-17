// import { createContext, useState, useEffect } from "react";

// export const ProductContext = createContext({
//     product: null,
//     setProduct: () => { }
// })


// export default function ProductProvider({ children }) {
//     const [product, setProduct] = useState([])

//     useEffect(() => {
//         try {
//             async function fetchproduct() {
//                 const res = await fetch("https://jsonplaceholder.typicode.com/comments")
//                 const data = await  res.json()
//                 setProduct(data)
//                 // console.log("Running",data)
//             }
//             fetchproduct()
//         } catch (error) {
//             console.log(error)
//         }
        
//     }, [])

//     return (
//         <ProductContext.Provider value={{ product, setProduct }}>
//             {children}
//         </ProductContext.Provider>
//     )
// }

