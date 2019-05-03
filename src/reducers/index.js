import { combineReducers } from 'redux'
import user from './user'
import leaderboard from './leaderboard'

export default combineReducers({
    user,
    leaderboard
})