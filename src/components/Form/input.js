import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

export class Input extends PureComponent {
  renderLabel(label, className) {
    if (!label) return null

    return (
      <label className={`${className}`}>
        {label}
      </label>
    )
  }

  renderErrorMessage(msg) {
    if (!msg) return null

    return <span className="form__error">{msg}</span>
  }

  getClasses({ isError, isSuccess, className }) {
    let classes = 'form__input'

    if (isError) {
      classes += ' form__input--error'
    }
    else if (isSuccess) {
      classes += ' form__input--success'
    }

    if (className) {
      classes += ` ${className}`
    }

    return classes
  }

  handleChange(e) {
    const { value } = e.target

    if (this.props.onChangeText) {
      this.props.onChangeText(value)
    }
  }

  handleOnClick(e) {
    if (this.props.onClickText) {
      this.props.onClickText(e)
    }
  }
  renderInput(
    disabled,
    isError,
    isSuccess,
    className,
    type,
    name,
    placeholder,
    value
  ) {
    return (
      <input
        disabled={disabled}
        className={this.getClasses({ isError, isSuccess, className })}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => this.handleChange(e)}
        onClick={(e) => this.handleOnClick(e)}
      />
    )
  }

  render() {
    const {
      label = '',
      type = 'text',
      placeholder = '',
      disabled = false,
      isError = false,
      isSuccess = false,
      value = '',
      errorMessage = '',
      className = '',
      classNameLabel = 'form__label',
      name = '',
    } = this.props

    return (
      <Fragment>
        {this.renderLabel(label, classNameLabel)}
        {this.renderInput(
          disabled,
          isError,
          isSuccess,
          className,
          type,
          name,
          placeholder,
          value
        )}

        {this.renderErrorMessage(errorMessage)}
      </Fragment>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  isSuccess: PropTypes.bool,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  name: PropTypes.string,
  classNameLable: PropTypes.string,
  classNameInput: PropTypes.string,
  horizontal: PropTypes.bool,
}
