const STATUS = [
  { value: 'pending', label: 'pending' },
  { value: 'publish', label: 'publish' },
  { value: 'trash', label: 'trash' },
]
const ALL_STATUS = 'All Status'

const STATUS_DEFAULT = [
  { value: 'all', label: 'all' },
  { value: 'pending', label: 'pending' },
  { value: 'publish', label: 'publish' },
  { value: 'trash', label: 'trash' },
  { value: 'draft', label: 'draft' },
]

const STATUS_NO_TRASH = [
  { value: 'pending', label: 'Pending' },
  { value: 'publish', label: 'Publish' }
]

const TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'photo', label: 'Photo' },
  { value: 'audio', label: 'Audio' }
]

const LANG = [
  { value: 'cn', label: 'Chinese' },
  { value: 'kr', label: 'Korean' },
]

const RESULTS = [
  { value: 0, label: 'Incorrect' },
  { value: 1, label: 'Correct' }
]

const ENDPOINT = process.env.REACT_APP_ENDPOINT

const MEDIA_UPLOAD_MAX_FILE_SIZE = 5

const WEB_APP_ENPOINT = 'http://gamali.edu.vn'

export default {
  ALL_STATUS,
  STATUS_DEFAULT,
  STATUS_NO_TRASH,
  STATUS,
  TYPES,
  LANG,
  ENDPOINT,
  MEDIA_UPLOAD_MAX_FILE_SIZE,
  WEB_APP_ENPOINT,
  RESULTS
}
