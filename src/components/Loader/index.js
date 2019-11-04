import React, { PureComponent } from 'react'

class Loader extends PureComponent {
  render() {
    const { show } = this.props
    
    if (show)
      return (
        <div className="loader">
          <div className="loader__container">
            <div className="loader__ball" />
            <div className="loader__ball" />
            <div className="loader__ball" />
          </div>
        </div>
      )
    return ''
  }
}

export { Loader }
