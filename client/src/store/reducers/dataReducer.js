import { IMPORT_SBML, SAVE_MODEL, SET_DISPLAY } from '../actions/actionTypes'

const INITIAL_STATE = {
  model: {},
  modelFile: '',
  displayData: {
    data: {},
    type: '',
  },
  imported: true,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IMPORT_SBML:
      console.log(action.payload)
      return {
        ...state,
        model: action.payload.model,
        modelFile: action.payload.file,
        imported: false,
      }
    case SAVE_MODEL:
      return state
    case SET_DISPLAY:
      return { ...state, displayData: action.payload }
    default:
      return state
  }
}
