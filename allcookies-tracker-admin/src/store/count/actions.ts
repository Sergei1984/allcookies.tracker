import { CountType, DECREMENT, INCREMENT } from "./types";

export const setIncrementAction = (payload: number): CountType => {
    return {
        type: INCREMENT,
        payload
    }
}

export const setDecrementAction = (payload: number): CountType => {
    return {
        type: DECREMENT,
        payload
    }
}