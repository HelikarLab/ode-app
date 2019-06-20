import { createStore, action, thunk } from 'easy-peasy'
import axios from 'axios'

const API_URL = 'http://localhost:5000' || process.env.REACT_APP_API_URL

const model = {
  currentModel: {},
  //thunks
  importSbml: thunk((actions, file) => {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return axios({
      method: 'post',
      url: `${API_URL}/api/uploadSbml`,
      data: formData,
    })
      .then(res => {
        const json = JSON.parse(res.data)
        actions.setCurrentModel(json)
        return { error: false }
      })
      .catch(err => ({ message: 'Something went wrong.', error: true }))
  }),
  saveModel: thunk((actions, payload, { getStoreState }) => {
    const state = getStoreState()
    const formData = new FormData()
    formData.append('model', JSON.stringify(state.currentModel))
    return axios({
      method: 'post',
      url: `${API_URL}/api/model/add`,
      data: formData,
    })
      .then(res => ({ message: 'Successfully saved.', error: false }))
      .catch(err => ({ message: 'Something went wrong.', error: true }))
  }),
  getModel: thunk((actions, payload) => {
    axios({ method: 'get', url: `${API_URL}/api/model/get/${payload}` })
      .then(res => {
        actions.setCurrentModel(res.data.jsonModel)
        return { error: false }
      })
      .catch(err => ({ message: 'Something went wrong.', error: true }))
  }),
  //actions
  setCurrentModel: action((state, payload) => {
    state.currentModel = payload
  }),
}

export const store = createStore(model)
