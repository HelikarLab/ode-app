import { createStore, action, thunk, computed } from 'easy-peasy'
import axios from 'axios'
import _ from 'lodash'

const API_URL = 'http://localhost:5000' || process.env.REACT_APP_API_URL

const model = {
  /*
   * Common global state
   */

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
        actions.modelTab.setCurrentModel(json)
      })
      .then(() => {
        actions.initSimulation()
        return { error: false }
      })
      .catch(err => ({ message: 'Something went wrong.', error: true }))
  }),
  getModel: thunk((actions, payload) => {
    return axios({ method: 'get', url: `${API_URL}/api/model/get/${payload}` })
      .then(res => {
        actions.modelTab.setCurrentModel(res.data.jsonModel)
      })
      .then(() => {
        actions.initSimulation()
        return { error: false, message: 'Successfully retrieved model.' }
      })
      .catch(err => {
        console.log(err)
        return { error: true, message: 'Something went wrong.' }
      })
  }),
  //actions
  initSimulation: action(state => {
    state.simulationTab.reactions = state.modelTab.currentModel.reactions.map(
      reaction => ({
        ...reaction,
        rateLaw: 'rl1',
        checked: false,
      })
    )
    state.simulationTab.metabolitesFromModel =
      state.modelTab.currentModel.metabolites
  }),

  /*
   * Model tab state
   */

  modelTab: {
    currentModel: {
      metabolites: [],
      reactions: [],
    },
    //thunks
    saveModel: thunk((actions, payload, { getStoreState }) => {
      const state = getStoreState()
      return axios({
        method: 'post',
        url: `${API_URL}/api/model/add`,
        data: state.modelTab.currentModel,
      })
        .then(res => ({ message: 'Successfully saved.', error: false }))
        .catch(err => ({ message: 'Something went wrong.', error: true }))
    }),
    //actions
    setCurrentModel: action((state, payload) => {
      state.currentModel = payload
    }),
  },

  /*
   * Simulation tab state
   */

  simulationTab: {
    icmin: 0,
    icmax: 100,
    icstep: computed(state => (state.icmax - state.icmin) / 100),
    reactions: [],
    metabolitesFromModel: [],
    metabolites: [],
    resultData: [],
    graphData: computed(state => {
      return state.resultData.filter(item => {
        if (item.checked) return true
        else return false
      })
    }),
    //thunks
    simulate: thunk((actions, payload, { getStoreState }) => {
      let state = getStoreState()
      const newReactions = state.simulationTab.reactions.filter(
        reaction => reaction.checked === true
      )
      const simulationPayload = {
        time: payload.time,
        globalRatelaw: payload.globalRatelaw,
        reactions: newReactions,
        metabolites: state.simulationTab.metabolites,
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
    switchReaction: thunk((actions, payload, { getStoreState }) => {
      let state = getStoreState()
      state.simulationTab.reactions = state.simulationTab.reactions.map(
        reaction => {
          if (reaction.id === payload.id)
            return { ...reaction, checked: !reaction.checked }
          else return reaction
        }
      )
      actions.updateMetabolites()
    }),
    //actions
    toggleMetabolite: action((state, payload) => {
      state.resultData = state.resultData.map(item => {
        if (item.name === payload) {
          return { ...item, checked: !item.checked }
        } else return item
      })
    }),
    updateResult: action((state, payload) => {
      state.resultData = payload
    }),
    setIcmin: action((state, payload) => {
      state.icmin = payload
    }),
    setIcmax: action((state, payload) => {
      state.icmax = payload
    }),
    updateIc: action((state, payload) => {
      state.metabolites.forEach(metabolite => {
        if (metabolite.id === payload.id) {
          metabolite.initialConcentration = payload.initialConcentration
        }
      })
    }),
    // Updates the metabolites list
    updateMetabolites: action((state, payload) => {
      state.metabolites = []
      state.reactions.map(reaction => {
        if (reaction.checked) {
          reaction.reactants.map(reactant => {
            return state.metabolitesFromModel.map(metabolite => {
              if (reactant.id === metabolite.id) {
                if (!_.includes(state.metabolites, metabolite)) {
                  return state.metabolites.push(metabolite)
                } else {
                  return false
                }
              } else {
                return false
              }
            })
          })
          return reaction.products.map(product => {
            return state.metabolitesFromModel.map(metabolite => {
              if (product.id === metabolite.id) {
                if (!_.includes(state.metabolites, metabolite)) {
                  return state.metabolites.push(metabolite)
                } else {
                  return false
                }
              } else {
                return false
              }
            })
          })
        } else {
          return false
        }
      })
    }),
  },
}

export const store = createStore(model)
