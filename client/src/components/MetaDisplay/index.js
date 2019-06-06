import React from 'react'
import { connect } from 'react-redux'

function MetaDisplay(props) {
  return (
    <dl className="row">
      <dt className="col-sm-3">Model ID</dt>
      <dd className="col-sm-9">{props.modelId}</dd>

      <dt className="col-sm-3">Model Name</dt>
      <dd className="col-sm-9">{props.modelName}</dd>

      <dt className="col-sm-3">SBML Level</dt>
      <dd className="col-sm-9">{props.sbmlLevel}</dd>

      <dt className="col-sm-3">Model Name</dt>
      <dd className="col-sm-9">{props.sbmlVersion}</dd>
    </dl>
  )
}

function mapStateToProps(state) {
  return {
    modelName: state.data.model.name,
    modelId: state.data.model.id,
    sbmlLevel: state.data.model.sbmlLevel,
    sbmlVersion: state.data.model.sbmlVersion
  }
}

export default connect(
  mapStateToProps,
  {}
)(MetaDisplay)
