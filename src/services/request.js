import axios from 'axios'

import {
	getQueryString,
	showErrorAlert
} from '../helpers/common'

import constants from '../helpers/constants' 

const ENDPOINT = constants.ENDPOINT

const send = ({ method = 'get', path, data = null, query = null, headers = {} }) => {
	return new Promise(resolve => {
		const url = `${ENDPOINT}${path}${getQueryString(query)}`
		const accessToken = localStorage.getItem('atoken')

		if (!headers['Authorization'] && accessToken) {
			headers['Authorization'] = `Bearer ${accessToken}`
		}

		axios({ method, url, data, headers })
		.then(result => {
			const data = result.data

			return resolve(data)
		})
		.catch(error => {
			const result = error.response

			if (!result) {
				showErrorAlert(['Something went wrong!'])
			}
			else {
				const { status, data } = result

				if (status === 401 && data === 'TokenExpired') {
					showErrorAlert(['Your session has expired, please login again'])
					.then(() => {
						window.localStorage.clear()
						window.location.href = '/login'
					})
				}
				else if (
					(status === 401 && data === 'Unauthorized') ||
					(status === 403 && data === 'InvalidToken'))
				{
					showErrorAlert(['Unauthorized'])
					.then(() => {
						window.localStorage.clear()
						window.location.href = '/login'
					})
				}
				else {
					return resolve(result.data)
				}
			}
		})
	})
}

const uploadFile = ({ method = 'post', path, file, body = {} ,headers = {} }) => {
	return new Promise(resolve => {
		const url = `${ENDPOINT}${path}`
		const accessToken = localStorage.getItem('atoken')

		if (!headers['Content-Type']) {
			 headers['Content-Type'] = 'multipart/form-data'
		}

		if (!headers['Authorization'] && accessToken) {
			headers['Authorization'] = `Bearer ${accessToken}`
		}
		const form = new FormData()
		form.append('media_upload', file)
		const data = objectToFormData(body,form)
    axios({
      method,
      headers,
      url,
      data
    })
    .then(result => {
      const { data } = result

      return resolve(data)
    })
    .catch(error => {
			const result = error.response

			if (!result) {
				showErrorAlert(['Something went wrong!'])
      }
			else {
				const { status, data } = result

				if (status === 401 && data === 'TokenExpired') {
					showErrorAlert(['Your session has expired, please login again'])
					.then(() => {
						window.localStorage.clear()
						window.location.href = '/login'
					})
				}
				else if (
					(status === 401 && data === 'Unauthorized') ||
					(status === 403 && data === 'InvalidToken'))
				{
					showErrorAlert(['Unauthorized'])
					.then(() => {
						window.localStorage.clear()
						window.location.href = '/login'
					})
				}
				else {
					return resolve(result.data)
				}
			}
    })
	})
}

export const objectToFormData =(obj, form, namespace)=> {
    
  let fd = form || new FormData()
  let formKey
  
  for(let property in obj) {
    if(obj.hasOwnProperty(property)) {
      
      if(namespace) {
        formKey = namespace + '[' + property + ']'
      } else {
        formKey = property
      }
     
      // if the property is an object, but not a File,
      // use recursivity.
      if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        
        objectToFormData(obj[property], fd, property)
        
      } else {
        
        // if it's a string or a File object
        fd.append(formKey, obj[property])
      }
      
    }
  }
  
  return fd
    
}

export default {
	send,
	uploadFile,
	
}