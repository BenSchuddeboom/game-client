export const SET_USER = 'SET_USER'

export function setUsername(name) {
    return {
        type: SET_USER,
        payload: name
    }
}