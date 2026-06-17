import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'

function Data() {

    const [data, setdata] = useState([])

    useEffect(() => {
        try {
            fetch("https://jsonplaceholder.typicode.com/comments")
                .then(data => data.json())
                .then(data => {
                    
                    setdata(data)
                })

        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            <Container>
                <Row>
                    {
                        data.map((i) =>

                            <Col className=" d-flex " md={4}>

                                <Card className=' mb-3 p-3 bg-primary-subtle'>
                                    <Card.Title className=''><span className=' fs-3 fw-bold'>Name: </span> {i.name}</Card.Title>
                                    <Card.Title><span className=' fs-3 fw-bold'>Email: </span> {i.email}</Card.Title>
                                    <Card.Title><span className=' fs-3 fw-bold'>Body: </span> {i.body}</Card.Title>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </Container>

        </>
    )
}

export default Data
