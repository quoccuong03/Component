import React, { Component, Fragment } from 'react';
import { SelectOne, Button } from '../Form';

import {
  compareObjectProps,
  showErrorAlert,
  getMediaUrl,
  convertBytesToMB,
  showSuccessAlert,
} from '../../helpers/common';
import constants from '../../helpers/constants';

import ModalListImage from './modalListImage';
import photoService from '../../services/photo';
const ENDPOINT = constants.ENDPOINT;
const STATUS = constants.STATUS;

const publish = 'publish';
const add = 'add';
const edit = 'edit';
export class MetaSeo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: publish,
      showPopup: false,
      showMetaSeo: false,
      postTitle: '',
      parentPost: '',
      campaignTitle: '',
      meta_title: '',
      meta_description: '',
      meta_url: '',
      showMetaTwitter: '',
      showMetaFaceBook: '',
      twitter_title: '',
      twitter_description: '',
      twitter_image: '',
      twitter_image_id: 0,
      facebook_title: '',
      facebook_description: '',
      facebook_image: '',
      facebook_image_id: 0,
      userName: '',
      shouldFetchTwitter: true,
      shouldFetchFaceBook: true,
      topScroll: false,
      action: 'add',
      isVisibleTwitter: false,
      isVisibleFaceBook: false
    };
  }
  handleSelectStatus(data) {
    const status = data.value;

    this.setState({ status });
  }
  handleCloseTwitter(){
    this.setState({
      isVisibleTwitter: !this.state.isVisibleTwitter
    })
  }
  handleCloseFaceBook(){
    this.setState({
      isVisibleFaceBook: !this.state.isVisibleFaceBook
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.userName !== this.state.userName) {
      this.setState({
        userName: this.props.userName,
      });
    }

    //set data for parent component
    if (
      !compareObjectProps(this.state, prevState) &&
      this.props.handleChangeData
    ) {
      const {
        meta_description,
        meta_title,
        twitter_image,
        twitter_title,
        twitter_description,
        facebook_image,
        facebook_description,
        facebook_title,
        facebook_image_id,
        twitter_image_id,
        status,
      } = this.state;
      let data = {
        meta_url: this.handleRenderUrl(),
        meta_description,
        meta_title,
        twitter_image,
        twitter_title,
        twitter_description,
        facebook_image,
        facebook_description,
        facebook_title,
        facebook_image_id,
        twitter_image_id,
        status,
      };
      this.props.handleChangeData(data);
    }
    // set value meta seo
    if (
      prevProps.meta_seo &&
      this.props.meta_seo &&
      !compareObjectProps(prevProps.meta_seo, this.props.meta_seo)
    ) {
      const { meta_seo = {}, status = 'publish', action = 'add' } = this.props;
      this.setState({
        ...this.state,
        ...meta_seo,
        status,
        action,
      });
    }
  }

  onTogglePupop() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  handleClosePopup() {
    this.setState({
      showPopup: false,
      showMetaSeo: false,
      showMetaFaceBook: false,
      showMetaTwitter: false,
    });
  }
  handleShowPopupMetaSeo() {
    this.setState({
      showMetaSeo: !this.state.showMetaSeo,
      showMetaFaceBook: false,
      showMetaTwitter: false,
    });
  }
  handleShowPopupMeataTwitter() {
    this.setState({
      showMetaTwitter: !this.state.showMetaTwitter,
      showMetaSeo: false,
      showMetaFaceBook: false,
    });
  }
  handleShowPopupMeataFaceBook() {
    this.setState({
      showMetaFaceBook: !this.state.showMetaFaceBook,
      showMetaSeo: false,
      showMetaTwitter: false,
    });
  }
  handleSetClassPostSeo() {
    let classPostSeo = '';
    const { showMetaSeo, showMetaTwitter, showMetaFaceBook } = this.state;

    if (showMetaSeo) {
      classPostSeo = 'meta_seo__hidden';
    }
    if (showMetaFaceBook) {
      classPostSeo = 'meta_seo__hidden';
    }
    if (showMetaTwitter) {
      classPostSeo = 'meta_seo__hidden';
    }
    return classPostSeo;
  }
  handleRenderUrl() {
    const { meta_url } = this.state;
    let urlString = meta_url;
    return urlString;
  }
  handleOnChangeText(e) {
    const { value, name } = e.target;
    let current = { ...this.state };
    current[name] = value;
    this.setState({
      ...this.state,
      ...current,
    });
  }
  handleChangeImgeFeatureTwitter(image, id) {
    this.setState({
      twitter_image_id: id,
      twitter_image: image,
    });
  }
  handleChangeImgeFeatureFaceBook(image, id) {
    this.setState({
      facebook_image_id: id,
      facebook_image: image,
    });
  }
  handleOpenModalImage(name) {
    let current = this.state;
    current[name] = false;
  }
  handleUploadMedia(e, url, id) {
    const { files } = e.target;
    const file = files[0];
    if (file) {
      const size = file.size;

      if (
        size &&
        convertBytesToMB(size) > constants.MEDIA_UPLOAD_MAX_FILE_SIZE
      ) {
        showErrorAlert(['Please upload media with maximum file size is 5MB']);
      }

      const uploader = photoService.uploadPhoto(file, {
        status: 'publish',
        thumbnail: { width: 300, height: 200 },
      });

      uploader.then((result) => {
        const { status, data, messages, insertId } = result;

        if (status === 0) {
          showErrorAlert(messages);
        } else if (status === 1) {
          showSuccessAlert([
            'Media has been successfully uploaded',
          ]).then(() => {
            const { file_name, path } = data;

            let imageUrl = getMediaUrl(ENDPOINT, file_name, path);
            let current = { ...this.state };
            current[url] = imageUrl;
            current[id] = insertId;
            this.setState({
              ...this.state,
              ...current,
            });
          });
        } else if (status === 413) {
          showErrorAlert(['Media uploaded size is too large']);
        }
      });
    }
  }
  componentDidMount() {
    this.headerScroll();
  }

  headerScroll() {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= 5) {
        if (!this.state.topScroll) {
          this.setState({
            topScroll: true,
          });
        }
      } else {
        if (this.state.topScroll) {
          this.setState({
            topScroll: false,
          });
        }
      }
    });
  }
  handlClickPublish() {
    if (this.props.handlClickPublish) {
      this.props.handlClickPublish();
    }
  }
  handlClickSaveDraf() {
    if (this.props.handlClickSaveDraf) {
      this.props.handlClickSaveDraf();
    }
  }
  handlClickEdit() {
    if (this.props.handlClickEdit) {
      this.props.handlClickEdit();
    }
  }
  render() {
    let {
      showMetaSeo,
      meta_title,
      meta_description,
      meta_url,
      showMetaFaceBook,
      showMetaTwitter,
      twitter_title,
      twitter_description,
      twitter_image,
      facebook_title,
      facebook_description,
      shouldFetchTwitter,
      shouldFetchFaceBook,
      facebook_image,
      isVisibleFaceBook,
      isVisibleTwitter,
      userName,
      topScroll,
      status,
      action,
    } = this.state;
    let classPostSeo = this.handleSetClassPostSeo();
    let urlMetaString = this.handleRenderUrl();
    const _defaultStatus = {
      value: status,
      label: status,
    };
    return (
      <Fragment>
        <div
          className={` meta_seo--fix__parent ${classPostSeo} ${topScroll
            ? 'meta_seo--fix__parent_top'
            : ''} scroll-type`}
        >
          <div className={` meta_seo--action `}>
            <div className="meta_seo--action__publish">
              <div style={{ marginTop: '23px' }}>
                {action === add && (
                  <div>
                    <Button
                      name="inactive"
                      className="meta_seo__button--draft"
                      size="large"
                      onClick={() => {
                        this.handlClickSaveDraf();
                      }}
                    >
                      Save Draft
                    </Button>
                    <Button
                      className="meta_seo__button--publish"
                      name="active"
                      size="large"
                      onClick={() => {
                        this.handlClickPublish();
                      }}
                    >
                      Publish
                    </Button>
                  </div>
                )}
                {action === edit && (
                  <Button
                    type="button"
                    onClick={() => {
                      this.handlClickEdit();
                    }}
                    name="active"
                    size="large"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>

            <div className="meta_seo--action__status">
              <label>Choose Status</label>
              <div>
                <SelectOne
                  options={STATUS}
                  value={_defaultStatus}
                  onChange={(data) => this.handleSelectStatus(data)}
                  border={' 1px solid #F0F1F2'}
                  containerMaxWidth={216}
                  width={216}
                />
              </div>
           
            </div>
            <div className="meta_seo--post__line" />
            <div className="meta_seo--action__status  meta_seo--action__status--post_setting ">
              <label className="meta_seo__title">Post Settings</label>
              <div className="meta_seo">
                <div
                  className="meta_seo__contain"
                  onClick={() => {
                    this.handleShowPopupMetaSeo();
                  }}
                >
                  Meta Data
                  <div className="meta_seo__decription">
                    Extra content for search engines
                  </div>
                  <i className="meta_seo__icon icon-arrow_out" />
                </div>
                <div className="meta_seo--post__line " />
                <div
                  className="meta_seo__contain"
                  onClick={() => {
                    this.handleShowPopupMeataTwitter();
                  }}
                >
                  Twitter Card
                  <div className="meta_seo__decription">
                    Customise structured data for Twitter
                  </div>
                  <i className="meta_seo__icon icon-arrow_out" />
                </div>
                <div className="meta_seo--post__line " />
                <div
                  onClick={() => {
                    this.handleShowPopupMeataFaceBook();
                  }}
                  className="meta_seo__contain meta_seo__contain--last meta_seo__contain--line"
                >
                  Facebook Cards
                  <div className="meta_seo__decription">
                    Customise Open Graph data
                  </div>
                  <i className="meta_seo__icon icon-arrow_out" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* meta data */}
        <div
          className={` meta_seo--fix__parent  ${showMetaSeo
            ? 'meta_seo__parent'
            : 'meta_seo__parent--out'}   ${topScroll
            ? 'meta_seo--fix__parent_top'
            : ''} scroll-type`}
        >
          <div className={` meta_seo--action`}>
            <div
              onClick={() => {
                this.handleShowPopupMetaSeo();
              }}
              className="meta_seo__title--child"
            >
              <div style={{ marginTop: '23px' }}>
                Post Settings
                <i className="meta_seo__icon meta_seo__icon--seo icon-arrow_in" />
              </div>
            </div>
            <div>
              <div className="meta_seo__title  meta_seo__title--right">
                Meta Data
              </div>
            </div>

            <div className="meta_seo--action__status">
              <label className="meta_seo__status">Choose Status</label>
              <div >
                <SelectOne
                  options={STATUS}
                  value={_defaultStatus}
                  onChange={(data) => this.handleSelectStatus(data)}
                  border={' 1px solid #F0F1F2'}
                  containerMaxWidth={216}
                  width={216}
                />
              </div>
            </div>
            <div className="meta_seo--post__line" />
            <div className="meta_seo--action__status  meta_seo--action__status--post_setting ">
              <div>
                <div className="editor__settings-menu-content">
                  <div id="ember389" className="editor__form-group">
                    <label className="editor__lable" htmlFor="meta-title">
                      Meta Title
                    </label>
                    <input
                      onChange={(e) => {
                        this.handleOnChangeText(e);
                      }}
                      className="editor__input"
                      value={meta_title}
                      name="meta_title"
                      id="meta-title"
                      type="text"
                    />
                    <p>
                      Recommended: <b>70</b> characters. You’ve used
                      <span
                        className={
                          meta_title.length > 70 ? (
                            'editor__word-count-red'
                          ) : (
                            'editor__word-count'
                          )
                        }
                      >
                        {meta_title.length}
                      </span>
                    </p>
                  </div>
                  <div id="ember391" className="editor__form-group">
                    <label className="editor__lable" htmlFor="meta-description">
                      Meta Description
                    </label>
                    <textarea
                      onChange={(e) => {
                        this.handleOnChangeText(e);
                      }}
                      name="meta_description"
                      value={meta_description}
                      className="editor__textarea"
                    />
                    <p>
                      Recommended: <b>156</b> characters. You’ve used
                      <span
                        className={
                          meta_title.meta_description > 156 ? (
                            'editor__word-count-red'
                          ) : (
                            'editor__word-count'
                          )
                        }
                      >
                        {meta_description.length}
                      </span>
                    </p>
                  </div>
                  <div id="ember393" className="editor__form-group">
                    <label className="editor__lable" htmlFor="canonicalUrl">
                      Canonical URL
                    </label>
                    <input
                      onChange={(e) => {
                        this.handleOnChangeText(e);
                      }}
                      className="editor__input"
                      value={meta_url}
                      name="meta_url"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label className="editor__lable">
                      Search Engine Result Preview
                    </label>
                    <div className="editor__seo-preview">
                      <div className="editor__seo-preview-title">
                        {meta_title}
                      </div>
                      <div className="editor__seo-preview-link">
                        <a
                          href={`${urlMetaString}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {urlMetaString}{' '}
                        </a>
                      </div>
                      <div className="editor__seo-preview-description">
                        {meta_description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* meta facebook */}
        <div
          className={` meta_seo--fix__parent  ${showMetaFaceBook
            ? 'meta_seo__parent'
            : 'meta_seo__parent--out'}   ${topScroll
            ? 'meta_seo--fix__parent_top'
            : ''} scroll-type`}
        >
          <div className={` meta_seo--action`}>
            <div
              onClick={() => {
                this.handleShowPopupMeataFaceBook();
              }}
              className="meta_seo__title--child"
            >
              <div style={{ marginTop: '23px' }}>
                Post Settings
                <i className="meta_seo__icon meta_seo__icon--seo icon-arrow_in" />
              </div>
            </div>
            <div>
              <div className="meta_seo__title  meta_seo__title--right">
                Facebook Cards
              </div>
            </div>

            <div className="meta_seo--action__status">
              <label className="meta_seo__status">Choose Status</label>
              <div >
                <SelectOne
                  options={STATUS}
                  value={_defaultStatus}
                  onChange={(data) => this.handleSelectStatus(data)}
                  border={' 1px solid #F0F1F2'}
                  containerMaxWidth={216}
                  width={216}
                />
              </div>
            </div>
            <div className="meta_seo--post__line" />
            <div className="meta_seo--action__status  meta_seo--action__status--post_setting ">
              <div>
                <div className="meta_seo__title  meta_seo__title--right">
                  Facebook Card
                </div>
              </div>
              <div className="editor__settings-menu-content">
                <div className="editor__form-group editor__seo-preview ">
                  <div className="editor__form-group--social">
                    {/* twitterImage */}
                    <div className="upload-btn">
                      <div className="d-inline-block upload-btn__wrapper">
                        <Button
                          type="button"
                          className="btn btn-outline-primary"
                          name='active'
                          size='large'
                        
                        >
                          <i className="fas fa-cloud-upload-alt" />
                          <span className="ml-2">Upload</span>
                        </Button>

                        <input
                          type="file"
                          accept="image/*"
                          className="form-control-file"
                          onChange={(e) =>
                            this.handleUploadMedia(
                              e,
                              'facebook_image',
                              'facebook_image_id'
                            )}
                        />
                      </div>
                    </div>
                    {facebook_image !== '' && (
                      <div className="media-viewer media-viewer--photo mt-2 p-4">
                        <img
                          src={facebook_image}
                          alt="media viewer"
                          className="meta_seo__img"
                        />
                        <div
                          className="media-viewer__close cursor-pointer"
                          onClick={() => {
                            this.setState({
                              facebook_image: '',
                              facebook_image_id: 0,
                            });
                          }}
                        >
                          <i className="far fa-times-circle" />
                        </div>
                      </div>
                    )}
                    <div
                      className="editor__modale-list"
                      data-target={`#featureImageIdFacebook`}
                      data-toggle="modal"
                      onClick={()=>{this.handleCloseFaceBook()}}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 122.43 122.41"
                      >
                        <path d="M83.86 54.15v34.13H38.57V54.15H0v68.26h122.43V54.15H83.86zM38.57 0h45.3v34.13h-45.3z" />
                      </svg>
                    </div>
                    {/* endtwitterImage */}
                  </div>
                </div>

                <div id="ember389" className="editor__form-group">
                  <label className="editor__lable" htmlFor="meta-title">
                    Facebook Title
                  </label>
                  <input
                    onChange={(e) => {
                      this.handleOnChangeText(e);
                    }}
                    className="editor__input"
                    value={facebook_title}
                    name="facebook_title"
                    type="text"
                  />
                </div>
                <div className="editor__form-group ">
                  <label className="editor__lable" htmlFor="meta-description">
                    Meta Description
                  </label>
                  <textarea
                    onChange={(e) => {
                      this.handleOnChangeText(e);
                    }}
                    name="facebook_description"
                    value={facebook_description}
                    className="editor__textarea"
                  />
                </div>

                <div className="form-group">
                  <label className="editor__lable">Preview</label>
                  <div className="editor__seo-preview">
                    <div className="editor__seo-preview-title editor__seo-preview-title--social">
                      {facebook_title}
                    </div>
                    <div className="editor__seo-preview-description editor__seo-preview-description --social">
                      {facebook_description}
                    </div>
                    <div className="editor__seo-preview-link editor__seo-preview-link--social">
                      <a
                        href={`${urlMetaString}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {urlMetaString}{' '}
                      </a>
                      | By
                      <span className="editor__author"> {userName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* meta twitter */}
        <div
          className={` meta_seo--fix__parent  ${showMetaTwitter
            ? 'meta_seo__parent'
            : 'meta_seo__parent--out'}   ${topScroll
            ? 'meta_seo--fix__parent_top'
            : ''}  scroll-type`}
        >
        
          <div className={` meta_seo--action`}>
          <div
              onClick={() => {
                this.handleShowPopupMeataTwitter();
              }}
              className="meta_seo__title--child"
            >
              <div style={{ marginTop: '23px' }}>
                Post Settings
                <i className="meta_seo__icon meta_seo__icon--seo icon-arrow_in" />
              </div>
            </div>
            <div>
              <div className="meta_seo__title  meta_seo__title--right">
              Twitter Card
              </div>
            </div>

            <div className="meta_seo--action__status">
              <label className='meta_seo__status'>Choose Status</label>
              <div >
                <SelectOne
                  options={STATUS}
                  value={_defaultStatus}
                  onChange={(data) => this.handleSelectStatus(data)}
                  border={' 1px solid #F0F1F2'}
                  containerMaxWidth={216}
                  width={216}
                />
              </div>
            </div>
            <div className="meta_seo--post__line" />
            <div className="meta_seo--action__status  meta_seo--action__status--post_setting ">
              <div>
                <div className="meta_seo__title  meta_seo__title--right">
                  Twitter Card
                </div>
              </div>
              <div>
                <div className="editor__settings-menu-content">
                  <div className="editor__form-group editor__seo-preview ">
                    <div className="editor__form-group--social">
                      {/* twitterImage */}
                      <div className="upload-btn">
                        <div className="d-inline-block upload-btn__wrapper">
                          <Button
                            type="button"
                            name='active'
                            size='large'
                            className="btn btn-outline-primary"
                           
                          >
                            <i className="fas fa-cloud-upload-alt" />
                            <span className="ml-2">Upload</span>
                          </Button>

                          <input
                            type="file"
                            accept="image/*"
                            className="form-control-file"
                            onChange={(e) =>
                              this.handleUploadMedia(
                                e,
                                'twitter_image',
                                'twitter_image_id'
                              )}
                          />
                        </div>
                      </div>
                      {twitter_image !== '' && (
                        <div className="media-viewer media-viewer--photo mt-2 p-4">
                          <img
                            src={twitter_image}
                            alt="media viewer"
                            className="meta_seo__img"
                          />
                          <div
                            className="media-viewer__close cursor-pointer"
                            onClick={() => {
                              this.setState({
                                twitter_image: '',
                                twitter_image_id: 0,
                              });
                            }}
                          >
                            <i className="far fa-times-circle" />
                          </div>
                        </div>
                      )}
                      <div
                        className="editor__modale-list"
                        data-target={`#featureImageIdTwitter`}
                        data-toggle="modal"
                         onClick={()=>{this.handleCloseTwitter()}}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 122.43 122.41"
                        >
                          <path d="M83.86 54.15v34.13H38.57V54.15H0v68.26h122.43V54.15H83.86zM38.57 0h45.3v34.13h-45.3z" />
                        </svg>
                      </div>
                      {/* endtwitterImage */}
                    </div>
                  </div>

                  <div id="ember389" className="editor__form-group">
                    <label className="editor__lable" htmlFor="meta-title">
                      Twitter Title
                    </label>
                    <input
                      onChange={(e) => {
                        this.handleOnChangeText(e);
                      }}
                      className="editor__input"
                      value={twitter_title}
                      name="twitter_title"
                      type="text"
                    />
                  </div>
                  <div className="editor__form-group">
                    <label className="editor__lable" htmlFor="meta-description">
                      Twitter Description
                    </label>
                    <textarea
                      onChange={(e) => {
                        this.handleOnChangeText(e);
                      }}
                      name="twitter_description"
                      value={twitter_description}
                      className="editor__textarea"
                    />
                  </div>

                  <div className="editor__form-group">
                    <label className="editor__lable">Preview</label>
                    <div className="editor__seo-preview">
                      <div className="editor__seo-preview-title editor__seo-preview-title--social">
                        {twitter_title}
                      </div>
                      <div className="editor__seo-preview-description editor__seo-preview-description--social">
                        {twitter_description}
                      </div>
                      <div className="editor__seo-preview-link editor__seo-preview-link--social">
                        <a
                          href={`${urlMetaString}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {urlMetaString}{' '}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ModalListImage
          id="featureImageIdTwitter"
          title="Twitter Image"
          isVisible={isVisibleTwitter}
          onClose={()=>{this.handleCloseTwitter()}}
          shouldFecth={shouldFetchTwitter}
          handlAfterOpenModal={() => {
            this.handleOpenModalImage('shouldFetchTwitter');
          }}
          handleChangeImgeFeature={(imageUrl, photo_id) => {
            this.handleChangeImgeFeatureTwitter(imageUrl, photo_id);
          }}
        />
        <ModalListImage
          isVisible={isVisibleFaceBook}
          onClose={()=>{this.handleCloseFaceBook()}}
          id="featureImageIdFacebook"
          title="Facebook Image"
          shouldFecth={shouldFetchFaceBook}
          handlAfterOpenModal={() => {
            this.handleOpenModalImage('shouldFetchFaceBook');
          }}
          handleChangeImgeFeature={(imageUrl, photo_id) => {
            this.handleChangeImgeFeatureFaceBook(imageUrl, photo_id);
          }}
        />
      </Fragment>
    );
  }
}
export default MetaSeo;
