import React from 'react'

export const Form = ({ ...props }) => {
  const { horizontal = false} = props
  return (
    <form
      {...props}
      className={`form ${props.className ? props.className : ''} ${ horizontal
        ? 'form--horizontal'
        : ''}`}
    />
  )
}

export const FormGroup = ({ ...props }) => {
  const { className = '' } = props
  return <div className={`form__group ${className}`} {...props} />
}
