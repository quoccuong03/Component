import React, { PureComponent } from 'react'
class ActionButton extends PureComponent {
  render() {
    const { editable, removable, onEdit, onRemove } = this.props

    return (
      <div className="button-action">
        {
          editable
          ? (
            <span
              className="button-action__edit icon-edit"
              onClick={onEdit}
            />
          )
          : null
        }
        {
          removable
          ? (
            <span
              className="button-action__remove icon-remove"
              onClick={onRemove}
            />
          )
          : null
        }
      </div>
    )
  }
}

export { ActionButton }