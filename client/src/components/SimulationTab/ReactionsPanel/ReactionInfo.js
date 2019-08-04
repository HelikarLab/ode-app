import React from 'react'
import { prettyPrint } from '../../../utils'

function ReactionInfo({ reaction }) {
  return (
    <React.Fragment>
      <div className="flex">Name: {reaction.name}</div>
      <div className="flex">ID: {reaction.id}</div>
      <div className="flex">Reversible: {String(reaction.reversible)}</div>
      <div className="flex">Modifiers: {prettyPrint(reaction.modifiers)}</div>
    </React.Fragment>
  )
}

export default ReactionInfo
