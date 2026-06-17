// import React, { useContext, useEffect } from 'react'
// import { ProductContext } from '../context/Product.context'
// import { Card, Container, Row, Col } from 'react-bootstrap'

// function Product() {
//     const products = useContext(ProductContext)

//     useEffect(()=>{
     
//     },[])

//     return (
//         <>
//             <Container>
//                 <Row>
//                     {
//                         products.product.map((i) =>

//                             <Col className=" d-flex " key={i.id} md={4}>

//                                 <Card className=' mb-3 p-3 bg-primary-subtle'>
//                                     <Card.Title className=''><span className=' fs-3 fw-bold'>Name: </span> {i.name}</Card.Title>
//                                     <Card.Title><span className=' fs-3 fw-bold'>Email: </span> {i.email}</Card.Title>
//                                     <Card.Title><span className=' fs-3 fw-bold'>Body: </span> {i.body}</Card.Title>
//                                 </Card>
//                             </Col>
//                         )
//                     }
//                 </Row>
//             </Container>

//         </>
//     )
// }

// export default Product
