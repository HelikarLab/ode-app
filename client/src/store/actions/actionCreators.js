import axios from 'axios'
import * as actions from './actionTypes'

const API_URL = 'http://localhost:5000' || process.env.REACT_APP_API_URL

export function importSbml(formData, file) {
  const request = axios({
    method: 'post',
    url: `${API_URL}/api/uploadSbml`,
    data: formData,
  })
  return dispatch => {
    request
      .then(res => {
        const data = JSON.parse(res.data)
        dispatch({
          type: actions.IMPORT_SBML,
          payload: { model: data.model, file },
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function saveModel(model, file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('model', JSON.stringify(model))
  const request = axios({
    method: 'post',
    url: `${API_URL}/api/model/add`,
    data: formData,
  })
  return dispatch => {
    request
      .then(res => {
        dispatch({ type: actions.SAVE_MODEL, payload: 'Success' })
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function setDisplay(data, type) {
  const payload = { data, type }
  return dispatch => {
    dispatch({
      type: actions.SET_DISPLAY,
      payload,
    })
  }
}
