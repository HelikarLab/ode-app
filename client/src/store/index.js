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

  /**
   * Thunk to import an sbml file to the backend
   */
  importSbml: thunk((actions, file) => {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return axios({
      method: 'post',
      url: `${API_URL}api/uploadSbml`,
      data: formData,
    })
      .then(res => {
        const json = JSON.parse(res.data) // Parse the incoming data to JSON
        actions.modelTab.setCurrentModel(json)
      })
      .then(() => {
        actions.initSimulation()
        return { error: false }
      })
      .catch(err => ({ message: 'Something went wrong.', error: true }))
  }),
  /**
   * Thunk to fetch a model or all models from the backend
   */
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
  /**
   * Action to initialize the simulation tab state with the data of a sbml model
   */
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
  /**
   * Action to set the metadata of the model
   */
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
    /**
     * Thunk to save the model in the database
     */
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
    /**
     * Action to initialize the state of the model tab with the data of a sbml model
     */
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
    icstep: computed(state => (state.icmax - state.icmin) / 100), // Computes the optimum step with no of steps = 100
    reactions: [],
    speciesFromModel: [],
    species: [],
    resultData: [],
    /**
     * graphData is computed from resultData as the user can
     * toggle species in the graph after a simulation
     */
    graphData: computed(state => {
      return state.resultData.filter(item => {
        if (item.checked) return true
        else return false
      })
    }),
    /**
     * Thunk to run the simulation in the backend
     */
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
    /**
     * Thunk to switch on/off a reaction in the simulation
     */
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
    /**
     * Thunk to reset all the configuration made in the simulation panel
     */
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
    /**
     * Action to set the ratelaw of a particular reaction
     */
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
    /**
     * Action to toggle a specie from the graph
     */
    toggleSpecie: action((state, payload) => {
      state.resultData = state.resultData.map(item => {
        if (item.name === payload) {
          return { ...item, checked: !item.checked }
        } else return item
      })
    }),
    /**
     * Action to update the resultData after a simulation is run
     */
    updateResult: action((state, payload) => {
      state.resultData = payload
    }),
    /**
     * Action to set the minimum initial concentration
     */
    setIcmin: action((state, payload) => {
      state.icmin = payload
    }),
    /**
     * Action to set the maximum initial concentration
     */
    setIcmax: action((state, payload) => {
      state.icmax = payload
    }),
    /**
     * Action to set the initial concentration of any particular specie
     */
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
    /**
     * Action to update the species in the species panel according to all the checked reactions in the reaction panel
     */
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
