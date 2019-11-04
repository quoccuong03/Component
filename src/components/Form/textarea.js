import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Textarea extends PureComponent {
  getClasses(className) {
    let classes = 'textarea'

    if (className) {
      classes += ` ${className}`
    }

    return classes
  }

  renderLabel(label, classNameLabel) {
    if (!label) return null

    let classes = 'form__label'

    if (classNameLabel) {
      classes += ` ${classNameLabel}`
    }

    return (
      <label className={classes}>{label}</label>
    )
  }

  render() {
    const { placeholder, label, children, className, classNameLabel, onChangeText } = this.props

    return (
      <>
        {this.renderLabel(label, classNameLabel)}
        <textarea
          placeholder={placeholder}
          className={this.getClasses(className)}
          onChange={e => onChangeText(e.target.value)}
        >
          {children}
        </textarea>
      </>
    )
  }
}

Textarea.propTypes = {
  label: PropTypes.string,
  classNameLabel: PropTypes.string,
  className: PropTypes.string,
  onChangeText: PropTypes.func,
  children: PropTypes.node
}

export { Textarea }
