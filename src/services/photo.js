import requestService from './request'

const uploadPhoto = (file, query = {}, isMulti = false) => {
  return new Promise(resolve => {
    requestService.uploadFile({
      path: '/media/upload/photo',
      file,
      body: { ...query }
    })
    .then(result => {
      const _data = result.data

      if (!isMulti && _data && Array.isArray(_data) && _data.length > 0) {
        result.data = _data[0]
        result.insertId = _data[0].insertId
      }

      return resolve(result)
    })
  })
}

export default {
  uploadPhoto
}