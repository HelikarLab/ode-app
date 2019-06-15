import React from 'react'
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import NavBar from './components/NavBar'
import ImportSbmlForm from './components/ImportSbmlForm'
import { useStoreActions, useStore } from 'easy-peasy'
import { saveModel } from './store/actions/actionCreators'
import ModelTab from './components/ModelTab'

function App(props) {
  const [modal, setModal] = React.useState(false)
  // const

  return (
    <React.Fragment>
      <NavBar
        importModel={() => {
          setModal(!modal)
        }}
        saveModel={() => {
          props.saveModel(props.model, props.file)
        }}
      />
      <Modal
        isOpen={modal}
        toggle={() => {
          setModal(!modal)
        }}
      >
        <ModalHeader
          toggle={() => {
            setModal(!modal)
          }}
        >
          Import an existing SBML Model
        </ModalHeader>
        <ModalBody>
          <ImportSbmlForm
            closeModal={() => {
              setModal(!modal)
            }}
          />
        </ModalBody>
      </Modal>
      <ModelTab />
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    display: state.data.displayData,
    model: state.data.model,
    file: state.data.modelFile,
    imported: state.data.imported,
  }
}

export default connect(
  mapStateToProps,
  { saveModel }
)(App)
