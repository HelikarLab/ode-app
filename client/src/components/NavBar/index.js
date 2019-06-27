import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap'

function NavBar(props) {
  const [active, setActive] = React.useState('model')

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">ODE App</NavbarBrand>
      <Nav navbar>
        <NavItem>
          <NavLink
            active={active === 'model' ? true : false}
            onClick={() => {
              setActive('model')
            }}
            href="/#/model"
          >
            Model
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === 'simulation' ? true : false}
            onClick={() => {
              setActive('simulation')
            }}
            href="/#/simulation"
          >
            Simulation
          </NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <NavItem style={{ marginRight: 20 }}>
          <Button color="primary" onClick={props.importModel}>
            Import Model
          </Button>
        </NavItem>
        <NavItem>
          <Button color="info" onClick={props.savedModels}>
            Saved Models
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default NavBar
