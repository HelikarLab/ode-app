import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import {
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  CustomInput,
} from 'reactstrap'

function ReactionsPanel() {
  const reactions = useStoreState(
    state => state.modelTab.currentModel.reactions
  )

  const { switchReaction } = useStoreActions(actions => actions.simulationTab)

  return (
    <Card>
      <CardBody>
        <h4 className="text-muted" style={{ marginBottom: 20 }}>
          Reactions
        </h4>
        <ListGroup flush style={{ overflowY: 'auto', maxHeight: 200 }}>
          {reactions.map(reaction => (
            <ListGroupItem style={{ display: 'flex' }} key={reaction.id}>
              <CustomInput
                type="switch"
                id={reaction.id}
                onChange={() => {
                  switchReaction(reaction)
                }}
              />
              <span style={{ marginRight: 20 }}>
                {reaction.id}: {reaction.reactionString}
              </span>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  )
}

export default ReactionsPanel
