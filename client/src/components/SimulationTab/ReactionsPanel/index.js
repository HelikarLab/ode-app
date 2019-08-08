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
  UncontrolledTooltip,
} from 'reactstrap'
import { Icon } from 'react-icons-kit'
import { infoCircle } from 'react-icons-kit/fa/infoCircle'
import RatelawForm from './RatelawForm'
import ReactionInfo from './ReactionInfo'

function ReactionsPanel() {
  const [modal, setModal] = React.useState(false)
  const [reactionForRatelaw, setReactionForRatelaw] = React.useState({})
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
            reaction={reactionForRatelaw}
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
                      {reaction.id}: {reaction.reactionString}{' '}
                      <Icon icon={infoCircle} id={`${reaction.id}-info`} />
                      <UncontrolledTooltip
                        placement="right"
                        target={`${reaction.id}-info`}
                      >
                        <ReactionInfo reaction={reaction} />
                      </UncontrolledTooltip>
                    </th>
                    <th>
                      <Input
                        onChange={e => {
                          if (!(e.target.value === '')) setModal(!modal)
                          setRatelaw(e.target.value)
                          setReactionForRatelaw(reaction)
                        }}
                        type="select"
                      >
                        <option value="">Set a ratelaw!</option>
                        <option value="mass-action">Mass Action</option>
                        {reaction.modifiers.length === 0 ||
                        (reaction.reactants.length > 1 ||
                          reaction.products.length > 1) ? (
                          <React.Fragment />
                        ) : (
                          <option value="michaelis-menten">
                            Michaelis Menten
                          </option>
                        )}
                        {reaction.modifiers.length === 0 ||
                        (reaction.reactants.length > 1 ||
                          reaction.products.length > 1) ||
                        reaction.reversible ? (
                          <React.Fragment />
                        ) : (
                          <option value="hill-equation">
                            Hill Kinetics Equation
                          </option>
                        )}
                        <option value="custom-rate">Custom Rate</option>
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
