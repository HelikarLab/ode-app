import React from 'react'
import { connect } from 'react-redux'

function NodeGraph (props) {
  return <div>
    <dl class='row'>
      <dt class='col-sm-3'>Model ID</dt>
      <dd class='col-sm-9'>{props.modelId}</dd>

      <dt class='col-sm-3'>Model Name</dt>
      <dd class='col-sm-9'>{props.modelName}</dd>

      <dt class='col-sm-3'>SBML Level</dt>
      <dd class='col-sm-9'>{props.sbmlLevel}</dd>

      <dt class='col-sm-3'>Model Name</dt>
      <dd class='col-sm-9'>{props.sbmlVersion}</dd>
    </dl>
  </div>
}

function mapStateToProps (state) {
  return {
    modelName: state.data.model.name,
    modelId: state.data.model.id,
    sbmlLevel: state.data.model.sbmlLevel,
    sbmlVersion: state.data.model.sbmlVersion
  }
}

export default connect(mapStateToProps, {})(NodeGraph)
