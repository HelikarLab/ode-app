import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import {
  Card,
  CardBody,
  CustomInput,
  Table,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import RatelawForm from './RatelawForm'

function ReactionsPanel() {
  const [modal, setModal] = React.useState(false)
  const [reaction, setReaction] = React.useState({})
  const [ratelaw, setRatelaw] = React.useState('')

  const reactions = useStoreState(
    state => state.modelTab.currentModel.reactions
  )

  const { switchReaction } = useStoreActions(actions => actions.simulationTab)

  return (
    <React.Fragment>
      <Modal
        isOpen={modal}
        toggle={() => {
          setModal(!modal)
        }}
      >
        <ModalHeader>Set Ratelaw</ModalHeader>
        <ModalBody>
          <RatelawForm
            ratelaw={ratelaw}
            reaction={reaction}
            closeModal={() => setModal(false)}
          />
        </ModalBody>
      </Modal>
      <Card>
        <CardBody>
          <h4 className="text-muted" style={{ marginBottom: 20 }}>
            Reactions
          </h4>
          <div style={{ overflowY: 'auto', maxHeight: 200 }}>
            <Table borderless hover>
              <thead>
                <tr>
                  <th>Toggle</th>
                  <th>Reaction String</th>
                  <th>Ratelaw</th>
                </tr>
              </thead>
              <tbody>
                {reactions.map(reaction => (
                  <tr key={reaction.id}>
                    <th>
                      <CustomInput
                        type="switch"
                        id={reaction.id}
                        onChange={() => {
                          switchReaction(reaction)
                        }}
                      />
                    </th>

                    <th>
                      {reaction.id}: {reaction.reactionString}
                    </th>
                    <th>
                      <Input
                        onChange={e => {
                          if (!(e.target.value === '')) setModal(!modal)
                          setRatelaw(e.target.value)
                          setReaction(reaction)
                        }}
                        type="select"
                      >
                        <option value="">Set a ratelaw!</option>
                        <option value="mass-action">Mass Action</option>
                      </Input>
                    </th>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default ReactionsPanel
