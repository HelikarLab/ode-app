import { createStore, action, thunk, debug } from 'easy-peasy'
import axios from 'axios'

const API_URL = 'http://localhost:5000' || process.env.REACT_APP_API_URL

const model = {
  currentModel: {},
  currentModelFile: '',
  //thunks
  importSbml: thunk((actions, file) => {
    const formData = new FormData()
    formData.append('file', file, file.name)
    axios({
      method: 'post',
      url: `${API_URL}/api/uploadSbml`,
      data: formData,
    })
      .then(res => {
        const json = JSON.parse(res.data)
        actions.setCurrentModelFile(file)
        actions.setCurrentModel(json)
      })
      .catch(err => {
        console.log(debug(err))
      })
  }),
  //actions
  setCurrentModel: action((state, payload) => {
    state.currentModel = payload
  }),
  setCurrentModelFile: action((state, payload) => {
    state.currentModelFile = payload
  }),
}

export const store = createStore(model)
