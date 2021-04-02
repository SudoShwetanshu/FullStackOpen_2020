import React from 'react'
import {
  Link
} from 'react-router-dom'

import { Navbar, Nav } from 'react-bootstrap'

const Navigation = () => {
  const padding = {
    paddingRight: 20
  }
  return (
    <div>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand href='/'>BlogList App</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>home</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users'>users</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/blogs'>blogs</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Navigation
