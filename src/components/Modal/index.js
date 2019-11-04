import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import RModal from 'react-modal'

RModal.setAppElement('#root')

class Modal extends PureComponent {
  render() {
    const { isVisible, children, onHide } = this.props

    return (
      <RModal
        isOpen={isVisible}
        onRequestClose={onHide}
      >
        {children}
      </RModal>
    )
  }
}

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node
}

export default Modal