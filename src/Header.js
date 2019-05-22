import React from 'react'
import { Row, Col } from 'react-bootstrap'

import { Social } from './Social'

export const Header = ({ children }) => (
    <Row className='my-4 align-items-center' style={headerStyle.container}>
        <Col xs={6} sm={5} className="">
            <a href="https://tomjohnhall.com" target="_blank" rel="noopener noreferrer" >
                <span className={'header-title'} style={headerStyle.title}> tom john hall </span>
            </a>
        </Col>
        <Col xs={3} sm={2}>
            {children}
        </Col>
        <Col xs={3} style={{ padding: '0px' }} className="justify-content-end" >
            <Social />
        </Col>
    </Row>
)

const headerStyle = {
    title: {
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
    },
    container: {
        position: 'relative',
        zIndex: '9',
        background: `url(${require('./media/beach4.jpg')})`,
        backgroundSize: '140%'
    }
}