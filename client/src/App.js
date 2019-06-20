import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/NavBar'
import ImportSbmlForm from './components/ImportSbmlForm'
import SavedModels from './components/SavedModels'
import ModelTab from './components/ModelTab'
import SimulationTab from './components/SimulationTab'

toast.configure({
  position: toast.POSITION.BOTTOM_RIGHT,
})

function App() {
  const [importModal, setImportModal] = React.useState(false)
  const [savedModal, setSavedModal] = React.useState(false)

  return (
    <React.Fragment>
      <HashRouter>
        <NavBar
          importModel={() => setImportModal(!importModal)}
          savedModels={() => setSavedModal(!importModal)}
        />
        <Modal isOpen={importModal} toggle={() => setImportModal(!importModal)}>
          <ModalHeader toggle={() => setImportModal(!importModal)}>
            Import an existing SBML Model
          </ModalHeader>
          <ModalBody>
            <ImportSbmlForm closeModal={() => setImportModal(!importModal)} />
          </ModalBody>
        </Modal>
        <Modal isOpen={savedModal} toggle={() => setSavedModal(!savedModal)}>
          <ModalHeader toggle={() => setSavedModal(!savedModal)}>
            Saved Models
          </ModalHeader>
          <ModalBody>
            <SavedModels />
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
