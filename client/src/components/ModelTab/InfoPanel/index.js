import React from 'react'
import PropTypes from 'prop-types'
import { prettyPrint } from '../../../utils'

function InfoPanel(props) {
  // If specie is clicked shows information species
  if (props.type === 'specie') {
    return (
      <div data-test="info-panel">
        <dl className="row nonDraggableArea">
          <dt className="col-sm-5">Specie ID</dt>
          <dd className="col-sm-7">{props.data.id}</dd>

          <dt className="col-sm-5">Specie Name</dt>
          <dd className="col-sm-7">{props.data.name}</dd>

          <dt className="col-sm-5">Compartment</dt>
          <dd className="col-sm-7">{props.data.compartment}</dd>

          <dt className="col-sm-5">Initial Concentration</dt>
          <dd className="col-sm-7">{props.data.initialConcentration}</dd>
        </dl>
      </div>
    )
    // If reaction is clicked shows information reaction
  } else if (props.type === 'reaction') {
    return (
      <div data-test="info-panel">
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

InfoPanel.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
}

InfoPanel.defaultProps = {
  type: '',
  data: {},
}

export default InfoPanel
