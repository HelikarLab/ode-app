/* eslint-env browser */
import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Button, Form, FormText, FormGroup } from 'reactstrap'
import { importSbml } from '../../store/actions/actionCreators'
import { useStoreActions } from 'easy-peasy'

function ImportSbmlForm({ closeModal }) {
  const importSbml = useStoreActions(action => action.importSbml)

  return (
    <React.Fragment>
      <Formik
        initialValues={{ file: '' }}
        onSubmit={(values, actions) => {
          if (values.file) {
            importSbml(values.file)
            closeModal()
          }
        }}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <FormGroup>
              <input
                required
                type="file"
                name="file"
                placeholder="Upload"
                onChange={event => {
                  props.setFieldValue('file', event.currentTarget.files[0])
                }}
              />
              <FormText color="muted">
                Please upload a .sbml or .xml file which is formatted atleast in
                level 2 SBML for kinetic (ODE) models.
              </FormText>
            </FormGroup>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      />
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    state,
  }
}

export default connect(
  mapStateToProps,
  { importSbml }
)(ImportSbmlForm)
