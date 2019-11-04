import React, { Component } from 'react'

import mediaService from '../../services/media'
import constants from '../../helpers/constants'

import {
  showErrorAlert,
  distinctArrayObject,
  getMediaUrl,
  debounced,
  convertBytesToMB,
  showSuccessAlert,
} from '../../helpers/common'
import Modal from '../Modal'

import photoService from '../../services/photo'
const ENDPOINT = constants.ENDPOINT

const image = 'image'

class modalListImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optionsImage: [],
      pageImage: 1,
      totalImage: 0,
      searchNameImage: '',
      perPage: 12,
      imageUrl: '',
      photo_id: 0,
      type: image,
      filter: {
        type: image,
        sortBy: 'created_at',
        orderBy: 'desc',
        status: 'publish',
      },
    }
  }
  componentDidMount() {
    this.handleScrollImage()
    this.handleChange = debounced(350, (value) => {
      this.searchChangeNameImage(value)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.imageUrl !== prevState.imageUrl) {
      if (this.props.handleChangeImgeFeature) {
        this.props.handleChangeImgeFeature(
          this.state.imageUrl,
          this.state.photo_id
        )
      }
    }

    if (this.props.shouldFecth && this.props.handlAfterOpenModal) {
      this.fetchMedia(1, this.state.filter)
      this.props.handlAfterOpenModal()
    }
  }

  fetchMedia(page = 1, filter = {}, scroll) {
    const { perPage } = this.state
    const query = {
      page,
      perPage,
    }
    filter.status = ['publish', 'pending']
    mediaService.fetchMedia(query, filter).then((result) => {
      const { status, data, messages } = result
      if (status === 0) {
        showErrorAlert(messages)
      } else if (status === 1) {
        const { rows: optionsImage, total: totalMedia } = data

        if (optionsImage && Array.isArray(optionsImage)) {
          let newMedia = optionsImage
          if (scroll && scroll === true) {
            newMedia = [...this.state.optionsImage, ...optionsImage]
            newMedia = distinctArrayObject(newMedia, 'id')
          }
          this.setState({
            ...this.state,
            optionsImage: newMedia,
            totalImage: totalMedia,
            pageImage: page,
          })
        }
      }
    })
  }
  handleClickItemImage(imageUrl, id) {
    this.setState(
      {
        imageUrl,
        photo_id: id,
      },
      () => {
        if (this.props.onClose) {
          this.props.onClose()
        }

      }
    )
  }

  renderElementImage(optionsImage, start, end) {
    let element = []
    for (let j = start ;j < end ;j++) {
      if (optionsImage[j]) {
        let newAttachment =
          optionsImage[j].media_attachment &&
          optionsImage[j].media_attachment.path
            ? optionsImage[j].media_attachment
            : JSON.parse(optionsImage[j].media_attachment)

        element.push(
          <div
            className="gh-unsplash-photo"
            key={`child${j}`}
            onClick={() => {
              this.handleClickItemImage(
                optionsImage[j].media_name
                  ? getMediaUrl(
                      ENDPOINT,
                      optionsImage[j].media_name,
                      newAttachment.path
                    )
                  : '',
                optionsImage[j].id
              )
              this.handleCloseModal()
            }}
          >
            <div className="gh-unsplash-photo-container">
              <img
                className="boxBorderContent__small"
                src={
                  optionsImage[j].media_name ? (
                    getMediaUrl(
                      ENDPOINT,
                      optionsImage[j].media_name,
                      newAttachment.path
                    )
                  ) : (
                    ''
                  )
                }
                draggable="false"
                alt=""
              />
              <div className="gh-unsplash-photo-overlay">
                <div className="gh-unsplash-photo-footer">
                  {/* <a className="gh-unsplash-button" target="_blank" rel="noopener noreferrer" href={optionsImage[j].media_name ? getMediaUrl(ENDPOINT, optionsImage[j].media_name, newAttachment.path) :""}> 
               
                   </a> */}
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
    return element
  }
  renderTypeImage(optionsImage, columns) {
    let table = []

    for (let i = 0; i < optionsImage.length; i = i + columns) {
      table.push(
        <div
          className="gh-unsplash-grid-column display__flex"
          key={`parent${i}`}
        >
          {this.renderElementImage(optionsImage, i, i + columns)}
        </div>
      )
    }
    return table
  }

  searchChangeNameImage(value) {
    let filter = {
      type: image,
      media_name: value,
    }
    this.fetchMedia(1, filter, false)
  }

  _onchangValue(value) {
    this.setState(
      {
        searchNameImage: value,
      },
      () => {
        this.handleChange(value)
       
      }
    )
  }

  handleScrollImage() {
    if (this.imageRefImageFeature) {
      let nowPage = 1
      this.imageRefImageFeature.addEventListener('scroll', () => {
        if (
          this.imageRefImageFeature.scrollTop +
            this.imageRefImageFeature.clientHeight ===
          this.imageRefImageFeature.scrollHeight
        ) {
          let { totalImage, perPage, searchNameImage } = this.state

          if (perPage * nowPage - totalImage < perPage) {
            nowPage = nowPage + 1
            let filter = {
              type: image,
              media_name: searchNameImage,
            }

            this.fetchMedia(nowPage, filter, true)
          }
        }
      })
    }
  }

  handleUploadMedia(e) {
    const { files } = e.target
    const file = files[0]

    if (file) {
      const size = file.size

      if (
        size &&
        convertBytesToMB(size) > constants.MEDIA_UPLOAD_MAX_FILE_SIZE
      ) {
        showErrorAlert(['Please upload media with maximum file size is 5MB'])
      }

      const uploader = photoService.uploadPhoto(file, {
        status: 'publish',
        thumbnail: { width: 300, height: 200 },
      })

      uploader.then((result) => {
        const { status, data, messages, insertId } = result

        if (status === 0) {
          showErrorAlert(messages)
        } else if (status === 1) {
          showSuccessAlert([
            'Media has been successfully uploaded',
          ]).then(() => {
            const { file_name, path } = data

            let imageUrl = getMediaUrl(ENDPOINT, file_name, path)

            this.setState(
              {
                ...this.state,
                photo_id: insertId,
                imageUrl,
              },
              () => {
                this.handleCloseModal()
              }
            )
          })
        } else if (status === 413) {
          showErrorAlert(['Media uploaded size is too large'])
        }
      })
    }
  }
  handleCloseModal() {
    let { id } = this.props
    let element = document.getElementById(`${id}button-close-modle`)
    if (element) {
      element.click()
    }
  }

  render() {
    let { id, isVisible } = this.props
    let { optionsImage, searchNameImage } = this.state
    let columns = optionsImage.length / 3
    if (optionsImage.length % 3 !== 0) {
      columns = Math.floor(optionsImage.length / 3) + 1
    }

    const withScreen = window.outerWidth
    if (withScreen < 1024) {
      columns = Math.floor(optionsImage.length / 2)
    }
    if (withScreen <= 375) {
      columns = optionsImage.length
    }
    return (
      <Modal isVisible={isVisible}>
        <div
          className="modal fade bd-example-modal-lg"
          id={id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          ref={(ref) => (this.imageRefImageFeature = ref)}
        >
          <div
            className="meta_seo__modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="meta_seo__modal-dialog modal-content">
              <div className="meta_seo__modal-dialog modal-header">
                {/* search */}
                <span className="editor__search">
                  <h3 className="modal-title" id={`${id}Label`}>
                    {this.props.title ? this.props.title : 'Feature Image'}

                    <span
                      style={{ float: 'right' }}
                      onClick={() => {
                        if (this.props.onClose) {
                          this.props.onClose()
                        }
                      }}
                      aria-hidden="true"
                    >
                      ×
                    </span>
                  </h3>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M23.245 23.996a.743.743 0 0 1-.53-.22L16.2 17.26a9.824 9.824 0 0 1-2.553 1.579 9.766 9.766 0 0 1-7.51.069 9.745 9.745 0 0 1-5.359-5.262c-1.025-2.412-1.05-5.08-.069-7.51S3.558 1.802 5.97.777a9.744 9.744 0 0 1 7.51-.069 9.745 9.745 0 0 1 5.359 5.262 9.748 9.748 0 0 1 .069 7.51 9.807 9.807 0 0 1-1.649 2.718l6.517 6.518a.75.75 0 1 1-.531 1.28zM9.807 1.49a8.259 8.259 0 0 0-3.25.667 8.26 8.26 0 0 0-4.458 4.54 8.26 8.26 0 0 0 .058 6.362 8.26 8.26 0 0 0 4.54 4.458 8.259 8.259 0 0 0 6.362-.059 8.285 8.285 0 0 0 2.594-1.736.365.365 0 0 1 .077-.076 8.245 8.245 0 0 0 1.786-2.728 8.255 8.255 0 0 0-.059-6.362 8.257 8.257 0 0 0-4.54-4.458 8.28 8.28 0 0 0-3.11-.608z" />
                  </svg>
                  <input
                    value={searchNameImage}
                    name="searchKeyword"
                    tabIndex="1"
                    placeholder="Search image by name"
                    autoCorrect="off"
                    className="editor__input editor__input--search"
                    type="text"
                    onChange={(e) => this._onchangValue(e.target.value)}
                  />
                </span>
                {/* endSearch */}
              </div>
              <div className="meta_seo__modal-dialog modal-body editor__modal-body">
                {/* test */}
                <section className="gh-unsplash-grid">
                  {this.renderTypeImage(optionsImage, columns)}
                </section>
                {/* end */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default modalListImage
