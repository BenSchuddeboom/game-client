import { SET_USER } from '../actions/setUsername'

const initialState = {
    name: '',
    score: 0,
    id: ''
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case SET_USER:
        state.name = action.payload
        return state
    default:
        return state
    }
}