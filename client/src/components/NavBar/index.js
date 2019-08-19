import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

function NavBar(props) {
  const [toggle, setToggle] = React.useState(false)

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">ODE App</NavbarBrand>
      <NavbarToggler
        onClick={() => {
          setToggle(c => !c)
        }}
      />
      <Collapse isOpen={toggle} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/#/model">Model</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/#/simulation">Simulation</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret data-test="options">
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                onClick={props.importModel}
                data-test="importOption"
              >
                Import Model
              </DropdownItem>
              <DropdownItem onClick={props.savedModels}>
                Saved Models
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default NavBar
