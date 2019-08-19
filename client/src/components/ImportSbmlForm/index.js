import React from 'react'
import { Formik } from 'formik'
import { useStoreActions } from 'easy-peasy'
import { toast } from 'react-toastify'
import { Button, Form, FormText, FormGroup } from 'reactstrap'

function ImportSbmlForm({ closeModal }) {
  const importSbml = useStoreActions(actions => actions.importSbml)

  return (
    <React.Fragment>
      <Formik
        initialValues={{ file: '' }}
        onSubmit={async (values, actions) => {
          if (values.file) {
            const data = await importSbml(values.file)
            if (data.error) toast.error(data.message)
            else {
              closeModal()
            }
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
            <Button
              color="primary"
              type="submit"
              data-test="import-submit-button"
            >
              Submit
            </Button>
          </Form>
        )}
      />
    </React.Fragment>
  )
}

export default ImportSbmlForm
