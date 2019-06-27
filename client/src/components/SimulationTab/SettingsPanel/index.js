import React from 'react'
import { useStoreActions } from 'easy-peasy'
import { Card, CardBody, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import Button from '../../Button'

function SettingsPanel() {
  const { setRun, setIcmin, setIcmax, setTimestep } = useStoreActions(
    actions => actions
  )

  return (
    <Card>
      <CardBody>
        <h4 className="text-muted" style={{ marginBottom: 20 }}>
          Settings
        </h4>
        <Form>
          <FormGroup row>
            <Label for="timestep" sm={5}>
              Timestep:
            </Label>
            <Col sm={7}>
              <Input
                type="number"
                name="timestep"
                id="timestep"
                placeholder="in seconds"
                onChange={e => setTimestep(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="icmin" sm={5}>
              IC Min:
            </Label>
            <Col sm={7}>
              <Input
                type="number"
                name="icmin"
                id="icmin"
                placeholder={0}
                onChange={e => setIcmin(Number(e.target.value))}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="icmax" sm={5}>
              IC Max:
            </Label>
            <Col sm={7}>
              <Input
                type="number"
                name="icmax"
                id="icmax"
                placeholder={100}
                onChange={e => setIcmax(Number(e.target.value))}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="globalRatelaw" sm={5}>
              Global Ratelaw:
            </Label>
            <Col sm={7}>
              <Input type="select" name="globalRatelaw" id="globalRatelaw">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </Input>
            </Col>
          </FormGroup>
          <Button className="btn btn-success" onClick={() => setRun()}>
            Run
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}

export default SettingsPanel
