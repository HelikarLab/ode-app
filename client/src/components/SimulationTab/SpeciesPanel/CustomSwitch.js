import React from 'react'
import PropTypes from 'prop-types'
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

CustomSwitch.propTypes = {
  specieId: PropTypes.string,
  toggle: PropTypes.func,
}

CustomSwitch.defaultProps = {
  specieId: '',
  toggle: () => {},
}

export default CustomSwitch
