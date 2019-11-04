import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'

class MediaUploader extends PureComponent {
  render() {
    const { isVisible, onHide, content } = this.props

    return (
      <div className="media-uploader">
        {content}
        <Modal
          isVisible={isVisible}
          onHide={onHide}
        >
          <h2>content</h2>
        </Modal>
      </div>
    )
  }
}

MediaUploader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  renderContent: PropTypes.func
}

export default MediaUploader