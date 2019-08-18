import React from 'react'
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types'
import './style.scss'

function Button(props) {
  let classes = []
  classes.push(props.className)
  if (props.curved) {
    classes.push('curved-button')
  }
  let buttonContent
  if (props.loading) {
    buttonContent = (
      <ReactLoading
        type={'bars'}
        color={props.color}
        height={'30px'}
        width={'30px'}
        className="button-loading-icon"
      />
    )
  } else {
    buttonContent = props.children
  }
  return (
    <button
      type={props.type}
      className={classes.join(' ')}
      disabled={props.loading}
      onClick={props.onClick}
      {...props}
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
