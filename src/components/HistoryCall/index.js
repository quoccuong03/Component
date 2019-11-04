import React, { Component } from 'react'

import { formatDate } from '../../helpers/common'

class HistoryCall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isStart: false,
      src: props.src || '',
      talkTime: 0
    }
  }

  componentDidMount() {
    this.onPlay()
    this.onProgress()
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.src && (this.props.src !== prevProps.src)) {
      this.setState({
        src: this.props.src
      })
    }
  }

  onPlay() {
    if (this.audio) {
      this.audio.addEventListener('loadedmetadata', (e) => {
        const talkTime = e.target.duration

        this.setState({ talkTime })
      }, false)

      this.audio.addEventListener('timeupdate', (e) => {
        const talkTime = this.state.talkTime || e.target.duration
        const currentSecond = e.target.currentTime
        const percent = (currentSecond / talkTime) * 100
        
        if (this.progress) {
          const _percent = percent > 100 ? 100 : percent
          const progressAvailable = this.progress.querySelector('.history-call__progress-available')

          progressAvailable.style.width = `${_percent}%`
        }
      }, false)
    }
  }

  getProgress(e) {
    let progress = e.target

    if (e.target.classList.contains('history-call__progress-available')) {
      progress = e.target.closest('.history-call__progress')
    }

    return progress
  }

  getCurrentSecond(e, talkTime, progress) {
    const width = progress.offsetWidth
    const position = e.clientX - progress.getBoundingClientRect().left
    const percent = (position / width) * 100
    const currentSecond = (percent * talkTime) / 100

    return Math.round(currentSecond)
  }

  getProgressPosition(e, progress) {
    const position = e.clientX - progress.getBoundingClientRect().left

    return Math.round(position)
  }

  onProgress() {
    if (this.progress) {
      this.progress.addEventListener('click', (e) => {
        const { talkTime } = this.state
        const progress = this.getProgress(e)
        const currentSecond = this.getCurrentSecond(e, talkTime, progress)

        if (this.audio) {
          this.audio.currentTime = currentSecond
          this.audio.play()
          this.setState({ isStart: true })
        }
      }, false)

      this.progress.addEventListener('mousemove', (e) => {
        const { talkTime } = this.state
        const progress = this.getProgress(e)
        const currentSecond = this.getCurrentSecond(e, talkTime, progress)
        const position = this.getProgressPosition(e, progress)
        const child = progress.querySelector('.history-call__progress-tooltip')
        
        if (child) {
          child.style.display = 'flex'
          child.style.zIndex = 1
          child.style.left = `${position}px`
          child.innerHTML = this.getTime(currentSecond)
        }
      }, false)

      this.progress.addEventListener('mouseout', (e) => {
        const progress = this.getProgress(e)
        const child = progress.querySelector('.history-call__progress-tooltip')
        
        if (child) {
          child.style = ''
          child.innerHTML = ''
        }
      }, false)
    }
  }

  handleControl() {
    let { isStart } = this.state

    this.setState({ isStart: !isStart })

    if (this.audio) {
      if (!isStart) {
        this.audio.play()
      }
      else {
        this.audio.pause()
      }
    }
  }

  getTime(time) {
    if (!time) return 0

    time = Math.round(time)

    const date = new Date()
    
    date.setHours(0,0,0,0)
    date.setSeconds(time)

    if (time / 3600 > 1) {
      return formatDate(date, 'H:i:s')
    }

    return formatDate(date, 'i:s')
  }

  addZeroBefore(number) {
    if (number < 10) {
      return `0${number}`
    }
    return number
  }

  getDate(date) {
    try {
      const d = new Date(date)
      return formatDate(d, 'd/m/Y')
    }
    catch (e) {
      return date
    }
  }

  render() {
    const { operator, startDate } = this.props
    const { isStart, src, talkTime } = this.state
    const date = this.getDate(startDate)
    const time = this.getTime(talkTime)

    return (
      <div className="history-call">
        <audio ref={ref => this.audio = ref} src={src} />

        {
          operator
          ? (
            <div className="history-call__operator">
              <h4 className="history-call__operator-label">Operator:</h4>{' '}
              <span className="history-call__operator-name">
                <a href="#!">{operator}</a>
              </span>
            </div>
          )
          : null
        }

        <div className="history-call__date">
          <span>Date: {date}</span>
          <span>{time}</span>
        </div>

        <div className="history-call__container">
          <div
            className={`history-call__control history-call__control--${isStart ? 'pause' : 'start'}`}
            onClick={() => this.handleControl()}
          ></div>
          <div
            className="history-call__progress"
            ref={ref => this.progress = ref}
          >
            <div className="history-call__progress-available"></div>
            <div className="history-call__progress-tooltip"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default HistoryCall