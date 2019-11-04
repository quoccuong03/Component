import React, { Component } from 'react'
import Select2 from 'react-select'
import { components } from 'react-select'

export class SelectMutiple extends Component {
  handleDelete(item, value) {
    let newValue = []
    value.forEach((element) => {
      if (element.id !== item.id) {
        newValue.push(element)
      }
    })
    if (this.props.onChange) {
      this.props.onChange(newValue)
    }
  }
  render() {
    const { DropdownIndicator } = components
    const { value , slug ='slug'} = this.props
    return (
      <div>
        <Select2
          {...this.props}
          value={value}
          isMulti
          name="colors"
          className="basic-multi-select select__mutilple__container"
          classNamePrefix="select"
          components={{
            DropdownIndicator: (props) => (
              <DropdownIndicator {...props}>
                <img
                  src={'/assets/icons/select_dropdown.svg'}
                  alt="down arrow"
                />
                <img
                  src={'/assets/icons/input_search_icon.svg'}
                  className="select__mutilple__icon--search"
                  alt="down arrow"
                />
              </DropdownIndicator>
            ),
          }}
          styles={{
            indicatorSeparator: (styles) => ({
              ...styles,
              display: 'none',
            }),
            placeholder: (styles) => ({
              ...styles,
              color: '#c4c4c4 ',
              fontSize: '16px',
            }),
            container: (styles) => ({
              ...styles,
              minWidth: this.props.containerMinWidth,
              maxWidth: this.props.containerMaxWidth,
            }),
            control: (styles) => ({
              ...styles,
              paddingLeft: '40px',
              minHeight: this.props.controlHeight || 'calc(2.75rem + 2px)',
              color: '#c4c4c4 ',
              borderColor: '#dadada',
              boxShadow:'unset',
              fontSize: '16px',
              '&:hover':{
                borderColor: '#dadada'
              },
              '&:focus':{
                borderColor: '#dadada'
              },
            }),
          }}
        />

        <div className="  row select__mutilple__container">
          {value.map((item, key) => {
           
            return (
              <div
                key={`select-multi${key}`}
                className="select__mutilple__item col-2 "
              >
                <div className="select__mutilple__item-name">{item[slug]}</div>
                <img
                  className="select__mutilple__item-icon"
                  src={'/assets/icons/delete_select_multi.svg'}
                  onClick={() => this.handleDelete(item, value)}
                  alt="delete select multi"
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
