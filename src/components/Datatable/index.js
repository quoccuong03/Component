import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Datatable extends Component {
  getClasses(className) {
    let classes = 'datatable'

    if (className) {
      classes += ` ${className}`
    }

    return classes
  }

  renderHeader(header) {
    return (
      <tr>
        {
          header.map((h, i) => (
            <th key={i} align={h.align || 'left'} colSpan={h.colspan || null}>{h.text}</th>
          ))
        }
      </tr>
    )
  }

  renderData(data, renderRow, noDataText) {
    if (!data || data.length === 0) {
      return (
        <tr>
          <td className="datatable__no-data">{noDataText}</td>
        </tr>
      )
    }

    return (
      data.map((row, i) => renderRow(row, i))
    )
  }

  render() {
    const { className, header, noDataText, data, renderRow } = this.props

    return (
      <table className={this.getClasses(className)}>
        <thead>
          {this.renderHeader(header)}
        </thead>
        <tbody>
          {this.renderData(data, renderRow, noDataText)}
        </tbody>
      </table>
    )
  }
}

Datatable.propTypes = {
  className: PropTypes.string,
  header: PropTypes.array.isRequired,
  noDataText: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired
}

export default Datatable