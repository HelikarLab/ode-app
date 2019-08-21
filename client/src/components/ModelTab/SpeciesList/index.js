import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'reactstrap'

function SpeciesList(props) {
  if (props.species) {
    return (
      <div>
        <h4 className="text-muted">Species</h4>
        <ListGroup
          flush
          style={{ height: '250px', overflowY: 'auto' }}
          data-test="species-list"
        >
          {props.species.map(specie => (
            <ListGroupItem
              key={specie.id}
              tag="button"
              action
              onClick={() => {
                props.setInfo(specie)
                props.setType('specie')
              }}
            >
              {specie.id} - {specie.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  } else {
    return <div>No data</div>
  }
}

SpeciesList.propTypes = {
  species: PropTypes.array,
  setInfo: PropTypes.func,
  setType: PropTypes.func,
}

SpeciesList.defaultProps = {
  species: [],
  setInfo: () => {},
  setType: () => {},
}

export default SpeciesList
