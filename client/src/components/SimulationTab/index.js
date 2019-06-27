import React from 'react'
import { Row, Col } from 'reactstrap'
import SettingsPanel from './SettingsPanel'
import Graph from './Graph'
import MetabolitesPanel from './MetabolitesPanel'
import ReactionsPanel from './ReactionsPanel'

function SimulationTab() {
  return (
    <div style={{ padding: 10 }}>
      <Row>
        <Col sm="7">
          <Row>
            <Col sm="5">
              <SettingsPanel />
            </Col>
            <Col sm="7">
              <MetabolitesPanel />
            </Col>
          </Row>
          <Row>
            <ReactionsPanel />
          </Row>
        </Col>
        <Col sm="5">
          <Graph />
        </Col>
      </Row>
    </div>
  )
}

export default SimulationTab
