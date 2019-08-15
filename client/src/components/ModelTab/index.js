import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { toast } from 'react-toastify'
import { Responsive, WidthProvider } from 'react-grid-layout'
import Graph from './Graph'
import ReactionsList from './ReactionsList'
import MetabolitesList from './MetabolitesList'
import InfoPanel from './InfoPanel'

const ResponsiveGridLayout = WidthProvider(Responsive)

function ModelTab() {
  const [type, setType] = React.useState('')
  const [info, setInfo] = React.useState({})
  const [modal, setModal] = React.useState(false)

  const { reactions, metabolites, name, compartments } = useStoreState(
    state => state.modelTab.currentModel
  )

  let layouts = {
    lg: [
      { i: 'graph', x: 0, y: 0, w: 6, h: 14, minW: 5, minH: 14, static: true },
      { i: 'reactions', x: 6, y: 0, w: 3, h: 7, minW: 3, minH: 7 },
      { i: 'metabolites', x: 9, y: 0, w: 3, h: 7, minW: 4, minH: 7 },
      { i: 'info', x: 6, y: 7, w: 6, h: 5, minW: 7, minH: 7 },
    ],
  }

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
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={40}
        items={4}
        onLayoutChange={() => {}}
        draggableCancel=".nonDraggableArea"
      >
        <div key="graph">
          <Graph
            reactions={reactions}
            metabolites={metabolites}
            compartments={compartments}
          />
        </div>
        <div key="reactions">
          <ReactionsList
            reactions={reactions}
            setInfo={setInfo}
            setType={setType}
          />
        </div>
        <div key="metabolites">
          <MetabolitesList
            metabolites={metabolites}
            setInfo={setInfo}
            setType={setType}
          />
        </div>
        <div key="info">
          <InfoPanel type={type} data={info} />
          <Button
            style={{ float: 'right' }}
            outline
            color="success"
            onClick={() => setModal(!modal)}
            disabled={name ? false : true}
          >
            Save Model
          </Button>
        </div>
      </ResponsiveGridLayout>
    </React.Fragment>
  )
}

export default ModelTab
