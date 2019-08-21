import React from 'react'
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types'
import './style.scss'

function Button({
  className,
  curved,
  color,
  children,
  loading,
  onClick,
  type,
  'data-test': dataTest,
}) {
  let classes = []

  // Setting classes as per props recieved
  classes.push(className)
  if (curved) {
    classes.push('curved-button')
  }

  let buttonContent

  // If loading prop is true changes the button content to a loader
  if (loading) {
    buttonContent = (
      <ReactLoading
        type={'bars'}
        color={color}
        height={'30px'}
        width={'30px'}
        className="button-loading-icon"
      />
    )
  } else {
    buttonContent = children
  }
  return (
    <button
      type={type}
      className={classes.join(' ')}
      disabled={loading}
      onClick={onClick}
      data-test={dataTest}
    >
      {buttonContent}
    </button>
  )
}

Button.propTypes = {
  loading: PropTypes.bool,
  curved: PropTypes.bool,
  type: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  loading: false,
  curved: false,
  type: 'button',
  color: 'white',
}

export default Button
