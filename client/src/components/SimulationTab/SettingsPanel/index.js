import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { Formik, Field } from 'formik'
import { Card, CardBody, Form, FormGroup, Label, Col } from 'reactstrap'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import Button from '../../Button'

const settingsSchema = Yup.object().shape({
  time: Yup.number()
    .min(2)
    .max(1000)
    .required('Required'),
  dataPoints: Yup.number()
    .min(2)
    .max(5000)
    .required('Required'),
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
            dataPoints: 500,
            icmin,
            icmax,
          }}
          validationSchema={settingsSchema}
          onSubmit={async (values, actions) => {
            try {
              const data = await simulate({
                time: values.time,
                dataPoints: values.dataPoints,
              })
              if (data.error) toast.error(data.message)
              else toast.success(data.message)
            } catch (err) {
              toast.error(err.message)
            }
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
                <Label for="dataPoints" sm={5}>
                  Data Points:
                </Label>
                <Col sm={7}>
                  <Field
                    className={`form-control ${
                      errors.dataPoints ? 'is-invalid' : ''
                    }`}
                    type="number"
                    name="dataPoints"
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
