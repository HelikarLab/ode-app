import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { toast } from 'react-toastify'
import Graph from './Graph'
import ReactionsList from './ReactionsList'
import MetabolitesList from './MetabolitesList'
import InfoPanel from './InfoPanel'

function ModelTab() {
  const [type, setType] = React.useState('')
  const [info, setInfo] = React.useState({})
  const [modal, setModal] = React.useState(false)

  const { reactions, metabolites, name, compartments } = useStoreState(
    state => state.modelTab.currentModel
  )

  const saveModel = useStoreActions(actions => actions.modelTab.saveModel)

  return (
    <React.Fragment>
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
          Save your SBML Model
        </ModalHeader>
        <ModalBody>
          Are you sure?
          <br />
          <br />
          <Button
            color="primary"
            onClick={async () => {
              const temp = await saveModel()
              if (temp.error) toast.error(temp.message)
              else toast.success(temp.message)
              setModal(!modal)
            }}
          >
            Yes
          </Button>
          {` `}
          <Button color="danger" onClick={() => setModal(!modal)}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
      <Row style={{ padding: 20 }}>
        <Col md="5">
          <Graph
            reactions={reactions}
            metabolites={metabolites}
            compartments={compartments}
          />
        </Col>
        <Col md="7">
          <Row>
            <Col>
              <ReactionsList
                reactions={reactions}
                setInfo={setInfo}
                setType={setType}
              />
            </Col>
            <Col>
              <MetabolitesList
                metabolites={metabolites}
                setInfo={setInfo}
                setType={setType}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 30 }}>
            <Col>
              <InfoPanel type={type} data={info} />
            </Col>
            <Col>
              <Button
                style={{ float: 'right' }}
                outline
                color="success"
                onClick={() => setModal(!modal)}
                disabled={name ? false : true}
              >
                Save Model
              </Button>
            </Col>
          </Row>
          <Row>
            <Col />
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default ModelTab
