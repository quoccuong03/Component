import swal from 'sweetalert'
import queryString from 'query-string'
import { utils } from 'gamali-helper/dist/utils'


// json
export const jsonParse = (str = null) => {
  return utils.jsonParse(str)
}

export const checkMinNumber = (number, min) => {
  return utils._Number.limit(number, { min })
}

export const checkMaxNumber = (number, max) => {
  return utils._Number.limit(number, { max })
}

export const checkMinLength = (string, min) => {
  return utils._String.limit(string, { min })
}

export const checkMaxLength = (string, max) => {
  return utils._String.limit(string, { max })
}

export const isBlank = (value) => {
  return utils.isBlank(value)
}

export const isEmail = (value) => {
  return utils.isEmail(value)
}

export const isNumeric = (value) => {
  return utils.isNumeric(value)
}


export const isPhoneNumber = (value) => {
  let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,6})$/
  let checkPhone = false
  if ( value.length > 0){
    checkPhone= value.match(regex)
  }
  return checkPhone
}

// object
export const compareObjectProps = (object1, object2) => {
  return utils._Object.compare(object1, object2)
}

export const deleteObjectEmptyField = (obj) => {
  return utils._Object.compact(obj)
}

// file
export const convertBytesToMB = (bytes) => {
  return bytes/1048576
}

// alert
const showAlert = ({ type, message }) => {
  const getMessageText = (message) => {
    if (!message || typeof message === 'object') {
      return 'Something went wrong'
    }
    return message
  }

  return swal({
    title: type === 'error' ? 'Error occurred!' : 'Good job!',
    text: getMessageText(message),
    icon: type,
  })
}

const checkMessage = (messages) => {
  if (typeof messages === 'string') {
    return [messages]
  }
  else if (!messages || (typeof messages === 'object' && !Array.isArray(messages))) {
    return ['Something went wrong']
  }
  return messages
}

export const showWarningAlert = (message) => {
  return swal({
    title: 'Warning',
    text: message,
    icon: 'warning',
    dangerMode: true,
  })
}

export const showErrorAlert = (messages) => {
  const _messages = checkMessage(messages)

  return showAlert({
    type: 'error',
    message: _messages[0]
  })
}

export const showSuccessAlert = (messages) => {
  const _messages = checkMessage(messages)

  return showAlert({
    type: 'success',
    message: _messages[0]
  })
}

export const showConfirmAlert = (message) => {
  return swal({
    title: 'Are you sure?',
    text: message,
    icon: 'warning',
    buttons: ['Cancel', 'Ok'],
    dangerMode: true
  })
}


// language
export const getCurrentLang = () => {
  const langs = ['cn', 'kr']
  const lang = localStorage.getItem('lang')
  const defaultLang = 'cn'

  if (lang) {
    if (langs.includes(lang)) {
      return lang
    }
    else {
      return defaultLang
    }
  }
  else {
    localStorage.setItem('lang', defaultLang)
    return defaultLang
  }
}


// array
export const checkIndexOfArray = (array,value)=> {
  let check = array.indexOf(value)
  if(check > -1)
  {
    return true
  }
  return false
}

export const distinctArrayObject= (arrayObject , key) => {
  return utils._Array.distinct(arrayObject, key) 
}

export const compareTwoArrays = (arr1, arr2) => {
  return utils._Array.difference(arr1, arr2).length === 0
} 


// date
export const formatDate = (date, format = 'Y/m/d') => {
  return utils._Date.format(date, format)
}


// url
export const getMediaUrl = (endpoint, fileName, path) => {
  return `${endpoint}${path}/${fileName}`
}

export const queryStringToJSON = (qs, parseType = false) => {
  if (!qs) return {}

  const _qs = qs.replace(/^\?/, '')
 
  return utils.queryToObject(_qs)
}

export const getQueryString = (query) => {
	const result = queryString.stringify(
		deleteObjectEmptyField(query)
	)

	if (!result) return ''
	return `?${result}`
}

export const setPath = (lang, path, query) => {
  const queryString = getQueryString(query)
  const _lang = lang ? `/${lang}` : ''
  const _path = `${_lang}${path}${queryString}`

  return _path
}

export const debounced = (delay, fn) => {
  let timerId

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId)
    }
    
    timerId = setTimeout(() => {
      fn(...args)
      timerId = null
    }, delay)
  }
}

export const parseNameToSlug = (value) =>{
  return utils._String.slugify(value)
}

export const handleCheckRole = (arrayRule , rule) => {
  let check = arrayRule.filter(element => element.split(':')[0] === rule )
 
  if ( check.length > 0 ){
    return true
  }
  return false
}
export const handleSetRule = (permissions) => {
  const list  = handleCheckRole(permissions , 'list')
  const view  = handleCheckRole(permissions , 'view')
  const add  = handleCheckRole(permissions , 'add')
  const update  = handleCheckRole(permissions , 'update')
  const Delete  = handleCheckRole(permissions , 'delete')
  let ruleList = {
    list,
    view,
    add,
    update,
    delete: Delete,
  }
  
  return ruleList
}

export const handleGetRule = (token) =>{
  let key = process.env.REACT_APP_SECRET_KEY

  return utils.decrypt(token,key)
}

