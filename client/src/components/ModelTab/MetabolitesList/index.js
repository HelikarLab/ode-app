import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

function MetabolitesList(props) {
  if (props.metabolites) {
    return (
      <div>
        <h4 className="text-muted">Metabolites</h4>
        <ListGroup flush style={{ height: '250px', overflowY: 'auto' }}>
          {props.metabolites.map(metabolite => (
            <ListGroupItem
              key={metabolite.id}
              tag="button"
              action
              onClick={() => {
                props.setInfo(metabolite)
                props.setType('metabolite')
              }}
            >
              {metabolite.id} - {metabolite.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  } else {
    return <div>No data</div>
  }
}

export default MetabolitesList
