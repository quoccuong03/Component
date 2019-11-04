import React, { PureComponent } from 'react'

class NativeSelect extends PureComponent {
  _onChange(e) {
    const { value } = e.target

    if (this.props.onSelect) {
      this.props.onSelect(value)
    }
  }

  getClasses(className) {
    let classes = 'native-select'

    if (className) {
      classes += ` ${className}`
    }

    return classes
  }

  render() {
    const { className, data, value } = this.props

    return (
      <select
        value={value}
        onChange={e => this._onChange(e)}
        className={this.getClasses(className)}
      >
        {
          data.map((item, index) => (
            <option
              key={index}
              value={item.value}
            >
              {item.label}
            </option>
          ))
        }
      </select>
    )
  }
}

export { NativeSelect }