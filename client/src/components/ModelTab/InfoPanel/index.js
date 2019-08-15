import React from 'react'
import { prettyPrint } from '../../../utils'

function InfoPanel(props) {
  if (props.type === 'metabolite') {
    return (
      <div>
        <dl className="row nonDraggableArea">
          <dt className="col-sm-5">Metabolite ID</dt>
          <dd className="col-sm-7">{props.data.id}</dd>

          <dt className="col-sm-5">Metabolite Name</dt>
          <dd className="col-sm-7">{props.data.name}</dd>

          <dt className="col-sm-5">Compartment</dt>
          <dd className="col-sm-7">{props.data.compartment}</dd>

          <dt className="col-sm-5">Initial Concentration</dt>
          <dd className="col-sm-7">{props.data.initialConcentration}</dd>
        </dl>
      </div>
    )
  } else if (props.type === 'reaction') {
    return (
      <div>
        <dl className="row nonDraggableArea">
          <dt className="col-sm-4">Reaction ID</dt>
          <dd className="col-sm-8">{props.data.id}</dd>

          <dt className="col-sm-4">Reaction Name</dt>
          <dd className="col-sm-8">{props.data.name}</dd>

          <dt className="col-sm-4">Reversible</dt>
          <dd className="col-sm-8">{String(props.data.reversible)}</dd>

          <dt className="col-sm-4">Reaction</dt>
          <dd className="col-sm-8">{props.data.reactionString}</dd>

          <dt className="col-sm-4">Modifiers</dt>
          <dd className="col-sm-8">{prettyPrint(props.data.modifiers)}</dd>
        </dl>
      </div>
    )
  } else {
    return <React.Fragment />
  }
}

export default InfoPanel
