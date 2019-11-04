import React, { PureComponent } from 'react'

export class Checkbox extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: props.defaultValue || false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { defaultValue } = nextProps
    if(defaultValue) {
      this.setState({ isChecked: defaultValue })
    }
  }

  _onChange(e) {
    const { checked , value , name} = e.target

    this.setState({ isChecked: checked })
    let object = {name, value, status :checked}
    if (this.props.onSelect) {
      this.props.onSelect(object)
    }
  }

  render() {
    const { isChecked } = this.state
    const { value, className, name = 'custom-checkbox', inline , label= '' } = this.props

    return (
      <div
        className={`checkbox ${className ? className : ''} ${inline
          ? 'checkbox--inline'
          : ''}`}
      >
        <label htmlFor={`checkbox_${name}`}>
          <input
            value={value ? value : 'isChecked'}
            id={`checkbox_${name}`}
            type="checkbox"
            checked={isChecked}
            onChange={e => this._onChange(e)}
            name={name}
          />
          {label}
        </label>
      </div>
    )
  }
}
