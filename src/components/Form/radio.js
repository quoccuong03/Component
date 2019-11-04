import React, { Component } from 'react'

export class Radio extends Component {
  handleClick(value) {
    if (this.props.onSelect) {
      this.props.onSelect(value)
    }
  }

  handleChange(e) {
    const value = e.target.getAttribute('data-value')

    if (this.props.onSelect) {
      this.props.onSelect(value)
    }
  }

  render() {
    const { list = [], value='' , inline , className ,name = 'custom-radio' } = this.props
    return (      
      list.map((item, index) => (
        <div key={index} className={`radio ${ inline ? "radio--inline" :""} ${className ? className :''}`}>
          <label
            htmlFor={`radio_${name}_${index}`}
          >
          <input
            name={name}
            id={`radio_${name}_${index}`}
            type="radio"
            data-value={item.value}
            onChange={e => this.handleChange(e)}
            checked={value === item.value ? true : false}
            value={value}
          />
     
            {item.label}
          </label>
        </div>
      ))
    )
  }
}
