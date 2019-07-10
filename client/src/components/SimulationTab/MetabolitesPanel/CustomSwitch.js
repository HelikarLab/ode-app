import React from 'react'
import { CustomInput } from 'reactstrap'

function CustomSwitch({ metaboliteId, toggle }) {
  const [switched, setSwitched] = React.useState(true)

  return (
    <CustomInput
      type="switch"
      id={metaboliteId}
      onChange={e => {
        setSwitched(s => !s)
        toggle(metaboliteId)
      }}
      checked={switched}
    />
  )
}

export default CustomSwitch
