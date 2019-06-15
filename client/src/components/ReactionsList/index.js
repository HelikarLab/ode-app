import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

function ReactionsList(props) {
  if (props.reactions) {
    return (
      <div>
        <h4 className="text-muted">Reactions</h4>
        <ListGroup style={{ height: '250px', overflowY: 'scroll' }}>
          {props.reactions.map(reaction => (
            <ListGroupItem
              key={reaction.id}
              tag="button"
              action
              onClick={() => {
                props.setInfo(reaction)
                props.setType('reaction')
              }}
            >
              {reaction.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  } else {
    return <div>No data</div>
  }
}

export default ReactionsList
