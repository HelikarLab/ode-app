import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import { Helmet } from 'react-helmet'
import NavBar from './components/NavBar'
import ImportSbmlForm from './components/ImportSbmlForm'
import ReactionsList from './components/ReactionsList'
import MetabolitesList from './components/MetabolitesList'
import Graph from './components/Graph'
import MetaDisplay from './components/MetaDisplay'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [modal, setModal] = React.useState(false)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>ODE-APP</title>
        </Helmet>
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
        <div>
          <Row>
            <Col>
              <Graph />
            </Col>
            <Col>
              <Row>
                <ReactionsList />
              </Row>
              <Row>
                <MetabolitesList />
              </Row>
            </Col>
          </Row>
          <Row>
            <div className="container">
              <MetaDisplay />
            </div>
          </Row>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
