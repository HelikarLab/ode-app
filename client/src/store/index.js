import { createStore, action, thunk } from 'easy-peasy'
import axios from 'axios'
import _ from 'lodash'

const API_URL = 'http://localhost:5000' || process.env.REACT_APP_API_URL

const model = {
  // Model tab state
  currentModel: {
    metabolites: [],
    reactions: [],
  },
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
  simulate: thunk((actions, payload, { getStoreState }) => {
    const state = getStoreState()
    return axios({
      method: 'post',
      url: `${API_URL}/api/simulation`,
      data: state.simulation,
    })
      .then(res => {
        console.log(res)
      })
      .then(() => {
        return { error: false }
      })
      .catch(err => ({ message: 'Something went wrong.', error: true }))
  }),
  //Switches (on/off) the reaction in the simulation
  switchReaction: thunk(async (actions, payload, { getStoreState }) => {
    let state = getStoreState()
    state.simulation.reactions = await _.map(
      state.simulation.reactions,
      reaction => {
        if (reaction.id === payload.id)
          return { ...reaction, checked: !reaction.checked }
        else return reaction
      }
    )
    actions.updateMetabolites()
  }),
  //actions
  initSimulation: action(state => {
    state.simulation.reactions = state.currentModel.reactions.map(reaction => ({
      ...reaction,
      checked: false,
    }))
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
    /*eslint-disable-next-line*/
    state.simulation.metabolites.map(metabolite => {
      if (metabolite.id === payload.id) {
        metabolite.initialConcentration = payload.initialConcentration
      }
    })
  }),
  // Updates the metabolites list
  updateMetabolites: action((state, payload) => {
    state.simulation.metabolites = []
    /*eslint-disable-next-line*/
    state.simulation.reactions.map(reaction => {
      if (reaction.checked) {
        reaction.reactants.map(reactant => {
          /*eslint-disable-next-line*/
          return state.currentModel.metabolites.map(metabolite => {
            /*eslint-disable-next-line*/
            if (reactant.id === metabolite.id) {
              if (!_.includes(state.simulation.metabolites, metabolite)) {
                state.simulation.metabolites.push(metabolite)
              }
            }
          })
        })
        reaction.products.map(product => {
          /*eslint-disable-next-line*/
          return state.currentModel.metabolites.map(metabolite => {
            if (product.id === metabolite.id) {
              if (!_.includes(state.simulation.metabolites, metabolite)) {
                state.simulation.metabolites.push(metabolite)
              }
            }
          })
        })
      }
    })
  }),
}

export const store = createStore(model)
