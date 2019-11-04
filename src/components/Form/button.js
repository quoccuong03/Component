import React, { PureComponent } from 'react'

const BUTTON_NAMES = {
  active: 'button--active',
  inactive: 'button--inactive'
}

const BUTTON_SIZES = {
  large: 'button--large',
  medium: 'button--medium',
  small: 'button--small'
}

class Button extends PureComponent {
  getClasses({ className, name = 'active', size = 'large' }) {
    let classes = 'button'
    
    classes += ` ${BUTTON_NAMES[name]}`
    classes += ` ${BUTTON_SIZES[size]}`

    if (className) {
      classes += ` ${className}`
    }

    return classes
  }

  renderIcon(icon) {
    if (!icon) return null

    return <i className={`button__icon ${icon}`}></i>
  }

  render() {
    const {
      disabled,
      type = 'button',
      name,
      size,
      icon,
      onClick,
      className
    } = this.props

    return (
      <button
        disabled={disabled}
        type={type}
        className={this.getClasses({ className, name, size })}
        onClick={onClick}
      >
        {this.renderIcon(icon)}
        {this.props.children}
      </button>      
    )
  }
}

export { Button }