import React, { PureComponent } from 'react'
import Select2 from 'react-select'
import { components } from 'react-select'
export class SelectOne extends PureComponent {
  render() {
    const { DropdownIndicator} = components
    return (
      <Select2
        components={{
          DropdownIndicator: (props) => (
            <DropdownIndicator className={this.props.dropDownClass} {...props}>
              <img src={'/assets/icons/select_dropdown.svg'} alt="down arrow" />
           
            </DropdownIndicator>
          )
        }}
        {...this.props}
        styles={{
          indicatorSeparator: (styles) => ({
            ...styles,
            display: 'none',

          }),
          placeholder: (styles) => ({
            ...styles,
            fontSize: this.props.fontSize ? this.props.fontSize :'13px',
            color: this.props.color ? this.props.color : '#303235',
            paddingLeft: this.props.placeholderPaddingLeft ? this.props.placeholderPaddingLeft : '',
          }),
          container: (styles) => ({
            ...styles,
            minWidth: this.props.containerMinWidth,
            maxWidth: this.props.containerMaxWidth,
            textTransform: 'capitalize',
            float: this.props.float ? this.props.float : '',
            width: this.props.width ? this.props.width : '',
            backgroundColor: '#FFFFFF',
            fontSize: this.props.fontSize ? this.props.fontSize :'13px',
            color: this.props.color ? this.props.color : '#303235',
            borderRadius: this.props.borderRadius ? this.props.borderRadius  :'3px' ,
            paddingRight: this.props.paddingRight
              ? this.props.paddingRight
              : '',
            paddingLeft: this.props.paddingLeft ? this.props.paddingLeft : '',
            marginRight: this.props.marginRight,
            

          }),
          valueContainer:(styles)=>({
            ...styles,
            paddingTop: this.props.valuePaddingTop ,
          }),
          control: (styles) => ({
            ...styles,
            backgroundColor: this.props.controlBackgroundColor,
            border: this.props.border ? this.props.border : 'unset',
            textTransform: 'capitalize',
         
            minHeight: this.props.controlHeight || 'calc(2.75rem + 2px)',
            paddingLeft: this.props.controlPaddingLeft ? this.props.controlPaddingLeft : '',
            boxShadow:'unset',
            fontSize: this.props.fontSize ? this.props.fontSize :'13px',
            color: this.props.color ? this.props.color : '#303235',
            '&:hover': {
              border: this.props.border ? this.props.border : 'unset',
              boxShadow: 'unset',
            },
            '&:active': {
              border: this.props.border ? this.props.border : 'unset',
              boxShadow: 'unset',
            },
            '&:focus': {
              border: this.props.border ? this.props.border : 'unset',
              boxShadow: 'unset',
            },
          }),
        }}
      />
    )
  }
}
