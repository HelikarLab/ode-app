import React from 'react'
import PropTypes from 'prop-types'
import { Button, Label } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import { useStoreActions } from 'easy-peasy'
import _ from 'lodash'
import { prettyPrint } from '../../../utils'

/*
Ratelaw Form Component:
Displays a form to take in particular parameters from
the user. These parameters depend upon the ratelaw
used and if the reaction is reversible or not. If custom rate
is selected takes in the rate equation instead.
*/

function RatelawForm({ ratelaw, reaction, closeModal }) {
  const { setRatelaw } = useStoreActions(actions => actions.simulationTab)
  let element
  switch (ratelaw) {
    case 'mass-action':
      if (reaction.reversible) {
        element = (
          <React.Fragment>
            <Label>Forward Parameter (k1):</Label>
            <Field className="form-control" name="k1" type="number" />
            <Label>Backward Parameter (k2):</Label>
            <Field className="form-control" name="k2" type="number" />
          </React.Fragment>
        )
      } else {
        element = (
          <React.Fragment>
            <Label>Parameter (k1):</Label>
            <Field className="form-control" name="k1" type="number" />
          </React.Fragment>
        )
      }
      break
    case 'michaelis-menten':
      if (reaction.reversible) {
        element = (
          <React.Fragment>
            <Label>Vfmax:</Label>
            <Field className="form-control" name="k1" type="number" />
            <Label>Vrmax:</Label>
            <Field className="form-control" name="k2" type="number" />
            <Label>KSm:</Label>
            <Field className="form-control" name="k3" type="number" />
            <Label>KPm:</Label>
            <Field className="form-control" name="k4" type="number" />
          </React.Fragment>
        )
      } else {
        element = (
          <React.Fragment>
            <Label>Vmax:</Label>
            <Field className="form-control" name="k1" type="number" />
            <Label>Km:</Label>
            <Field className="form-control" name="k2" type="number" />
          </React.Fragment>
        )
      }
      break
    case 'hill-equation':
      element = (
        <React.Fragment>
          <Label>Vmax:</Label>
          <Field className="form-control" name="k1" type="number" />
          <Label>
            K<sub>0.5</sub>:
          </Label>
          <Field className="form-control" name="k2" type="number" />
          <Label>Hill coefficient:</Label>
          <Field className="form-control" name="k3" type="number" />
        </React.Fragment>
      )
      break
    case 'custom-rate':
      if (reaction.reversible) {
        element = (
          <React.Fragment>
            <div>
              Species available:{' '}
              {prettyPrint(
                _.concat(reaction.reactants, reaction.products),
                'id'
              )}
            </div>
            <Label>Custom Forward Rate:</Label>
            <Field className="form-control" name="rateForward" type="text" />
            <p>For example: 0.5 * some_specie</p>
            <Label>Custom Backward Rate:</Label>
            <Field className="form-control" name="rateBackward" type="text" />
            <p>For example: 0.5 * some_specie</p>
          </React.Fragment>
        )
      } else {
        element = (
          <React.Fragment>
            <div>
              Species available:{' '}
              {prettyPrint(
                _.concat(reaction.reactants, reaction.products),
                'id'
              )}
            </div>
            <Label>Custom Rate:</Label>
            <Field className="form-control" name="rate" type="text" />
            <p>For example: 0.5 * some_specie</p>
          </React.Fragment>
        )
      }
      break
    default:
      break
  }

  return (
    <div>
      <Formik
        initialValues={{
          k1: 0,
          k2: 0,
          k3: 0,
          k4: 0,
          rate: '',
          rateForward: '',
          rateBackward: '',
        }}
        onSubmit={async (values, actions) => {
          // if custom rate is selected the rate is individual set as object properties
          if (ratelaw === 'custom-rate') {
            if (reaction.reversible) {
              setRatelaw({
                id: reaction.id,
                ratelaw,
                rateForward: values.rateForward,
                rateBackward: values.rateBackward,
              })
            } else {
              setRatelaw({
                id: reaction.id,
                ratelaw,
                rate: values.rate,
              })
            }
          } else {
            /**
             * Takes all the parameters input and parses it into a single array
             * This is appropriately handled in the backend
             */
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
          }
          closeModal()
        }}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} data-test="ratelaw-form">
            {element}
            <br />
            <Button
              type="submit"
              className="btn btn-success"
              data-test="ratelaw-submit-button"
            >
              Submit
            </Button>
          </Form>
        )}
      />
    </div>
  )
}

RatelawForm.propTypes = {
  ratelaw: PropTypes.string,
  reaction: PropTypes.object,
  closeModal: PropTypes.func,
}

RatelawForm.defaultProps = {
  ratelaw: '',
  reaction: {},
  closeModal: () => {},
}

export default RatelawForm
