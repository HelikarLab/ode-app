import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/NavBar'
import ImportSbmlForm from './components/ImportSbmlForm'
import SavedModels from './components/SavedModels'
import ModelTab from './components/ModelTab'
import SimulationTab from './components/SimulationTab/'
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'

toast.configure({
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 2000,
})

var layouts = {
  lg: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ],
  md: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ],
  sm: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ],
  xs: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ],
  xxs: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ],
}

const TestLayout = () => (
  <ResponsiveGridLayout
    className="layout"
    layouts={layouts}
    width="1500"
    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
  >
    <div key="1" style={{ backgroundColor: 'red' }}>
      1
    </div>
    <div key="2">2</div>
    <div key="3">3</div>
  </ResponsiveGridLayout>
)

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
          <Route path="/test" component={TestLayout} />
          <Route path="/" component={ModelTab} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  )
}

export default App
