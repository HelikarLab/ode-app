import { createStore, action, thunk, computed } from 'easy-peasy'
import axios from 'axios'
import _ from 'lodash'

const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://localhost:5000/'

const model = {
  /*
   * Common global state
   */
  modelMetadata: {},

  //thunks
  importSbml: thunk((actions, file) => {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return axios({
      method: 'post',
      url: `${API_URL}api/uploadSbml`,
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
    return axios({ method: 'get', url: `${API_URL}api/model/get/${payload}` })
      .then(res => {
        const data = res.data.jsonModel
        actions.modelTab.setCurrentModel(data)
        actions.setModelMetadata({
          name: data.name,
          id: data.id,
          sbmlVersion: data.sbmlVersion,
          sbmlLevel: data.sbmlLevel,
        })
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
        ratelaw: '',
        parameters: [],
        checked: false,
      })
    )
    state.simulationTab.speciesFromModel = state.modelTab.currentModel.species.map(
      specie => ({ ...specie, initialConcentration: 0 })
    )
  }),
  setModelMetadata: action((state, payload) => {
    state.modelMetadata = {
      name: payload.name,
      id: payload.id,
      sbmlVersion: payload.sbmlVersion,
      sbmlLevel: payload.sbmlLevel,
    }
  }),

  /*
   * Model tab state
   */

  modelTab: {
    currentModel: {
      species: [],
      reactions: [],
      compartments: [],
    },
    //thunks
    saveModel: thunk((actions, payload, { getStoreState }) => {
      const state = getStoreState()
      return axios({
        method: 'post',
        url: `${API_URL}api/model/add`,
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
    speciesFromModel: [],
    species: [],
    resultData: [],
    graphData: computed(state => {
      return state.resultData.filter(item => {
        if (item.checked) return true
        else return false
      })
    }),
    //thunks
    simulate: thunk((actions, payload, { getStoreState }) => {
      const state = getStoreState()
      let newReactions = []
      state.simulationTab.reactions.forEach(reaction => {
        if (reaction.checked === true) {
          if (reaction.ratelaw === '') {
            throw new Error('Ratelaw found empty for reaction: ' + reaction.id)
          } else newReactions.push(reaction)
        }
      })
      const simulationPayload = {
        time: payload.time,
        dataPoints: payload.dataPoints,
        reactions: newReactions,
        species: state.simulationTab.species,
      }
      return axios({
        method: 'post',
        url: `${API_URL}api/simulation`,
        data: simulationPayload,
      })
        .then(res => {
          const data = JSON.parse(res.data)
          const modifiedData = data.concentrationData.map(item => ({
            ...item,
            checked: true,
          }))
          actions.updateResult(modifiedData)
          return { error: false, message: 'Simulation successful.' }
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
      actions.updateSpecies()
    }),
    //actions
    reset: thunk((actions, payload, { getStoreState }) => {
      const { simulationTab } = getStoreState()
      simulationTab.reactions = simulationTab.reactions.map(reaction => ({
        ...reaction,
        checked: false,
        ratelaw: '',
        parameters: [],
      }))
      simulationTab.icmin = 0
      simulationTab.icmax = 100
      actions.updateSpecies()
    }),
    setRatelaw: action((state, payload) => {
      state.reactions = state.reactions.map(reaction => {
        if (payload.id === reaction.id) {
          if (payload.ratelaw === 'custom-rate') {
            if (reaction.reversible) {
              return {
                ...reaction,
                ratelaw: payload.ratelaw,
                rateForward: payload.rateForward,
                rateBackward: payload.rateBackward,
              }
            }
            return {
              ...reaction,
              ratelaw: payload.ratelaw,
              rate: payload.rate,
            }
          } else
            return {
              ...reaction,
              ratelaw: payload.ratelaw,
              parameters: payload.parameters,
            }
        } else return reaction
      })
    }),
    toggleSpecie: action((state, payload) => {
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
      state.species.forEach(specie => {
        if (specie.id === payload.id) {
          specie.initialConcentration = payload.initialConcentration
        }
      })
      state.speciesFromModel.forEach(specie => {
        if (specie.id === payload.id) {
          specie.initialConcentration = payload.initialConcentration
        }
      })
    }),
    // Updates the species list
    updateSpecies: action((state, payload) => {
      state.species = []
      state.reactions.map(reaction => {
        if (reaction.checked) {
          reaction.reactants.map(reactant => {
            return state.speciesFromModel.map(specie => {
              if (reactant.id === specie.id) {
                if (!_.includes(state.species, specie)) {
                  return state.species.push(specie)
                } else {
                  return false
                }
              } else {
                return false
              }
            })
          })
          return reaction.products.map(product => {
            return state.speciesFromModel.map(specie => {
              if (product.id === specie.id) {
                if (!_.includes(state.species, specie)) {
                  return state.species.push(specie)
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
