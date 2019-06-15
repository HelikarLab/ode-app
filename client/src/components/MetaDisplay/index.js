import React from 'react'
import { connect } from 'react-redux'

function MetaDisplay(props) {
  return (
    <div>
      <h5 className="text-muted">Model Information</h5>
      <dl className="row">
        <dt className="col-sm-3">Model ID</dt>
        <dd className="col-sm-9">{props.modelId}</dd>

        <dt className="col-sm-3">Model Name</dt>
        <dd className="col-sm-9">{props.modelName}</dd>

        <dt className="col-sm-3">SBML Level</dt>
        <dd className="col-sm-9">{props.sbmlLevel}</dd>

        <dt className="col-sm-3">SBML Version</dt>
        <dd className="col-sm-9">{props.sbmlVersion}</dd>
      </dl>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    modelName: state.data.model.name,
    modelId: state.data.model.id,
    sbmlLevel: state.data.model.sbmlLevel,
    sbmlVersion: state.data.model.sbmlVersion,
  }
}

export default connect(
  mapStateToProps,
  {}
)(MetaDisplay)
