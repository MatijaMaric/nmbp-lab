import { createAsyncAction } from 'typesafe-actions'

export function fetchRequest(actionType: string) {
    return `${actionType}_REQUEST`;
}
export function fetchSuccess(actionType: string) {
    return `${actionType}_SUCCESS`;
}
export function fetchFailure(actionType: string) {
    return `${actionType}_FAILURE`;
}

export const createAllAsyncAction = (actionType: string) => 
    createAsyncAction(
        fetchRequest(actionType),
        fetchSuccess(actionType),
        fetchFailure(actionType));