import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { Formik, Field } from 'formik'
import { Card, CardBody, Form, FormGroup, Label, Col } from 'reactstrap'
import * as Yup from 'yup'
import Button from '../../Button'

const settingsSchema = Yup.object().shape({
  time: Yup.number()
    .min(2)
    .max(1000)
    .required('Required'),
  globalRatelaw: Yup.string().required('Required'),
})

function SettingsPanel() {
  const { simulate, setIcmin, setIcmax } = useStoreActions(
    actions => actions.simulationTab
  )
  const { icmin, icmax } = useStoreState(state => state.simulationTab)

  return (
    <Card>
      <CardBody>
        <h4 className="text-muted" style={{ marginBottom: 20 }}>
          Settings
        </h4>
        <Formik
          initialValues={{
            time: 0,
            icmin,
            icmax,
            globalRatelaw: 'rl1',
          }}
          validationSchema={settingsSchema}
          onSubmit={async (values, actions) => {
            await simulate({
              time: values.time,
              globalRatelaw: values.globalRatelaw,
            })
            actions.setSubmitting(false)
          }}
          render={({ handleSubmit, isSubmitting, errors, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Label for="time" sm={5}>
                  Time:
                </Label>
                <Col sm={7}>
                  <Field
                    className={`form-control ${
                      errors.time ? 'is-invalid' : ''
                    }`}
                    type="number"
                    name="time"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="icmin" sm={5}>
                  IC Min:
                </Label>
                <Col sm={7}>
                  <Field
                    className="form-control"
                    type="number"
                    name="icmin"
                    onChange={e => {
                      setFieldValue('icmin', e.target.value)
                      setIcmin(Number(e.target.value))
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="icmax" sm={5}>
                  IC Max:
                </Label>
                <Col sm={7}>
                  <Field
                    className="form-control"
                    type="number"
                    name="icmax"
                    onChange={e => {
                      setFieldValue('icmax', e.target.value)
                      setIcmax(Number(e.target.value))
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="globalRatelaw" sm={5}>
                  Global Ratelaw:
                </Label>
                <Col sm={7}>
                  <Field
                    className=" form-control"
                    component="select"
                    name="globalRatelaw"
                  >
                    <option value="rl1">Ratelaw 1</option>
                    <option value="rl2">Ratelaw 2</option>
                    <option value="rl3">Ratelaw 3</option>
                  </Field>
                </Col>
              </FormGroup>
              <Button
                type="submit"
                loading={isSubmitting}
                className="btn btn-success"
              >
                Run
              </Button>
            </Form>
          )}
        />
      </CardBody>
    </Card>
  )
}

export default SettingsPanel
