import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'reactstrap'

function ReactionsList(props) {
  if (props.reactions) {
    return (
      <div>
        <h4 className="text-muted">Reactions</h4>
        <ListGroup
          flush
          style={{ height: '250px', overflowY: 'auto' }}
          className="nonDraggableArea"
          data-test="reactions-list"
        >
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
              {reaction.id} - {reaction.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  } else {
    return <div>No data</div>
  }
}

ReactionsList.propTypes = {
  reactions: PropTypes.array,
  setInfo: PropTypes.func,
  setType: PropTypes.func,
}

ReactionsList.defaultProps = {
  reactions: [],
  setInfo: () => {},
  setType: () => {},
}

export default ReactionsList
