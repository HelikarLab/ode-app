import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'

function SimulationOne() {
  return (
    <h2 className="text-muted text-center" style={{ marginTop: 100 }}>
      Simulation 1
    </h2>
  )
}

function SimulationTwo() {
  return (
    <h2 className="text-muted text-center" style={{ marginTop: 100 }}>
      Simulation 2
    </h2>
  )
}

function SimulationTab() {
  const [active, setActive] = React.useState('1')

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === '1' ? true : false}
            onClick={() => {
              setActive('1')
            }}
            href="/#/simulation/1"
          >
            Simulation 1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2' ? true : false}
            onClick={() => {
              setActive('2')
            }}
            href="/#/simulation/2"
          >
            Simulation 2
          </NavLink>
        </NavItem>
      </Nav>
      <Switch>
        <Route path="/simulation/1" component={SimulationOne} />
        <Route path="/simulation/2" component={SimulationTwo} />
      </Switch>
    </div>
  )
}

export default SimulationTab
