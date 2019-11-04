import React, { PureComponent } from 'react'

class Pagination extends PureComponent {
  handleSelectPage(e, page) {
    e.preventDefault()
    if (this.props.onSelect) {
      this.props.onSelect(page)
    }
  }

  renderPages(pages, currentPage) {
    const showedPages = pages >= 5 ? 5 : pages
    const middlePage = 3

    let startPage = currentPage - middlePage + 1

    if (pages < 5) {
      startPage = 1
    } else if (startPage <= 0) {
      startPage = 1
    } else if (pages - middlePage === startPage) {
      startPage -= 1
    } else if (currentPage === pages) {
      startPage = pages - showedPages + 1
    }

    let list = []

    for (let page = startPage, counter = 0 ; page <= pages ; page++, counter++) {
      if (counter === showedPages) {
        if (pages - startPage   > showedPages) {
          list.push(
            <li key={'...'} className={`pagination__page-item `}>
              <a
                className="pagination__page-link"
                href="!#"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                ...
              </a>
            </li>
          )

          list.push(
            <li key={pages} className={`pagination__page-item`}>
              <a
                className={'pagination__page-link'}
                href="!#"
                onClick={(e) => this.handleSelectPage(e, pages)}
              >
                {pages}
              </a>
            </li>
          )
        }

        break
      }

      list.push(
        <li
          key={page}
          className={`pagination__page-item ${+page === +currentPage
            ? 'active'
            : null}`}
        >
          <a
            className={this.disableLink(
              'currentPage',
              currentPage,
              pages,
              page
            )}
            href="!#"
            onClick={(e) => this.handleSelectPage(e, page)}
          >
            {page}
          </a>
        </li>
      )
    }

    return list
  }
  disableLinkItem(name, currentPage, pages, page) {
    let classes = ''

    if (typeof currentPage === 'string') {
      currentPage = parseInt(currentPage)
    }

    if (name === 'last' || name === 'next') {
      if (currentPage === pages) {
        classes += ' pagination__display__none'
      }
    } else if (name === 'first' || name === 'prev') {
      if (currentPage === 1) {
        classes += ' pagination__display__none'
      }
    } else if (name === 'currentPage' && currentPage === page) {
      classes += ' pagination__disable-link'
    }

    return classes
  }
  disableLink(name, currentPage, pages, page) {
    let classes = 'pagination__page-link'

    if (typeof currentPage === 'string') {
      currentPage = parseInt(currentPage)
    }

    if (name === 'last' || name === 'next') {
      if (currentPage === pages) {
        classes += ' pagination__disable-link pagination__display__none'
      }
    } else if (name === 'first' || name === 'prev') {
      if (currentPage === 1) {
        classes += ' pagination__disable-link pagination__display__none'
      }
    } else if (name === 'currentPage' && currentPage === page) {
      classes += ' pagination__disable-link'
    }

    return classes
  }

  render() {
    const { currentPage, perPage, totalItems } = this.props

    if (totalItems === 0 || totalItems <= perPage) return null

    const pages = Math.ceil(totalItems / perPage)
    const prevPage = currentPage <= 1 ? currentPage : currentPage - 1
    const nextPage = currentPage >= pages ? currentPage : currentPage + 1

    return (
      <ul className="pagination ">
        <li
          className={`pagination__page-item ${this.disableLinkItem(
            'first',
            currentPage,
            pages
          )}`}
        >
          <a
            className={this.disableLink('first', currentPage, pages)}
            href="!#"
            onClick={(e) => this.handleSelectPage(e, 1)}
          >
            <i className="fas fa-angle-double-left" />
            <span className="sr-only">{'<<'}</span>
          </a>
        </li>

        <li
          className={`pagination__page-item ${this.disableLinkItem(
            'first',
            currentPage,
            pages
          )}`}
        >
          <a
            className={'pagination__page-link'}
            href="!#"
            onClick={(e) => this.handleSelectPage(e, prevPage)}
          >
            <i className="fas fa-angle-left" />
            <span className="sr-only">{'<'}</span>
          </a>
        </li>

        {this.renderPages(pages, currentPage)}

        <li
          className={`pagination__page-item ${this.disableLinkItem(
            'last',
            currentPage,
            pages
          )}`}
        >
          <a
            className={'pagination__page-link'}
            href="!#"
            onClick={(e) => this.handleSelectPage(e, nextPage)}
          >
            <i className="fas fa-angle-right" />
            <span className="sr-only">{'>'}</span>
          </a>
        </li>

        <li
          className={`pagination__page-item ${this.disableLinkItem(
            'last',
            currentPage,
            pages
          )}`}
        >
          <a
            className={this.disableLink('last', currentPage, pages)}
            href="!#"
            onClick={(e) => this.handleSelectPage(e, pages)}
          >
            <i className="fas fa-angle-double-right" />
            <span className="sr-only">{'>>'}</span>
          </a>
        </li>
      </ul>
    )
  }
}

export { Pagination }
