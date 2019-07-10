import { createStore, action, thunk, computed } from 'easy-peasy'
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
    return axios({
      method: 'post',
      url: `${API_URL}/api/model/add`,
      data: state.currentModel,
    })
      .then(res => ({ message: 'Successfully saved.', error: false }))
      .catch(err => ({ message: 'Something went wrong.', error: true }))
  }),
  getModel: thunk((actions, payload) => {
    return axios({ method: 'get', url: `${API_URL}/api/model/get/${payload}` })
      .then(res => {
        actions.setCurrentModel(res.data.jsonModel)
      })
      .then(() => {
        actions.initSimulation()
        return { error: false, message: 'Successfully retrieved model.' }
      })
      .catch(() => ({ error: true, message: 'Something went wrong.' }))
  }),
  //actions
  setCurrentModel: action((state, payload) => {
    state.currentModel = payload
  }),
  //Simulation tab state
  simulation: {
    icmin: 0,
    icmax: 100,
    icstep: computed(state => {
      return (state.icmax - state.icmin) / 100
    }),
    reactions: [],
    metabolites: [],
    resultData: [],
    graphData: computed(state => {
      return state.resultData.filter(item => {
        if (item.checked) return true
        else return false
      })
    }),
  },
  toggleMetabolite: action((state, payload) => {
    state.simulation.resultData = state.simulation.resultData.map(item => {
      if (item.name === payload) {
        return { ...item, checked: !item.checked }
      } else return item
    })
  }),
  updateResult: action((state, payload) => {
    state.simulation.resultData = payload
  }),
  //thunks
  simulate: thunk((actions, payload, { getStoreState }) => {
    let state = getStoreState()
    const newReactions = state.simulation.reactions.filter(
      reaction => reaction.checked === true
    )
    const simulationPayload = {
      time: payload.time,
      globalRatelaw: payload.globalRatelaw,
      reactions: newReactions,
      metabolites: state.simulation.metabolites,
    }
    return axios({
      method: 'post',
      url: `${API_URL}/api/simulation`,
      data: simulationPayload,
    })
      .then(res => {
        const data = JSON.parse(res.data)
        const modifiedData = data.concentrationData.map(item => ({
          ...item,
          checked: true,
        }))
        return actions.updateResult(modifiedData)
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
      rateLaw: 'rl1',
      checked: false,
    }))
  }),
  setIcmin: action((state, payload) => {
    state.simulation.icmin = payload
  }),
  setIcmax: action((state, payload) => {
    state.simulation.icmax = payload
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
