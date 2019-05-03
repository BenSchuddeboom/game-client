export const ADD_PLAYER = 'ADD_PLAYER'

export function setPlayers(players) {
    return {
        type: ADD_PLAYER,
        payload: players
    }
}