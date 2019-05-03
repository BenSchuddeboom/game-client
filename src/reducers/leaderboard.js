import { ADD_PLAYER } from '../actions/setPlayers'

export default (state = [], action = {}) => {
    switch (action.type) {
    case ADD_PLAYER: 
        return Object.values(action.payload)
    default:
        return state
    }
}