import React, { Component, Fragment } from 'react';

import './scss/style.scss';

import {
  Button,
  ActionButton,
  Radio,
  Checkbox,
  Form,
  FormGroup,
  Input,
  SelectMutiple,
  SelectOne,
  NativeSelect,
  Textarea,
} from './components/Form';
import HistoryCall from './components/HistoryCall';
import Datatable from './components/Datatable';
import { Loader } from './components/Loader';
import { MetaSeo } from './components/MetaSeo';
import { Pagination } from './components/Pagination';

import MediaUploader from './components/MediaUploader'

const RESULTS = [
  { value: 0, label: 'Incorrect' },
  { value: 1, label: 'Correct' },
];

const answers = [
  {
    id: 1,
    answer_name: 'Answer 1',
    is_correct: 0,
    type: 'text',
  },
  {
    id: 2,
    answer_name: 'Answer 2',
    is_correct: 1,
    type: 'photo',
    media:
      '{"path":"/uploads/20190521","url":"/uploads/20190521","file_name":"quiz-1558422631760.png","thumbnail_name":"quiz-1558422631760-thumbnail.png"}',
    media_name: 'quiz-1558422631760.png',
  },
  {
    id: 3,
    answer_name: 'Answer 3',
    is_correct: 0,
    type: 'audio',
    media_attachment:
      '{"path":"/uploads/20190408","url":"/uploads/20190408","file_name":"quiz-1554713735662.mp3"}',
    media_name: 'quiz-1554713735662.mp3',
  },
  {
    id: 4,
    answer_name: 'Answer 4',
    is_correct: 0,
    type: 'text',
  },
  {
    id: 5,
    answer_name: 'Answer 5',
    is_correct: 1,
    type: 'photo',
    media:
      '{"path":"/uploads/20190521","url":"/uploads/20190521","file_name":"quiz-1558422631760.png","thumbnail_name":"quiz-1558422631760-thumbnail.png"}',
    media_name: 'quiz-1558422631760.png',
  },
  {
    id: 6,
    answer_name: 'Answer 6',
    is_correct: 0,
    type: 'audio',
    media_attachment:
      '{"path":"/uploads/20190408","url":"/uploads/20190408","file_name":"quiz-1554713735662.mp3"}',
    media_name: 'quiz-1554713735662.mp3',
  },
];

const TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'audio', label: 'Audio' },
  { value: 'photo', label: 'Photo' },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      typeRadio1: 'text',
      typeRadio2: 'text',
      value: 0,
      type: '',
      selectOneAnswer: '',
      selectOneAnswer2: '',
      answers: [],
      valueInput: '',
      city: { city_name: 'Ha Noi', id: 0 },
      showLoader: false,
      selectMulti: [],
      page: 1,
      showMediaUploader: false
    }
  }

  componentDidMount() {
    this.setState({ answers });
  }

  handleSelectType2(value) {
    this.setState({
      typeRadio2: value,
    });
  }

  handleSelectType(value) {
    this.setState({
      typeRadio1: value,
    });
  }

  handleSelectCity(data) {
    this.setState({
      city: data,
    });
  }

  handleSelectAnswer(selectOneAnswer) {
    this.setState({
      selectOneAnswer,
    });
  }

  handleSelectAnswer2(selectOneAnswer2) {
    this.setState({
      selectOneAnswer2,
    });
  }
  handleSelectAnswer3(selectOneAnswer3) {
    this.setState({
      selectOneAnswer3,
    });
  }
  handleSelectAnswer4(selectOneAnswer4) {
    this.setState({
      selectOneAnswer4,
    });
  }

  handleSetSelectValue(value) {
    this.setState({
      selectMulti: value,
    });
  }

  handleSelect(name, value, answerIndex) {
    const { answers } = this.state;

    answers[answerIndex][name] = value;

    this.setState({ answers });
  }
  handleSubmit() {
    console.log('submit succesfully');
  }
  handleChangeMetaSeo(data) {
    let meta_seo = {};
    let { status } = this.state;
    Object.keys(data).forEach((item) => {
      if (data[item] !== '') {
        meta_seo[item] = data[item];
        if (item === 'status') {
          status = data[item];
        }
      }
    });
    this.setState({
      meta_seo,
      status,
    });
  }

  playAudio(audioUrl) {}

  renderAnswerMedia(answer) {
    const { type } = answer;

    if (type === 'text') return 'Text';
    else if (type === 'audio') {
      return (
        <div
          tabIndex="-1"
          className="datatable__audio"
          onClick={() => this.playAudio(answer.audioUrl)}
        />
      );
    } else if (type === 'photo') {
      return (
        <div className="datatable__thumb">
          {answer.imageUrl ? <img src={answer.imageUrl} alt="" /> : null}
        </div>
      );
    }

    return null;
  }

  onChange(name, text, index) {
    const { answers } = this.state;
    const answer = answers[index];

    answer[name] = text;

    this.setState({ answers });
  }

  onRemove(answerId, index) {}

  openMediaUploader() {
    this.setState({ showMediaUploader: true })
  }

  hideMediaUploader() {
    this.setState({ showMediaUploader: false })
  }

  renderRow(answer, index) {
    return (
      <tr key={index}>
        <td colSpan="5">
          <Input
            className="fullwidth"
            value={answer.answer_name}
            onChangeText={(text) => this.onChange('answer_name', text, index)}
          />
        </td>
        <td>
          <NativeSelect
            className="fullwidth"
            value={answer.is_correct}
            data={RESULTS}
            onSelect={(result) => this.onChange('is_correct', result, index)}
          />
        </td>
        <td>
          <NativeSelect
            className="fullwidth"
            value={answer.type}
            data={TYPES}
            onSelect={(result) => this.onChange('type', result, index)}
          />
        </td>
        <td>{this.renderAnswerMedia(answer)}</td>
        <td colSpan="2">
          <Button
            disabled={answer.type === 'text'}
            name="inactive"
            size="medium"
            onClick={() => {}}
            className="d-inline"
          >
            Upload file
          </Button>
          <ActionButton
            removable
            onRemove={() => this.onRemove(answer.id, index)}
          />
        </td>
      </tr>
    );
  }

  render() {
    const {
      typeRadio1,
      typeRadio2,
      answers,
      valueInput,
      showLoader,
      selectMulti,
      page,
      selectOneAnswer,
      selectOneAnswer2,
      selectOneAnswer3,
      selectOneAnswer4,

      status,
      meta_seo,
      action,
      showMetaSeo,

      showMediaUploader
    } = this.state

    const header = [
      { colspan: '5', text: 'Answers' },
      { text: 'Is Correct' },
      { text: 'Type' },
      { text: 'File' },
      { text: null },
      { text: null },
    ];

    return (
      <Fragment>
        {/* Buttons */}
        <div className="container">
          <div>
            <h2>Buttons</h2>
            <div className="block">
              <Button name="active" size="small">
                Filter
              </Button>
            </div>

            <div className="block">
              <Button name="active" size="medium">
                Upload file
              </Button>
            </div>

            <div className="block">
              <Button name="active" size="large" icon="icon-plus-circle">
                Add New Post
              </Button>
            </div>

            <div className="block">
              <Button name="active" size="large" icon="icon-list">
                List Question
              </Button>
            </div>

            <div className="block">
              <Button name="inactive" size="small">
                Small
              </Button>
            </div>

            <div className="block">
              <Button name="inactive" size="medium">
                Medium
              </Button>
            </div>

            <div className="block">
              <Button name="inactive" size="large">
                Large
              </Button>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          {showMetaSeo && (
            <MetaSeo
              postTitle={'test'}
              meta_seo={meta_seo}
              status={status}
              handlClickPublish={() => {
                this.handleSubmit();
              }}
              handlClickSaveDraf={() => {
                this.handleSubmit('draft');
              }}
              action={action}
              userName={'cuonge'}
              handleChangeData={(data) => {
                this.handleChangeMetaSeo(data);
              }}
              handlClickEdit={() => {
                this.handleSubmit();
              }}
            />
          )}
        </div>
        <div>
          <div className="container">
            <h2>Radio</h2>
            <div className="block">
              <Radio
                list={TYPES}
                value={typeRadio1}
                onSelect={(value) => this.handleSelectType(value)}
                name="test12"
              />
            </div>

            <div className="block">
              <Radio
                list={TYPES}
                value={typeRadio2}
                name="test"
                onSelect={(value) => this.handleSelectType2(value)}
                inline
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="container">
            <h2>Checkbox</h2>
            <div className="block">
              <Checkbox
                name="dog"
                value="1"
                label="Dog"
                onSelect={(object) => {
                  console.log(object);
                }}
              />
              <Checkbox name="Cat" value="2" label="Cat" />
              <Checkbox name="Anh Vinh" value="3" label="Vinh" />
            </div>

            <div className="block">
              <Checkbox name="dog2" value="1" label="Dog" inline />
              <Checkbox name="Cat2" value="2" label="Cat" inline />
              <Checkbox name="Anh2" value="3" label="Vinh" inline />
            </div>
          </div>

          {/* Form */}
          <div className="container">
            <h2>Form</h2>
            <div className="row">
              <div className="col col-6">
                <Form>
                  <FormGroup>
                    <Input
                      onChangeText={(value) => {
                        this.setState({ valueInput: value })
                      }}
                      placeholder="Default input"
                      type="text"
                      label="Default input"
                      value={valueInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      onChangeText={(value) => {
                        console.log(value)
                      }}
                      placeholder="Email"
                      name="email"
                      type="email"
                      label="Email"
                      isError
                      value=""
                      errorMessage="This field is required"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      onChangeText={(value) => {
                        console.log(value)
                      }}
                      placeholder="Password"
                      name="Password"
                      type="password"
                      label="Password"
                      isSuccess
                      value=""
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      onChangeText={(value) => {
                        console.log(value)
                      }}
                      placeholder="Number"
                      name="Number"
                      type="number"
                      label="Number"
                      value=""
                    />
                  </FormGroup>
                  <FormGroup>
                    <Textarea
                      value=""
                      onChangeText={text => console.log(text)}
                      name="textarea-test"
                      label="Textarea Test"
                      placeholder="This is placeholder"
                    />
                  </FormGroup>
                </Form>

                <h2>Form Horizontal</h2>
                <Form horizontal={'true'}>
                  <FormGroup>
                    <Input
                      horizontal={true}
                      placeholder={'default'}
                      name="default"
                      type="text"
                      label="default"
                      onChangeText={(value) => {
                        console.log(value)
                      }}
                      value=""
                      classNameLabel="col col-3 text-right"
                      className="col col-9"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      horizontal={true}
                      onChangeText={(value) => {
                        console.log(value)
                      }}
                      placeholder={'email'}
                      name="email"
                      type="email"
                      label="Email"
                      isError
                      value=""
                      classNameLabel="col col-3 text-right"
                      className="col col-9"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      horizontal={true}
                      onChangeText={(value) => {
                        console.log(value)
                      }}
                      placeholder={'Password'}
                      name="Password"
                      type="password"
                      label="Password"
                      isSuccess
                      value=""
                      classNameLabel="col col-3 text-right"
                      className="col col-9"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      horizontal={true}
                      onChangeText={(value) => {
                        console.log(value)
                      }}
                      placeholder={'Number'}
                      name="Number"
                      type="number"
                      label="number"
                      value=""
                      classNameLabel="col col-3 text-right"
                      className="col col-9"
                    />
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>

          {/* Answers */}
          <div className="container" style={{paddingTop: 50, paddingBottom: 50}}>
            <h2>Answers</h2>
            <Datatable
              header={header}
              noDataText="No answers found"
              data={answers}
              renderRow={(answer, index) => this.renderRow(answer, index)}
            />
          </div>
          <div className="container">
            <h2>Select tags</h2>
            <FormGroup>
              <label>Categories</label>
              <SelectMutiple
                options={answers}
                value={selectMulti}
                onChange={(data) => this.handleSetSelectValue(data)}
                getOptionLabel={(label) => label.answer_name}
                getOptionValue={(value) => value.id}
                slug="answer_name"
                placeholder="search category ..."
              />
            </FormGroup>
          </div>

          {/* loader */}
          <div className="container" style={{paddingTop: 50, paddingBottom: 50}}>
            <h2>Loading</h2>
            <Button
              onClick={() => {
                this.setState({ showLoader: true });
              }}
              size="large"
              name="active"
            >
              Loader Example
            </Button>
            <Loader show={showLoader} />
          </div>

          {/* pagination */}
          <div className="container" style={{paddingTop: 50, paddingBottom: 50}}>
            <h2>Pagination</h2>
            <div className="row">
              <div className="col col-6">
                <Pagination
                  currentPage={page}
                  perPage={8}
                  totalItems={100}
                  onSelect={(page) => {
                    this.setState({
                      page,
                    })
                  }}
                />
              </div>
            </div>
          </div>

          {/* select */}
          <div className="container" style={{ background: '#E5E5E5' }}>
            <h2>Select</h2>
            <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <FormGroup>
                <label className="">Select Component</label>
                <SelectOne
                  options={answers}
                  value={selectOneAnswer}
                  onChange={(data) => this.handleSelectAnswer(data)}
                  controlHeight={40}
                  containerMaxWidth={216}
                  width={216}
                  getOptionLabel={(label) => label.answer_name}
                  getOptionValue={(value) => value.id}
                />
              </FormGroup>
              <FormGroup>
                <label className="">Select Component</label>
                <SelectOne
                  options={answers}
                  value={selectOneAnswer2}
                  onChange={(data) => this.handleSelectAnswer2(data)}
                  controlHeight={40}
                  containerMaxWidth={334}
                  width={334}
                  getOptionLabel={(label) => label.answer_name}
                  getOptionValue={(value) => value.id}
                />
              </FormGroup>
              <FormGroup>
                <div>
                  <SelectOne
                    options={answers}
                    value={selectOneAnswer3}
                    onChange={(data) => this.handleSelectAnswer3(data)}
                    controlHeight={24}
                    containerMaxWidth={110}
                    placeholder={'Bulk Action'}
                    width={110}
                    borderRadius="3px"
                    fontSize="13px"
                    getOptionLabel={(label) => label.answer_name}
                    getOptionValue={(value) => value.id}
                    float={'left'}
                    marginRight={'10px'}
                    valuePaddingTop={'0px'}
                  />
                  <Button name="inactive" size="small">
                    Apply
                  </Button>
                </div>
              </FormGroup>
              <FormGroup>
                <div>
                  <SelectOne
                    options={answers}
                    value={selectOneAnswer4}
                    onChange={(data) => this.handleSelectAnswer4(data)}
                    controlHeight={24}
                    containerMaxWidth={110}
                    placeholder={'Categories'}
                    width={110}
                    borderRadius="3px"
                    fontSize="13px"
                    getOptionLabel={(label) => label.answer_name}
                    getOptionValue={(value) => value.id}
                    float={'left'}
                    marginRight={'10px'}
                    valuePaddingTop={'0px'}
                  />
                  <Button name="inactive" size="small">
                    Filter
                  </Button>
                </div>
              </FormGroup>
              <FormGroup>
                <label className="">Meta seo</label>
                <div>
                  <Button
                    onClick={() => {
                      this.setState({ showMetaSeo: !this.state.showMetaSeo });
                    }}
                    name="active"
                    size="large"
                  >
                    Meta Seo
                  </Button>
                </div>
              </FormGroup>
            </div>
          </div>

          {/* history call */}
          <div
            className="container"
            style={{ paddingTop: 50, paddingBottom: 50 }}
          >
            <h2>History Call</h2>
            <div className="row">
              <div className="col col-4">
                <HistoryCall
                  src="http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3"
                  operator="Vinh Thai"
                  startDate={new Date()}
                />
              </div>
            </div>
          </div>

          {/* uploader */}
          <div className="container" style={{paddingTop: 50, paddingBottom: 50}}>
            <h2>Media uploader</h2>
            <div className="row">
              <div className="col col-4">
                <MediaUploader
                  isVisible={showMediaUploader}
                  onHide={() => this.hideMediaUploader()}
                  content={
                    <Button
                      name="inactive"
                      //onClick={() => this.openMediaUploader()}
                    >
                      Upload
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
