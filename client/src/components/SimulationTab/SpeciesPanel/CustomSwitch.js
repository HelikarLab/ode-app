import React from 'react'
import { CustomInput } from 'reactstrap'

function CustomSwitch({ specieId, toggle }) {
  const [switched, setSwitched] = React.useState(true)

  return (
    <CustomInput
      type="switch"
      id={specieId}
      onChange={e => {
        setSwitched(s => !s)
        toggle(specieId)
      }}
      checked={switched}
    />
  )
}

export default CustomSwitch
