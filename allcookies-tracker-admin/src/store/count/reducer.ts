import { initialState } from "./store";
import { CountStore, CountType, DECREMENT, INCREMENT } from "./types";

export const countReducer = (state: CountStore = initialState, action: CountType): CountStore => {
    switch(action.type) {
        case INCREMENT: {
            return {
                ...state,
                count: state.count + action.payload
            }
        }
        case DECREMENT: {
            return {
                ...state,
                count: state.count - action.payload
            }
        }
        default: return state
    }
}