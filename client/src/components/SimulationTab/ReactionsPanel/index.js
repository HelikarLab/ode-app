import React from 'react'
import { useStoreState } from 'easy-peasy'
import {
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  CustomInput,
} from 'reactstrap'

function ReactionsPanel() {
  const reactions = useStoreState(state => state.simulation.reactions)
  return (
    <Card>
      <CardBody>
        <h4 className="text-muted" style={{ marginBottom: 20 }}>
          Reactions
        </h4>
        <ListGroup flush style={{ overflowY: 'auto', maxHeight: 200 }}>
          {reactions.map(reaction => (
            <ListGroupItem style={{ display: 'flex' }} key={reaction.id}>
              <CustomInput type="checkbox" id={reaction.id} />
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
