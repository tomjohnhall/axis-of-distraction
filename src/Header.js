import React from 'react'
import { Row, Col } from 'react-bootstrap'

import { Social } from './Social'

export const Header = ({ children }) => (
    <Row className='my-4 align-items-center' style={{ position: 'relative', zIndex: '9' }}>
        <Col xs={10} sm={5} className="">
            <span style={playerStyle.title}> tom john hall </span>
        </Col>
        <Col xs={2}>
            {children}
        </Col>
        <Col sm={5} xs={12} className="justify-content-end" >
            <Social />
        </Col>
    </Row>
)

const playerStyle = {
    title: {
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
        fontWeight: '800',
        fontSize: '1.8em',
        color: '#ffffff'
    }
}