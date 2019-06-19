import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import NavBar from './components/NavBar'
import ImportSbmlForm from './components/ImportSbmlForm'
import ModelTab from './components/ModelTab'
import SimulationTab from './components/SimulationTab'

function App(props) {
  const [modal, setModal] = React.useState(false)

  return (
    <React.Fragment>
      <HashRouter>
        <NavBar
          importModel={() => {
            setModal(!modal)
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
        <Switch>
          <Route path="/simulation" component={SimulationTab} />
          <Route path="/" component={ModelTab} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  )
}

export default App
