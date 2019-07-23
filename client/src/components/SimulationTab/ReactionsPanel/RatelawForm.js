import React from 'react'
import { Button, Label } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import { useStoreActions } from 'easy-peasy'

function RatelawForm({ ratelaw, reaction, closeModal }) {
  const { setRatelaw } = useStoreActions(actions => actions.simulationTab)

  return (
    <div>
      <Formik
        initialValues={{
          k1: 0,
          k2: 0,
        }}
        onSubmit={async (values, actions) => {
          let parameters = values
          let parametersArr = []
          for (let property in parameters) {
            if (parameters.hasOwnProperty(property)) {
              parametersArr.push(parameters[property])
            }
          }
          setRatelaw({
            id: reaction.id,
            ratelaw,
            parameters: parametersArr,
          })
          closeModal()
        }}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {ratelaw === 'mass-action' && reaction.reversible ? (
              <React.Fragment>
                <Label>Forward Parameter (k1):</Label>
                <Field className="form-control" name="k1" type="number" />
                <Label>Backward Parameter (k2):</Label>
                <Field className="form-control" name="k2" type="number" />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Label>Parameter (k1):</Label>
                <Field className="form-control" name="k1" type="number" />
              </React.Fragment>
            )}
            <br />
            <Button type="submit" className="btn btn-success">
              Submit
            </Button>
          </Form>
        )}
      />
    </div>
  )
}

export default RatelawForm
