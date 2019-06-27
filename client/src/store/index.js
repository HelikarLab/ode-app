import { createStore, action, thunk } from 'easy-peasy'
import axios from 'axios'

const API_URL = 'http://localhost:5000' || process.env.REACT_APP_API_URL

const model = {
  // Model tab state
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
      })
      .then(() => {
        actions.initSimulation()
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
      })
      .then(() => {
        actions.initSimulation()
        return { error: false }
      })
      .catch(err => ({ message: 'Something went wrong.', error: true }))
  }),
  //actions
  setCurrentModel: action((state, payload) => {
    state.currentModel = payload
  }),
  //Simulation tab state
  simulation: {
    timestamp: 0,
    icmin: 0,
    icmax: 100,
    globalRateLaw: '',
    reactions: [],
    metabolites: [],
    modelMetadata: {},
    run: false,
  },
  //thunks

  //actions
  initSimulation: action(state => {
    state.simulation.reactions = state.currentModel.reactions.map(reaction => ({
      ...reaction,
      selected: false,
    }))

    state.simulation.metabolites = state.currentModel.metabolites.map(
      metabolite => ({
        ...metabolite,
        selected: false,
        present: true,
      })
    )
  }),
  setTimestamp: action(
    (state, payload) => (state.simulation.timestamp = payload)
  ),
  setIcmin: action((state, payload) => {
    state.simulation.icmin = payload
  }),
  setIcmax: action((state, payload) => {
    state.simulation.icmax = payload
  }),
  setGlobalRatelaw: action((state, payload) => {
    state.simulation.globalRatelaw = payload
  }),
  setRun: action(state => {
    state.simulation.run = !state.simulation.run
  }),
  updateIc: action((state, payload) => {
    state.simulation.metabolites.map(metabolite => {
      if (metabolite.id === payload.id) {
        metabolite.initialConcentration = payload.initialConcentration
      }
    })
  }),
}

export const store = createStore(model)
